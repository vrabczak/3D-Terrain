/**
 * Data processing utilities for DEM and terrain data
 *
 * NOTE:
 * The previous implementation used nearest-neighbour with integer rounding,
 * which introduced "stair-step / cascade" artefacts aligned N-S and E-W.
 * This version samples at pixel CENTERS and uses **bilinear interpolation**
 * in the source DEM. Only this file is changed; the API stays the same.
 */

/**
 * Resample DEM data to match texture dimensions and geographic bounds
 * @param {Object} demData - Original DEM data:
 *   { rasters:[TypedArray] | TypedArray, width, height, geoTransform:{originX,originY,pixelSizeX,pixelSizeY}, bbox:[w,s,e,n], noDataValue? }
 * @param {ImageData} textureImageData - Texture (only width/height are used)
 * @param {Array<number>} tileBounds - [west, south, east, north]
 * @returns {Object} Resampled DEM data structure (same shape as input demData, but with the texture size/bounds)
 */
export function resampleDEMToTexture(demData, textureImageData, tileBounds) {
  const { rasters, width: demWidth, height: demHeight, geoTransform, bbox, noDataValue } = demData;
  const elevationData = Array.isArray(rasters) ? rasters[0] : rasters;

  const texW = textureImageData.width;
  const texH = textureImageData.height;

  const [west, south, east, north] = tileBounds;

  // Pixel size of the target grid (in degrees) & sample at pixel centers
  const pixelSizeX = (east - west) / texW;
  const pixelSizeY = (north - south) / texH;

  const out = new Float32Array(texW * texH);

  // Precompute once for speed
  const demOriginX = geoTransform?.originX ?? bbox?.[0];
  const demOriginY = geoTransform?.originY ?? bbox?.[3];
  const demPixX    = geoTransform?.pixelSizeX ?? ((bbox?.[2] - bbox?.[0]) / demWidth);
  const demPixY    = geoTransform?.pixelSizeY ?? ((bbox?.[1] - bbox?.[3]) / demHeight); // usually negative

  // Optional NoData detection
  const hasNoData = Number.isFinite(noDataValue);

  for (let y = 0; y < texH; y++) {
    // geographic Y at pixel center (remember image Y grows downward)
    const lat = north - (y + 0.5) * pixelSizeY;

    // map to DEM continuous coordinates
    const demY = (lat - demOriginY) / demPixY; // demPixY may be negative – division handles it

    for (let x = 0; x < texW; x++) {
      const lon = west + (x + 0.5) * pixelSizeX;
      const demX = (lon - demOriginX) / demPixX;

      // Bilinear interpolation
      const v = bilinearSample(elevationData, demWidth, demHeight, demX, demY, hasNoData ? noDataValue : undefined);

      // Final guardrail against extreme or invalid values
      out[y * texW + x] = (Number.isFinite(v) && v > -10000 && v < 100000) ? v : 0;
    }
  }

  return {
    rasters: [out],
    width: texW,
    height: texH,
    bbox: [west, south, east, north],
    geoTransform: {
      originX: west,
      originY: north,
      pixelSizeX: pixelSizeX,
      pixelSizeY: -Math.abs(pixelSizeY) // Y down in image space
    },
    noDataValue,
    samplesPerPixel: 1
  };
}

/**
 * Sample elevation from DEM at a specific geographic coordinate (bilinear)
 * @param {TypedArray} elevationData - DEM elevation data (row-major)
 * @param {number} width - DEM width
 * @param {number} height - DEM height
 * @param {Object} geoTransform - {originX, originY, pixelSizeX, pixelSizeY}
 * @param {Array<number>} bbox - [west, south, east, north]
 * @param {number} lon - Longitude to sample
 * @param {number} lat - Latitude to sample
 * @returns {number} Elevation value or 0 if outside bounds
 */
export function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  // Quick reject if outside geographic bounds (inclusive on edges)
  if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
    return 0;
  }

  const originX = geoTransform?.originX ?? bbox[0];
  const originY = geoTransform?.originY ?? bbox[3];
  const pixelSizeX = geoTransform?.pixelSizeX ?? ((bbox[2] - bbox[0]) / width);
  const pixelSizeY = geoTransform?.pixelSizeY ?? ((bbox[1] - bbox[3]) / height); // usually negative

  // Continuous pixel coordinates (0..width-1 / 0..height-1)
  const x = (lon - originX) / pixelSizeX;
  const y = (lat - originY) / pixelSizeY;

  // Bilinear interpolation
  return bilinearSample(elevationData, width, height, x, y, geoTransform?.noDataValue);
}

/**
 * Bilinear sampling from a row-major raster at continuous coordinates.
 * Returns NaN if the sample falls outside; caller should handle clamping.
 * @param {TypedArray} data
 * @param {number} width
 * @param {number} height
 * @param {number} x - continuous x (pixel space)
 * @param {number} y - continuous y (pixel space)
 * @param {number|undefined} noDataValue
 * @returns {number}
 */
function bilinearSample(data, width, height, x, y, noDataValue) {
  // If outside, early exit
  if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
    return 0;
  }

  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, width  - 1);
  const y1 = Math.min(y0 + 1, height - 1);

  const fx = x - x0;
  const fy = y - y0;

  // Fetch 4 neighbors
  const i00 = y0 * width + x0;
  const i10 = y0 * width + x1;
  const i01 = y1 * width + x0;
  const i11 = y1 * width + x1;

  let v00 = data[i00];
  let v10 = data[i10];
  let v01 = data[i01];
  let v11 = data[i11];

  // Handle NoData by falling back to the average of available neighbors
  if (noDataValue !== undefined) {
    if (v00 === noDataValue || !Number.isFinite(v00)) v00 = undefined;
    if (v10 === noDataValue || !Number.isFinite(v10)) v10 = undefined;
    if (v01 === noDataValue || !Number.isFinite(v01)) v01 = undefined;
    if (v11 === noDataValue || !Number.isFinite(v11)) v11 = undefined;
  }

  // If some neighbors are missing, average the ones we have (simple but robust)
  const vals = [v00, v10, v01, v11].filter(v => v !== undefined && Number.isFinite(v));
  if (vals.length === 0) return 0;
  if (vals.length < 4) {
    // Weighted average using available corners (approximate)
    const w00 = (1 - fx) * (1 - fy);
    const w10 = (fx)     * (1 - fy);
    const w01 = (1 - fx) * (fy);
    const w11 = (fx)     * (fy);
    const weights = [w00, w10, w01, w11];
    let num = 0, den = 0;
    for (let i = 0; i < 4; i++) {
      const v = [v00, v10, v01, v11][i];
      if (v !== undefined && Number.isFinite(v)) {
        num += v * weights[i];
        den += weights[i];
      }
    }
    return den > 0 ? num / den : 0;
  }

  // Standard bilinear mix
  const a = v00 * (1 - fx) + v10 * fx;
  const b = v01 * (1 - fx) + v11 * fx;
  return a * (1 - fy) + b * fy;
}
