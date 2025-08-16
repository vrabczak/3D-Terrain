/**
 * Data processing utilities for DEM and terrain data
 */

/**
 * Resample DEM data to match texture dimensions and geographic bounds
 * @param {Object} demData - Original DEM data
 * @param {ImageData} textureImageData - Tile texture data
 * @param {Array} tileBounds - Geographic bounds [west, south, east, north]
 * @returns {Object} Resampled DEM data structure
 */
export function resampleDEMToTexture(demData, textureImageData, tileBounds) {
  const { rasters, width: demWidth, height: demHeight, geoTransform: demGeoTransform, bbox: demBbox } = demData;
  const elevationData = rasters[0] || rasters;

  const textureWidth = textureImageData.width;
  const textureHeight = textureImageData.height;

  console.log(`Převzorkování DEM z ${demWidth}x${demHeight} na ${textureWidth}x${textureHeight}`);
  console.log('DEM bbox:', demBbox);
  console.log('Tile bounds:', tileBounds);

  // Create new elevation array matching texture dimensions
  const newElevationData = new Float32Array(textureWidth * textureHeight);

  // Calculate geographic bounds and pixel sizes for the tile area
  const [west, south, east, north] = tileBounds;
  const tilePixelSizeX = (east - west) / textureWidth;
  const tilePixelSizeY = (north - south) / textureHeight;

  // Fill the new elevation array by sampling from the original DEM
  for (let row = 0; row < textureHeight; row++) {
    for (let col = 0; col < textureWidth; col++) {
      // Calculate geographic coordinates for this pixel in the tile texture
      const lon = west + col * tilePixelSizeX;
      const lat = north - row * tilePixelSizeY; // Note: north - row because image coordinates are flipped
    
      // Sample elevation from the original DEM at this geographic location
      const elevation = sampleDEMAtCoordinate(elevationData, demWidth, demHeight, demGeoTransform, demBbox, lon, lat);
    
      const index = row * textureWidth + col;
      newElevationData[index] = elevation;
    }
  }

  // Create new DEM data structure matching the tile texture
  return {
    ...demData,
    rasters: [newElevationData],
    width: textureWidth,
    height: textureHeight,
    bbox: tileBounds,
    geoTransform: {
      originX: west,
      originY: north,
      pixelSizeX: tilePixelSizeX,
      pixelSizeY: -tilePixelSizeY // Negative because Y increases downward in image coordinates
    }
  };
}

/**
 * Sample elevation from DEM at a specific geographic coordinate
 * @param {TypedArray} elevationData - DEM elevation data
 * @param {number} width - DEM width
 * @param {number} height - DEM height
 * @param {Object} geoTransform - DEM geotransform
 * @param {Array} bbox - DEM bounding box [west, south, east, north]
 * @param {number} lon - Longitude to sample
 * @param {number} lat - Latitude to sample
 * @returns {number} Elevation value or 0 if outside bounds
 */
export function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  // Check if coordinate is within DEM bounds
  if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
    return 0; // Outside DEM bounds
  }

  // Convert geographic coordinates to pixel coordinates
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX + 0.5;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY + 0.5;

  const col = Math.round(x);
  const row = Math.round(y);

  // Check pixel bounds
  if (col < 0 || col >= width || row < 0 || row >= height) {
    return 0;
  }

  // Simple nearest neighbor sampling
  const index = row * width + col;
  const elevation = elevationData[index];

  // Return elevation or 0 for invalid values
  return (isFinite(elevation) && elevation > -1000 && elevation < 10000) ? elevation : 0;
}
