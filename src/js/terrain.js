// src/js/terrain.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KeyboardControls } from './controls/KeyboardControls.js';
import { Overlay2D } from './overlays/Overlay2D.js';

/**
 * Modern TerrainRenderer class for 3D terrain visualization.
 * Handles Three.js scene setup, terrain generation, rendering, and
 * geodetic <-> model conversions (including Mercator scaling and vertical exaggeration).
 */
export class TerrainRenderer {
  /**
   * Construct a new renderer. Call generateTerrain() to build the scene.
   */
  constructor() {
    /** @type {THREE.Scene|null} */ this.scene = null;
    /** @type {THREE.PerspectiveCamera|null} */ this.camera = null;
    /** @type {THREE.WebGLRenderer|null} */ this.renderer = null;
    /** @type {OrbitControls|null} */ this.controls = null;

    /** Mapping/scales used for conversions and sampling. Set by initModelMapping(). */
    /** @type {object|null} */ this.modelMap = null;

    /** The generated terrain mesh. */
    /** @type {THREE.Mesh|null} */ this.terrainMesh = null;

    /** High-resolution elevation grid used for vertex heights and surface queries. */
    /** @type {Float32Array|null} */ this.highResElev = null;

    /** Keyboard navigation helper. */
    /** @type {KeyboardControls|null} */ this.keyboardControls = null;

    /** 2D overlay system (compass, speeds, etc.). */
    /** @type {Overlay2D|null} */ this.overlay2D = null;

    /** Animation frame handle and state. */
    /** @type {number|null} */ this.animationId = null;
    /** @type {boolean} */ this.isAnimating = false;

    // Bindings
    this.animate = this.animate.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  // ---------------------------------------------------------------------------
  // Types (JSDoc typedefs)
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Pipeline
  // ---------------------------------------------------------------------------

  /**
   * Generate and display 3D terrain from DEM and texture data.
   *
   * @param {{
   *   width:number,
   *   height:number,
   *   rasters: Float32Array[]|Float32Array,
   *   geoTransform: {originX:number, originY:number, pixelSizeX:number, pixelSizeY:number},
   *   samplesPerPixel:number,
   *   bbox:[number,number,number,number]
   * }} demData DEM (GeoTIFF) read result.
   * @param {ImageData|null} textureImageData Resampled orthophoto/OSM imagery aligned to DEM bbox (optional).
   * @param {number} [heightScaleMultiplier=1] Vertical exaggeration multiplier (1 = true meters).
   * @param {number} [terrainResolution=30] Desired ground resolution (m/cell) for elevation grid and mesh.
   * @param {number|null} [adjustedZoomLevel=null] Unused here; kept for compatibility with caller.
   * @param {number} [sceneResolution=1] Unused here; reserved for future rendering scale.
   * @param {number} [maxTerrainDimension=1024] Max grid dimension (limits triangles/vertices).
   * @param {number} [textureDownsample=1] Downsample factor for texture (1 = original).
   * @param {'auto'|boolean|string} [antialiasing='auto'] Renderer AA setting.
   * @returns {Promise<void>}
   */
  async generateTerrain(
    demData,
    textureImageData,
    heightScaleMultiplier = 1,
    terrainResolution = 30,
    adjustedZoomLevel = null,
    sceneResolution = 1,
    maxTerrainDimension = 1024,
    textureDownsample = 1,
    antialiasing = 'auto'
  ) {
    try {
      // 1) Validate and unpack DEM
      this.validateDEMData(demData);
      const { width, height, rasters, geoTransform, samplesPerPixel, bbox } = demData;
      const elevationData = /** @type {Float32Array} */ (rasters[0] || rasters);

      // 2) Analyze elevation
      const elevationStats = this.analyzeElevationData(elevationData);
      console.log(`DEM analysis: min=${elevationStats.min} m, max=${elevationStats.max} m, valid=${elevationStats.validCount}/${elevationData.length}`);

      // 3) Compute terrain dimensions in Mercator meters & grid sizes
      const terrainDimensions = this.calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension);
      console.log(`Geographic size: ${terrainDimensions.realWorldWidth.toFixed(0)} m × ${terrainDimensions.realWorldHeight.toFixed(0)} m`);
      console.log(`Elevation grid: ${terrainDimensions.terrainWidth} × ${terrainDimensions.terrainHeight} @ ~${terrainResolution} m/cell`);
      console.log(`Mesh vertices:  ${terrainDimensions.meshWidth} × ${terrainDimensions.meshHeight}`);

      // 4) Build high‑res elevation grid matching the target grid
      const isPreResampled = textureImageData &&
        Math.abs(width - textureImageData.width) < 100 &&
        Math.abs(height - textureImageData.height) < 100;

      if (isPreResampled) {
        console.log('Using pre-resampled DEM (resizing to grid).');
        this.highResElev = this.resizeElevationGrid(elevationData, width, height, terrainDimensions);
      } else {
        console.log('Sampling original DEM into high-res grid.');
        this.highResElev = this.buildHighResolutionElevationGrid(
          elevationData,
          width,
          height,
          geoTransform,
          bbox,
          terrainDimensions
        );
      }
      console.log(`High-res elevation grid built: ${this.highResElev.length} samples`);

      // 5) Initialize mapping/scales for conversions & surface queries
      this.initModelMapping(bbox, terrainDimensions, elevationStats, heightScaleMultiplier);

      // 6) Create terrain geometry & texture
      const geometry = this.createTerrainGeometry(terrainDimensions, this.highResElev, elevationStats, heightScaleMultiplier);
      const texture = this.createTerrainTexture(textureImageData, textureDownsample);

      // 7) Init Three.js & put terrain into scene
      this.initThreeJS(antialiasing);
      this.terrainMesh = this.createTerrainMesh(geometry, texture, terrainDimensions);
      this.scene.add(this.terrainMesh);

      // (optional) Drop a 1 km test sphere at some coordinate (remove if not desired)
       this.addTestBall(49.16661, 16.12393);

      // 8) Lights, controls, camera
      this.setupLighting();
      this.initControlsAndOverlays();
      this.positionCamera(terrainDimensions);

      // 9) Animate
      this.startAnimation();
      console.log('Terrain generated.');
    } catch (error) {
      console.error('Error while generating terrain:', error);
      throw error;
    }
  }

  // ---------------------------------------------------------------------------
  // Validation & analysis
  // ---------------------------------------------------------------------------

  /**
   * Validate DEM data structure and dimensions.
   * @param {any} demData
   * @throws {Error} If structure is invalid.
   */
  validateDEMData(demData) {
    const { width, height, samplesPerPixel, rasters } = demData;

    if (width < 2 || height < 2) {
      throw new Error('DEM has invalid size: at least 2×2 pixels required');
    }
    if (samplesPerPixel !== 1) {
      throw new Error('Uploaded file is not a single-band DEM (height model).');
    }

    const elevationData = rasters[0] || rasters;
    if (!elevationData || elevationData.length !== width * height) {
      throw new Error('DEM GeoTIFF contains invalid elevation array.');
    }
  }

  /**
   * Analyze elevation data for min/max and valid count.
   * @param {Float32Array} elevationData
   * @returns {{min:number,max:number,range:number,validCount:number}}
   */
  analyzeElevationData(elevationData) {
    let minElevation = Infinity;
    let maxElevation = -Infinity;
    let validCount = 0;

    for (let i = 0; i < elevationData.length; i++) {
      const value = elevationData[i];
      // Ignore NoData/invalid extremes
      if (isFinite(value) && value > -1000 && value < 10000) {
        if (value < minElevation) minElevation = value;
        if (value > maxElevation) maxElevation = value;
        validCount++;
      }
    }

    return { min: minElevation, max: maxElevation, range: maxElevation - minElevation, validCount };
  }

  // ---------------------------------------------------------------------------
  // Dimensions / grid setup
  // ---------------------------------------------------------------------------

  /**
   * Calculate terrain dimensions based on geographic bounds and desired ground resolution.
   * Real-world sizes are in Web Mercator (EPSG:3857) meters.
   *
   * @param {[number,number,number,number]} bbox [west, south, east, north] in degrees.
   * @param {number} terrainResolution Target ground resolution in meters per grid cell.
   * @param {number} maxTerrainDimension Max grid dimension (caps triangles/vertices).
   * @returns {TerrainDimensions}
   */
  calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension) {
    const [west, south, east, north] = bbox;

    // Web Mercator helpers
    const R = 6378137;
    const degToRad = (d) => d * Math.PI / 180;
    const lonToX = (lon) => R * degToRad(lon);
    const latToY = (lat) => {
      const φ = degToRad(lat);
      const maxφ = degToRad(85.05112878);
      const clamped = Math.max(Math.min(φ, maxφ), -maxφ);
      return R * Math.log(Math.tan(Math.PI / 4 + clamped / 2));
    };

    // Real-world size in meters derived from bbox in degrees
    const realWorldWidth  = Math.abs(lonToX(east)  - lonToX(west));
    const realWorldHeight = Math.abs(latToY(north) - latToY(south));

    // Grid sizes from desired resolution
    let terrainWidth  = Math.max(2, Math.ceil(realWorldWidth  / terrainResolution));
    let terrainHeight = Math.max(2, Math.ceil(realWorldHeight / terrainResolution));

    // Cap grid dimensions
    const maxDim = Math.max(2, maxTerrainDimension | 0);
    const scale = Math.max(terrainWidth / maxDim, terrainHeight / maxDim, 1);
    if (scale > 1) {
      terrainWidth  = Math.max(2, Math.floor(terrainWidth  / scale));
      terrainHeight = Math.max(2, Math.floor(terrainHeight / scale));
    }

    // For PlaneGeometry, segments = cells - 1
    const meshWidth  = terrainWidth;
    const meshHeight = terrainHeight;

    return {
      realWorldWidth,
      realWorldHeight,
      terrainWidth,
      terrainHeight,
      meshWidth,
      meshHeight,
    };
  }

  /**
   * Build a high-resolution elevation grid by sampling the source DEM into the
   * target terrain grid aligned to bbox.
   *
   * @param {Float32Array} elevationData Source DEM samples.
   * @param {number} width Source DEM width in pixels.
   * @param {number} height Source DEM height in pixels.
   * @param {{originX:number,originY:number,pixelSizeX:number,pixelSizeY:number}} geoTransform Source GeoTIFF geotransform.
   * @param {[number,number,number,number]} bbox Target [west,south,east,north] in degrees.
   * @param {TerrainDimensions} dimensions Target grid dims.
   * @returns {Float32Array} High-res elevation grid sized terrainWidth×terrainHeight.
   */
  buildHighResolutionElevationGrid(elevationData, width, height, geoTransform, bbox, dimensions) {
    const [west, south, east, north] = bbox;
    const { terrainWidth, terrainHeight } = dimensions;

    const stepLon = (east - west) / terrainWidth;
    const stepLat = (north - south) / terrainHeight;
    const highResElev = new Float32Array(terrainWidth * terrainHeight);

    for (let r = 0; r < terrainHeight; r++) {
      const lat = north - r * stepLat;
      for (let c = 0; c < terrainWidth; c++) {
        const lon = west + c * stepLon;
        const elevation = this.sampleDEMAtCoordinate(
          elevationData, width, height, geoTransform, bbox, lon, lat
        );
        highResElev[r * terrainWidth + c] = elevation;
      }
    }
    return highResElev;
  }

  /**
   * Resize a source elevation grid to match target terrain dimensions using nearest-neighbor.
   *
   * @param {Float32Array} elevationData Source elevation array (width×height).
   * @param {number} width Source width.
   * @param {number} height Source height.
   * @param {TerrainDimensions} dimensions Target grid dims.
   * @returns {Float32Array}
   */
  resizeElevationGrid(elevationData, width, height, dimensions) {
    const { terrainWidth, terrainHeight } = dimensions;
    const resized = new Float32Array(terrainWidth * terrainHeight);

    for (let r = 0; r < terrainHeight; r++) {
      for (let c = 0; c < terrainWidth; c++) {
        const sourceX = Math.floor(c * width  / terrainWidth);
        const sourceY = Math.floor(r * height / terrainHeight);
        const sourceIndex = sourceY * width + sourceX;
        resized[r * terrainWidth + c] = elevationData[sourceIndex];
      }
    }
    return resized;
  }

  // ---------------------------------------------------------------------------
  // Geometry & texture
  // ---------------------------------------------------------------------------

  /**
   * Create terrain geometry with per-vertex heights from highResElev.
   * @param {TerrainDimensions} dimensions
   * @param {Float32Array} highResElev terrainWidth×terrainHeight elevation grid (meters ASL).
   * @param {ElevationStats} elevationStats
   * @param {number} heightScaleMultiplier Vertical exaggeration (1 = true meters).
   * @returns {THREE.PlaneGeometry}
   */
  createTerrainGeometry(dimensions, highResElev, elevationStats, heightScaleMultiplier) {
    const { realWorldWidth, realWorldHeight, meshWidth, meshHeight, terrainWidth, terrainHeight } = dimensions;

    const geometry = new THREE.PlaneGeometry(realWorldWidth, realWorldHeight, meshWidth - 1, meshHeight - 1);
    const vertices = geometry.attributes.position.array;

    const heightScale = this.calculateHeightScale(
      realWorldWidth,
      realWorldHeight,
      elevationStats.range,
      heightScaleMultiplier
    );

    // Map high-resolution elevation data to mesh vertices
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

  /**
   * Create terrain texture from ImageData or a solid fallback.
   * @param {ImageData|null} textureImageData
   * @param {number} textureDownsample Factor ≥1 to reduce texture size.
   * @returns {THREE.Texture}
   */
  createTerrainTexture(textureImageData, textureDownsample) {
    if (textureImageData) {
      let finalImageData = textureImageData;
      if (textureDownsample > 1) {
        finalImageData = this.downsampleImageData(textureImageData, textureDownsample);
      }
      const canvas = this.imageDataToCanvas(finalImageData);
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

  /**
   * Build and orient the terrain mesh (rotated -90° around X so Y is up).
   * @param {THREE.PlaneGeometry} geometry
   * @param {THREE.Texture} texture
   * @param {TerrainDimensions} dimensions
   * @returns {THREE.Mesh}
   */
  createTerrainMesh(geometry, texture, dimensions) {
    const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; // XY plane -> horizontal, Y up
    return mesh;
  }

  // ---------------------------------------------------------------------------
  // Three.js setup
  // ---------------------------------------------------------------------------

  /**
   * Initialize Three.js scene, camera, renderer, and attach window-resize handler.
   * @param {'auto'|boolean|string} antialiasing Renderer AA setting.
   * @returns {void}
   */
  initThreeJS(antialiasing) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // sky blue

    // Camera
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('three-canvas'));
    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000);

    // Antialiasing
    let aa = false;
    if (antialiasing === 'auto') aa = window.devicePixelRatio <= 2;
    else if (antialiasing === 'true' || antialiasing === true) aa = true;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: aa });
    const width = Math.floor(canvas.clientWidth);
    const height = Math.floor(canvas.clientHeight);
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50000;
    this.controls.maxPolarAngle = Math.PI;

    // Resize
    window.addEventListener('resize', this.handleWindowResize);
  }

  /**
   * Add ambient and directional lighting to the scene.
   * @returns {void}
   */
  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  /**
   * Initialize keyboard controls and 2D overlays.
   * @returns {void}
   */
  initControlsAndOverlays() {
    // Keyboard controls
    this.keyboardControls = new KeyboardControls(this.camera, this.controls, this.renderer);
    this.keyboardControls.init();

    // Overlay UI
    this.overlay2D = new Overlay2D(this.camera, this.keyboardControls);
    this.overlay2D.init();
    this.overlay2D.show();

    // Sync callbacks
    this.overlay2D.setSpeedChangeCallback((type, value) => {
      if (type === 'movement') this.keyboardControls.setMovementSpeed(value);
      else if (type === 'rotation') this.keyboardControls.setRotationSpeed(value);
    });

    // Initial sync
    this.keyboardControls.setMovementSpeed(this.overlay2D.getMovementSpeed());
    this.keyboardControls.setRotationSpeed(this.overlay2D.getRotationSpeed());
  }

  /**
   * Place the camera at a reasonable vantage point based on terrain size.
   * @param {TerrainDimensions} dimensions
   * @returns {void}
   */
  positionCamera(dimensions) {
    const maxDimension = Math.max(dimensions.realWorldWidth, dimensions.realWorldHeight);
    this.camera.position.set(0, maxDimension * 0.5, maxDimension * 0.3);
    this.camera.lookAt(0, 0, 0);
  }

  // ---------------------------------------------------------------------------
  // Animation loop
  // ---------------------------------------------------------------------------

  /** Start the render loop. */
  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  /** Stop the render loop and clear the RAF handle. */
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isAnimating = false;
  }

  /**
   * Animation tick: update controls/overlays and render the scene.
   * @returns {void}
   */
  animate() {
    if (!this.isAnimating) return;
    this.animationId = requestAnimationFrame(this.animate);

    if (this.keyboardControls) this.keyboardControls.update();
    if (this.controls && (!this.keyboardControls || !this.keyboardControls.isKeyboardActive())) this.controls.update();
    if (this.overlay2D) this.overlay2D.update();

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Handle browser window resizes.
   * @returns {void}
   */
  handleWindowResize() {
    if (!this.camera || !this.renderer) return;
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('three-canvas'));
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }

  // ---------------------------------------------------------------------------
  // Scales, sampling, and conversions
  // ---------------------------------------------------------------------------

  /**
   * Calculate the vertical scale used when writing vertex Z.
   * Here we use the multiplier directly so 1 → true meters, 2 → 2× exaggeration, etc.
   *
   * @param {number} geographicWidth  Terrain width in meters (Mercator).
   * @param {number} geographicHeight Terrain height in meters (Mercator).
   * @param {number} elevationRange   Elevation range (max - min) in meters.
   * @param {number} heightScaleMultiplier User-configured exaggeration multiplier.
   * @returns {number} Final vertical scaling factor.
   */
  calculateHeightScale(geographicWidth, geographicHeight, elevationRange, heightScaleMultiplier) {
    if (elevationRange <= 0) {
      console.warn('Elevation range is zero or negative; using multiplier as-is');
      return heightScaleMultiplier;
    }
    const finalScale = heightScaleMultiplier;
    console.log(`Height scale: range=${elevationRange} m, multiplier=${heightScaleMultiplier}, final=${finalScale}`);
    return finalScale;
  }

  /**
   * Sample DEM elevation (bilinear) at given geographic coordinate.
   * @param {Float32Array} elevationData Source DEM data.
   * @param {number} width DEM width in pixels.
   * @param {number} height DEM height in pixels.
   * @param {{originX:number, originY:number, pixelSizeX:number, pixelSizeY:number}} geoTransform GeoTIFF transform.
   * @param {[number,number,number,number]} bbox [west,south,east,north] in degrees.
   * @param {number} lon Longitude (deg).
   * @param {number} lat Latitude (deg).
   * @returns {number} Elevation in meters ASL (0 if outside or invalid).
   */
  sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
    const [west, south, east, north] = bbox;

    // Outside?
    if (lon < west || lon > east || lat < south || lat > north) return 0;

    // GeoTransform → pixel coords
    const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
    const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;

    // Bilinear interpolation
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, width - 1);
    const y1 = Math.min(y0 + 1, height - 1);
    const dx = x - x0;
    const dy = y - y0;

    const getSafe = (c, r) => {
      if (c < 0 || c >= width || r < 0 || r >= height) return 0;
      const val = elevationData[r * width + c];
      return (isFinite(val) && val > -1000 && val < 10000) ? val : 0;
    };

    const e00 = getSafe(x0, y0);
    const e10 = getSafe(x1, y0);
    const e01 = getSafe(x0, y1);
    const e11 = getSafe(x1, y1);

    const e0 = e00 * (1 - dx) + e10 * dx;
    const e1 = e01 * (1 - dx) + e11 * dx;
    return e0 * (1 - dy) + e1 * dy;
  }

  /**
   * Convert ImageData to an HTMLCanvasElement for CanvasTexture.
   * @param {ImageData} imageData
   * @returns {HTMLCanvasElement}
   */
  imageDataToCanvas(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Downsample ImageData by integer factor using nearest-neighbor.
   * @param {ImageData} imageData
   * @param {number} factor Integer ≥ 1
   * @returns {ImageData}
   */
  downsampleImageData(imageData, factor) {
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

  // ---------------------------------------------------------------------------
  // Geodetic ↔ model conversions (Mercator scale, vertical exaggeration)
  // ---------------------------------------------------------------------------

  /**
   * Initialize geodetic→model mapping and store scale factors for later conversions.
   * Must be called after terrain geometry/metrics are known (inside generateTerrain).
   *
   * @param {[number, number, number, number]} bbox [west, south, east, north] in degrees.
   * @param {TerrainDimensions} dimensions Terrain and mesh dimensions in meters/samples.
   * @param {ElevationStats} elevationStats Elevation stats (meters ASL).
   * @param {number} [heightScaleMultiplier=1] User vertical exaggeration multiplier.
   * @returns {void}
   */
  initModelMapping(bbox, dimensions, elevationStats, heightScaleMultiplier = 1) {
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

    const verticalScale = this.calculateHeightScale(
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

  /**
   * Mercator local horizontal scale factor k(φ) = sec φ = 1 / cos φ.
   * Converts real ground meters → Mercator model meters at latitude φ.
   * @param {number} latDeg Latitude in degrees.
   * @returns {number} Scale factor (≥1). Approaches ∞ near ±90°.
   * @private
   */
  _mercatorScaleAtLat(latDeg) {
    const φ = (latDeg * Math.PI) / 180;
    const c = Math.cos(φ);
    return (c === 0) ? Infinity : 1 / c;
  }

  /**
   * Convert real meters to model units.
   * - 'horizontal': applies Mercator scale k(φ) (sec φ). If `lat` omitted, bbox center is used.
   * - 'vertical'  : applies terrain vertical exaggeration scale used by the mesh.
   *
   * @param {number} meters Real-world meters.
   * @param {'horizontal'|'vertical'} [axis='horizontal'] Axis to convert for.
   * @param {number} [lat] Latitude in degrees for horizontal scaling.
   * @returns {number} Model units corresponding to the input meters.
   */
  metersToModelUnits(meters, axis = 'horizontal', lat /* number | undefined */) {
    if (!this.modelMap) throw new Error('Model mapping not initialized.');
    const { verticalScale, centerLatRad } = this.modelMap;

    if (axis === 'vertical') {
      return meters * verticalScale;
    } else {
      const φdeg = (lat == null) ? (centerLatRad * 180 / Math.PI) : lat;
      const k = this._mercatorScaleAtLat(φdeg);
      return meters * k;
    }
  }

  /**
   * Bilinear sample from the high-resolution elevation grid (DEM), returning meters ASL.
   * @param {number} x Fractional X index (0..gridW-1).
   * @param {number} y Fractional Y index (0..gridH-1).
   * @returns {number|null} Elevation in meters ASL, or null if grid not available.
   * @private
   */
  _bilinearElevation(x, y) {
    if (!this.highResElev || !this.modelMap) return null;
    const { gridW, gridH } = this.modelMap;

    const x0 = Math.max(0, Math.min(gridW - 1, Math.floor(x)));
    const y0 = Math.max(0, Math.min(gridH - 1, Math.floor(y)));
    const x1 = Math.max(0, Math.min(gridW - 1, x0 + 1));
    const y1 = Math.max(0, Math.min(gridH - 1, y0 + 1));

    const tx = Math.max(0, Math.min(1, x - x0));
    const ty = Math.max(0, Math.min(1, y - y0));

    const idx = (ix, iy) => iy * gridW + ix;

    const z00 = this.highResElev[idx(x0, y0)];
    const z10 = this.highResElev[idx(x1, y0)];
    const z01 = this.highResElev[idx(x0, y1)];
    const z11 = this.highResElev[idx(x1, y1)];

    const z0 = z00 * (1 - tx) + z10 * tx;
    const z1 = z01 * (1 - tx) + z11 * tx;
    return z0 * (1 - ty) + z1 * ty;
  }

  /**
   * Convert (lat, lon) to world/scene coordinates on the terrain surface.
   * Coordinates are consistent with the mesh after the -90° rotation around X:
   *  - X: east-positive (meters), centered at terrain midline
   *  - Y: up (model vertical units, i.e., meters * verticalScale)
   *  - Z: south-positive is negative (north-positive becomes negative Z)
   *
   * @param {number} lat Latitude in degrees.
   * @param {number} lon Longitude in degrees.
   * @param {{clampToBounds?: boolean}} [options]
   * @returns {{x:number,y:number,z:number}} Scene/world coordinates on the surface.
   */
  latLonToModelXYZ(lat, lon, { clampToBounds = true } = {}) {
    if (!this.modelMap || !this.terrainMesh) {
      throw new Error('Model mapping or terrain mesh not initialized.');
    }
    const {
      westX, eastX, southY, northY,
      widthMeters, heightMeters,
      gridW, gridH,
      elevMin, verticalScale,
    } = this.modelMap;

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

    // PlaneGeometry local (pre-rotation): X ∈ [-width/2,+width/2], Y ∈ [-height/2,+height/2]
    const xLocal = (u - 0.5) * widthMeters;
    const yLocal = (v - 0.5) * heightMeters;

    // Sample elevation at DEM grid resolution
    const fx = u * (gridW - 1);
    const fy = v * (gridH - 1);
    const elevMeters = this._bilinearElevation(fx, fy) ?? elevMin;

    // Geometry Z (pre-rotation) is vertical in model units
    const zLocalBeforeRotation = (elevMeters - elevMin) * verticalScale;

    // Convert to scene coordinates (mesh rotated -90° about X)
    return { x: xLocal, y: zLocalBeforeRotation, z: -yLocal };
  }

  /**
   * Create a red sphere of 1 km diameter at (lat, lon), resting on the terrain surface.
   * The sphere reflects **true physical dimensions** at that latitude:
   * - Horizontal radius uses Mercator scaling k(φ) so 1000 m → 1000·k(φ) model units.
   * - Vertical radius uses the terrain's vertical exaggeration.
   * The mesh Y-scale is adjusted so the sphere remains a true sphere in real meters.
   *
   * @param {number} lat Latitude in degrees.
   * @param {number} lon Longitude in degrees.
   * @returns {THREE.Mesh} The created sphere mesh (already added to the scene).
   */
  addTestBall(lat, lon) {
    if (!this.modelMap) throw new Error('Model mapping not initialized.');
    if (!this.scene)    throw new Error('Scene not initialized.');

    const radiusMeters = 500; // 1 km diameter

    // Horizontal (XY) uses Mercator k(φ); vertical uses exaggeration
    const radiusHorizUnits = this.metersToModelUnits(radiusMeters, 'horizontal', lat);
    const radiusVertUnits  = this.metersToModelUnits(radiusMeters, 'vertical');

    // Surface anchor
    const p = this.latLonToModelXYZ(lat, lon);

    // Build sphere with horizontal radius
    const geom = new THREE.SphereGeometry(radiusHorizUnits, 48, 32);
    const mat  = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.6, metalness: 0.0 });
    const sphere = new THREE.Mesh(geom, mat);
    sphere.name = 'TestBall_1000m';

    // Keep it a *true* sphere in real meters despite vertical exaggeration
    const k = this._mercatorScaleAtLat(lat);               // sec φ
    const yScaleComp = (this.modelMap.verticalScale) / k;  // verticalUnits / horizontalUnitsPerMeter
    sphere.scale.set(1, yScaleComp, 1);

    // Resting on the ground (center lifted by vertical radius)
    sphere.position.set(p.x, p.y + radiusVertUnits, p.z);

    this.scene.add(sphere);
    return sphere;
  }

  // ---------------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------------

  /**
   * Dispose of resources, remove listeners, and clear references.
   * @returns {void}
   */
  dispose() {
    // Stop animation
    this.stopAnimation();

    // Controls and overlays
    if (this.keyboardControls) { this.keyboardControls.dispose(); this.keyboardControls = null; }
    if (this.overlay2D) { this.overlay2D.dispose(); this.overlay2D = null; }

    // Dispose scene objects
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });
      this.scene.clear();
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    // Event listeners
    window.removeEventListener('resize', this.handleWindowResize);

    // Clear refs
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
  }
}

// Export both the class and a convenience function for backward compatibility
export const terrainRenderer = new TerrainRenderer();

/** Backward-compatibility function mirroring prior API. */
export function generateTerrain(...args) {
  return terrainRenderer.generateTerrain(...args);
}
