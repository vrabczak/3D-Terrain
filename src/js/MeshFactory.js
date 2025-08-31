// src/js/MeshFactory.reverted.js
// First version after decomposition (reverted), using MeshLambertMaterial and default texture settings.
// Responsible for: elevation grid creation, geometry creation, texture creation,
// mesh assembly/orientation, and geodetic↔model conversions (lat/lon→XYZ, meters→model).

import * as THREE from 'three';

/**
 * @typedef {Object} TerrainDimensions
 * @property {number} realWorldWidth   Terrain width in Web Mercator meters (X axis of PlaneGeometry).
 * @property {number} realWorldHeight  Terrain height in Web Mercator meters (Y axis of PlaneGeometry before rotation).
 * @property {number} terrainWidth     Elevation grid width (high-res DEM samples).
 * @property {number} terrainHeight    Elevation grid height (high-res DEM samples).
 * @property {number} meshWidth        Plane segments + 1 in X (vertex columns).
 * @property {number} meshHeight       Plane segments + 1 in Y (vertex rows).
 */

/**
 * @typedef {Object} ElevationStats
 * @property {number} min   Minimum elevation in meters (ASL) across the DEM.
 * @property {number} max   Maximum elevation in meters (ASL) across the DEM.
 * @property {number} range Elevation range in meters (max - min).
 */

/**
 * Build-time options for MeshFactory.
 * @typedef {Object} BuildOptions
 * @property {number} [heightScaleMultiplier=1] Vertical exaggeration multiplier (1 = true meters).
 * @property {number} [terrainResolution=30] Desired ground resolution (m/cell) for elevation grid and mesh.
 * @property {number} [maxTerrainDimension=1024] Max grid dimension (caps triangles/vertices).
 * @property {number} [textureDownsample=1] Downsample factor for texture (1 = original).
 */

export class MeshFactory {
  constructor() {
    /** @type {THREE.Mesh|null} */ this.terrainMesh = null;
    /** @type {Float32Array|null} */ this.highResElev = null;
    /** @type {TerrainDimensions|null} */ this.dimensions = null;
    /** @type {ElevationStats|null} */ this.elevationStats = null;
    /** @type {{
     *  bbox:[number,number,number,number], westX:number,eastX:number,southY:number,northY:number,
     *  widthMeters:number,heightMeters:number, gridW:number,gridH:number, meshW:number,meshH:number,
     *  elevMin:number,elevMax:number,elevRange:number, verticalScale:number, centerLatRad:number
     * } | null} */
    this.modelMap = null;
  }

  /**
   * Build a terrain mesh from DEM + optional texture, caching internal mapping
   * for later coordinate conversions.
   * @param {{
   *   width:number,
   *   height:number,
   *   rasters: Float32Array[]|Float32Array,
   *   geoTransform: {originX:number, originY:number, pixelSizeX:number, pixelSizeY:number},
   *   samplesPerPixel:number,
   *   bbox:[number,number,number,number]
   * }} demData GeoTIFF-derived DEM package.
   * @param {ImageData|null} textureImageData Resampled imagery aligned to DEM bbox (optional).
   * @param {BuildOptions} [opts]
   * @returns {{mesh:THREE.Mesh, dimensions:TerrainDimensions, elevationStats:ElevationStats}}
   */
  build(demData, textureImageData, opts = {}) {
    const {
      heightScaleMultiplier = 1,
      terrainResolution = 30,
      maxTerrainDimension = 1024,
      textureDownsample = 1,
    } = opts;

    // Validate DEM
    this.#validateDEMData(demData);
    const { width, height, rasters, geoTransform, bbox } = demData;
    const elevationData = /** @type {Float32Array} */ (Array.isArray(rasters) ? rasters[0] : rasters);

    // Analyze elevation
    this.elevationStats = this.#analyzeElevationData(elevationData);

    // Calculate dimensions & grid sizes
    this.dimensions = this.#calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension);

    // Build high-res elevation grid
    this.highResElev = this.#buildHighResolutionElevationGrid(
      elevationData, width, height, geoTransform, bbox, this.dimensions
    );

    // Init mapping/scales for conversions
    this.#initModelMapping(bbox, this.dimensions, this.elevationStats, heightScaleMultiplier);

    // Geometry & texture
    const geometry = this.#createTerrainGeometry(this.dimensions, this.highResElev, this.elevationStats, heightScaleMultiplier);
    const texture  = this.#createTerrainTexture(textureImageData, textureDownsample);

    // Mesh (rotate -90° so Y is up)
    this.terrainMesh = this.#createTerrainMesh(geometry, texture);

    return { mesh: this.terrainMesh, dimensions: this.dimensions, elevationStats: this.elevationStats };
  }

  /** Convert geographic position to world/scene coordinates on the terrain surface. */
  latLonToModelXYZ(lat, lon, { clampToBounds = true } = {}) {
    if (!this.modelMap || !this.terrainMesh) {
      throw new Error('MeshFactory: model mapping or terrain mesh not initialized. Call build() first.');
    }
    const { westX, eastX, southY, northY, widthMeters, heightMeters, gridW, gridH, elevMin, verticalScale } = this.modelMap;

    // Mercator projection
    const R = 6378137;
    const degToRad = (d) => d * Math.PI / 180;
    const lonToX = (L) => R * degToRad(L);
    const latToY = (A) => {
      const maxLat = 85.05112878;
      const φ = degToRad(Math.max(Math.min(A, maxLat), -maxLat));
      return R * Math.log(Math.tan(Math.PI / 4 + φ / 2));
    };

    let X = lonToX(lon);
    let Y = latToY(lat);
    if (clampToBounds) {
      X = Math.max(westX, Math.min(eastX, X));
      Y = Math.max(southY, Math.min(northY, Y));
    }

    const u = (X - westX) / (eastX - westX);
    const v = (Y - southY) / (northY - southY);

    const xLocal = (u - 0.5) * widthMeters;
    const yLocal = (v - 0.5) * heightMeters;

    const fx = u * (gridW - 1);
    const fy = v * (gridH - 1);
    const elevMeters = this.#getElevation(fx, fy) ?? elevMin;

    const zLocalBeforeRotation = (elevMeters - elevMin) * verticalScale;

    return { x: xLocal, y: zLocalBeforeRotation, z: -yLocal };
  }

  /**
   * Simple elevation lookup that fixes the Y-orientation mismatch.
   * Our highResElev is row-major with r=0 at the **north** edge.
   * In latLonToModelXYZ, v=0 is **south** and v=1 is **north**.
   * Therefore we must flip Y when indexing into the raster.
   *
   * @param {number} fx - fractional column in [0, gridW-1]
   * @param {number} fy - fractional row in [0, gridH-1] where 0 = SOUTH, gridH-1 = NORTH
   * @returns {number|null} elevation in meters or null if unavailable
   */
  #getElevation(fx, fy) {
    if (!this.highResElev || !this.modelMap) return null;
    const { gridW, gridH } = this.modelMap;

    // Clamp to valid sample range
    const cx = Math.max(0, Math.min(gridW - 1, Math.round(fx)));

    // IMPORTANT: flip Y because our raster stores r=0 at NORTH,
    // while fy=0 corresponds to SOUTH (v=0 -> south, v=1 -> north).
    const fyClamped = Math.max(0, Math.min(gridH - 1, Math.round(fy)));
    const ry = (gridH - 1) - fyClamped; // flip

    const idx = ry * gridW + cx;
    const z = this.highResElev[idx];
    return Number.isFinite(z) ? z : null;
  }

  /** Convert real meters to model units. */
  metersToModelUnits(meters, axis = 'horizontal', lat /* number | undefined */) {
    if (!this.modelMap) throw new Error('MeshFactory: model mapping not initialized. Call build() first.');
    const { verticalScale, centerLatRad } = this.modelMap;
    if (axis === 'vertical') return meters * verticalScale;
    const φdeg = (lat == null) ? (centerLatRad * 180 / Math.PI) : lat;
    const k = this.#mercatorScaleAtLat(φdeg);
    return meters * k;
  }

  // -------------------- internals --------------------

  #validateDEMData(demData) {
    const { width, height, samplesPerPixel, rasters } = demData || {};
    if (!width || !height || width < 2 || height < 2) throw new Error('DEM has invalid size: at least 2×2 pixels required');
    if (samplesPerPixel !== 1) throw new Error('Uploaded file is not a single-band DEM (height model).');
    const elevationData = Array.isArray(rasters) ? rasters[0] : rasters;
    if (!elevationData || elevationData.length !== width * height) throw new Error('DEM GeoTIFF contains invalid elevation array.');
  }

  #analyzeElevationData(elevationData) {
    let minElevation = Infinity; let maxElevation = -Infinity;
    for (let i = 0; i < elevationData.length; i++) {
      const value = elevationData[i];
      if (isFinite(value) && value > -1000 && value < 10000) {
        if (value < minElevation) minElevation = value;
        if (value > maxElevation) maxElevation = value;
      }
    }
    return { min: minElevation, max: maxElevation, range: maxElevation - minElevation };
  }

  #calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension) {
    const [west, south, east, north] = bbox;
    const R = 6378137;
    const degToRad = (d) => d * Math.PI / 180;
    const lonToX = (lon) => R * degToRad(lon);
    const latToY = (lat) => {
      const φ = degToRad(lat);
      const maxφ = degToRad(85.05112878);
      const clamped = Math.max(Math.min(φ, maxφ), -maxφ);
      return R * Math.log(Math.tan(Math.PI / 4 + clamped / 2));
    };

    const realWorldWidth  = Math.abs(lonToX(east)  - lonToX(west));
    const realWorldHeight = Math.abs(latToY(north) - latToY(south));

    let terrainWidth  = Math.max(2, Math.ceil(realWorldWidth  / terrainResolution));
    let terrainHeight = Math.max(2, Math.ceil(realWorldHeight / terrainResolution));

    const maxDim = Math.max(2, maxTerrainDimension | 0);
    const scale = Math.max(terrainWidth / maxDim, terrainHeight / maxDim, 1);
    if (scale > 1) {
      terrainWidth  = Math.max(2, Math.floor(terrainWidth  / scale));
      terrainHeight = Math.max(2, Math.floor(terrainHeight / scale));
    }

    const meshWidth  = terrainWidth;
    const meshHeight = terrainHeight;
    return { realWorldWidth, realWorldHeight, terrainWidth, terrainHeight, meshWidth, meshHeight };
  }

  #buildHighResolutionElevationGrid(elevationData, width, height, geoTransform, bbox, dimensions) {
    const [west, south, east, north] = bbox;
    const { terrainWidth, terrainHeight } = dimensions;

    const stepLon = (east - west) / terrainWidth;
    const stepLat = (north - south) / terrainHeight;
    const highResElev = new Float32Array(terrainWidth * terrainHeight);

    for (let r = 0; r < terrainHeight; r++) {
      const lat = north - r * stepLat;
      for (let c = 0; c < terrainWidth; c++) {
        const lon = west + c * stepLon;
        const elevation = this.#sampleDEMAtCoordinate(
          elevationData, width, height, geoTransform, bbox, lon, lat
        );
        highResElev[r * terrainWidth + c] = elevation;
      }
    }
    return highResElev;
  }

  #createTerrainGeometry(dimensions, highResElev, elevationStats, heightScaleMultiplier) {
    const { realWorldWidth, realWorldHeight, meshWidth, meshHeight, terrainWidth, terrainHeight } = dimensions;
    const geometry = new THREE.PlaneGeometry(realWorldWidth, realWorldHeight, meshWidth - 1, meshHeight - 1);
    const vertices = geometry.attributes.position.array;

    const heightScale = this.#calculateHeightScale(
      realWorldWidth,
      realWorldHeight,
      elevationStats.range,
      heightScaleMultiplier
    );

    for (let r = 0; r < meshHeight; r++) {
      for (let c = 0; c < meshWidth; c++) {
        const hiR = Math.floor((r / (meshHeight - 1)) * (terrainHeight - 1));
        const hiC = Math.floor((c / (meshWidth  - 1)) * (terrainWidth  - 1));
        const elevation = highResElev[hiR * terrainWidth + hiC];
        const vIndex = r * meshWidth + c;
        vertices[vIndex * 3 + 2] = isFinite(elevation) ? (elevation - elevationStats.min) * heightScale : 0;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }

  #createTerrainTexture(textureImageData, textureDownsample) {
    if (textureImageData) {
      let finalImageData = textureImageData;
      if (textureDownsample > 1) {
        finalImageData = this.#downsampleImageData(textureImageData, textureDownsample);
      }
      const canvas = this.#imageDataToCanvas(finalImageData);
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    }

    // Fallback 1×1 gray texture
    const tex = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1);
    tex.needsUpdate = true;
    return tex;
  }

  #createTerrainMesh(geometry, texture) {
    const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; // XY plane -> horizontal, Y up
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    return mesh;
  }

  #initModelMapping(bbox, dimensions, elevationStats, heightScaleMultiplier = 1) {
    const [west, south, east, north] = bbox;
    const R = 6378137;
    const degToRad = (d) => d * Math.PI / 180;
    const lonToX = (lon) => R * degToRad(lon);
    const latToY = (lat) => {
      const maxLat = 85.05112878;
      const φ = degToRad(Math.max(Math.min(lat, maxLat), -maxLat));
      return R * Math.log(Math.tan(Math.PI / 4 + φ / 2));
    };

    const westX  = lonToX(west);
    const eastX  = lonToX(east);
    const southY = latToY(south);
    const northY = latToY(north);

    const verticalScale = this.#calculateHeightScale(
      dimensions.realWorldWidth,
      dimensions.realWorldHeight,
      elevationStats.range,
      heightScaleMultiplier
    );

    const centerLat = (south + north) / 2;
    const centerLatRad = degToRad(centerLat);

    this.modelMap = {
      bbox,
      westX, eastX, southY, northY,
      widthMeters:  dimensions.realWorldWidth,
      heightMeters: dimensions.realWorldHeight,
      gridW: dimensions.terrainWidth,
      gridH: dimensions.terrainHeight,
      meshW: dimensions.meshWidth,
      meshH: dimensions.meshHeight,
      elevMin: elevationStats.min,
      elevMax: elevationStats.max,
      elevRange: elevationStats.range,
      verticalScale,
      centerLatRad,
    };
  }

  #mercatorScaleAtLat(latDeg) { const φ = (latDeg * Math.PI) / 180; const c = Math.cos(φ); return (c === 0) ? Infinity : 1 / c; }

  #calculateHeightScale(_w, _h, elevationRange, heightScaleMultiplier) { return (elevationRange <= 0) ? heightScaleMultiplier : heightScaleMultiplier; }

  #imageDataToCanvas(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  #downsampleImageData(imageData, factor) {
    const newWidth = Math.max(1, Math.floor(imageData.width / factor));
    const newHeight = Math.max(1, Math.floor(imageData.height / factor));
    const newImageData = new ImageData(newWidth, newHeight);
    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const srcX = Math.floor(x * factor);
        const srcY = Math.floor(y * factor);
        const si = (srcY * imageData.width + srcX) * 4;
        const di = (y * newWidth + x) * 4;
        newImageData.data[di    ] = imageData.data[si    ];
        newImageData.data[di + 1] = imageData.data[si + 1];
        newImageData.data[di + 2] = imageData.data[si + 2];
        newImageData.data[di + 3] = imageData.data[si + 3];
      }
    }
    return newImageData;
  }

  #sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
    const [west, south, east, north] = bbox;
    if (lon < west || lon > east || lat < south || lat > north) return 0;
    const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
    const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
    const x0 = Math.floor(x); const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, width - 1); const y1 = Math.min(y0 + 1, height - 1);
    const dx = x - x0; const dy = y - y0;
    const getSafe = (c, r) => { if (c < 0 || c >= width || r < 0 || r >= height) return 0; const val = elevationData[r * width + c]; return (isFinite(val) && val > -1000 && val < 10000) ? val : 0; };
    const e00 = getSafe(x0, y0); const e10 = getSafe(x1, y0); const e01 = getSafe(x0, y1); const e11 = getSafe(x1, y1);
    const e0 = e00 * (1 - dx) + e10 * dx; const e1 = e01 * (1 - dx) + e11 * dx; return e0 * (1 - dy) + e1 * dy;
  }
}
