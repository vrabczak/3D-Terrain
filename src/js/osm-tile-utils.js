// js/osm-tile-utils.js
// Utilities for loading and processing OpenStreetMap tiles in z/y/x format

/**
 * Convert latitude/longitude to tile coordinates at given zoom level
 * @param {number} lat - Latitude in degrees
 * @param {number} lon - Longitude in degrees  
 * @param {number} zoom - Zoom level
 * @returns {object} Tile coordinates {x, y, z}
 */
export function latLonToTile(lat, lon, zoom) {
  const latRad = lat * Math.PI / 180;
  const n = Math.pow(2, zoom);
  const x = Math.floor((lon + 180) / 360 * n);
  const y = Math.floor((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n);
  return { x, y, z: zoom };
}

/**
 * Convert tile coordinates to latitude/longitude bounds
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} z - Zoom level
 * @returns {object} Bounds {north, south, east, west}
 */
export function tileToBounds(x, y, z) {
  const n = Math.pow(2, z);
  const west = x / n * 360 - 180;
  const east = (x + 1) / n * 360 - 180;
  const north = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
  const south = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI;
  return { north, south, east, west };
}

/**
 * Detect available zoom levels in the OSM tile folder
 * @param {FileSystemDirectoryHandle} folderHandle - Folder containing tiles
 * @returns {Promise<number[]>} Array of available zoom levels, sorted from lowest to highest
 */
export async function detectAvailableZoomLevels(folderHandle) {
  const availableZooms = [];
  
  try {
    for await (const [name, handle] of folderHandle.entries()) {
      if (handle.kind === 'directory') {
        const zoomLevel = parseInt(name);
        if (!isNaN(zoomLevel) && zoomLevel >= 0 && zoomLevel <= 20) {
          availableZooms.push(zoomLevel);
        }
      }
    }
  } catch (error) {
    console.warn('Error detecting zoom levels:', error);
  }
  
  return availableZooms.sort((a, b) => a - b);
}

/**
 * Detect available zoom levels from FileList (webkitdirectory)
 * @param {FileList} files - Files from webkitdirectory input
 * @returns {Promise<number[]>} Array of available zoom levels, sorted from lowest to highest
 */
export async function detectAvailableZoomLevelsFromFiles(files) {
  const availableZooms = new Set();
  
  try {
    for (const file of files) {
      const pathParts = file.webkitRelativePath.split('/');
      if (pathParts.length >= 2) {
        const zoomLevel = parseInt(pathParts[1]); // First part is folder name, second is zoom level
        if (!isNaN(zoomLevel) && zoomLevel >= 0 && zoomLevel <= 20) {
          availableZooms.add(zoomLevel);
        }
      }
    }
  } catch (error) {
    console.warn('Error detecting zoom levels from files:', error);
  }
  
  return Array.from(availableZooms).sort((a, b) => a - b);
}

/**
 * Calculate tile range needed to cover an area
 * @param {number} centerLat - Center latitude
 * @param {number} centerLon - Center longitude
 * @param {number} sizeKm - Size in kilometers
 * @param {number} zoom - Zoom level
 * @returns {object} Tile range {minX, maxX, minY, maxY, zoom}
 */
export function calculateTileRange(centerLat, centerLon, sizeKm, zoom) {
  // Convert km to degrees (approximate)
  const kmPerDegree = 111.32; // at equator
  const latOffset = (sizeKm / 2) / kmPerDegree;
  const lonOffset = (sizeKm / 2) / (kmPerDegree * Math.cos(centerLat * Math.PI / 180));
  
  const northLat = centerLat + latOffset;
  const southLat = centerLat - latOffset;
  const eastLon = centerLon + lonOffset;
  const westLon = centerLon - lonOffset;
  
  const nw = latLonToTile(northLat, westLon, zoom);
  const se = latLonToTile(southLat, eastLon, zoom);
  
  return {
    minX: Math.min(nw.x, se.x),
    maxX: Math.max(nw.x, se.x),
    minY: Math.min(nw.y, se.y),
    maxY: Math.max(nw.y, se.y),
    zoom: zoom
  };
}

/**
 * Load tiles from folder and create a mosaic texture
 * @param {FileSystemDirectoryHandle} folderHandle - Folder containing tiles
 * @param {object} tileRange - Tile range to load
 * @param {number} tileSize - Size of individual tiles (default 256)
 * @param {Function} onProgress - Optional progress callback (loaded, total, message)
 * @returns {Promise<ImageData>} Mosaic texture as ImageData
 */
export async function loadTileMosaic(folderHandle, tileRange, tileSize = 256, onProgress = null) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  const tilesWide = maxX - minX + 1;
  const tilesHigh = maxY - minY + 1;
  const totalTiles = tilesWide * tilesHigh;
  const mosaicWidth = tilesWide * tileSize;
  const mosaicHeight = tilesHigh * tileSize;
  
  console.log(`Loading ${tilesWide}x${tilesHigh} tiles (${mosaicWidth}x${mosaicHeight} pixels)`);
  
  // Create canvas for mosaic
  const canvas = document.createElement('canvas');
  canvas.width = mosaicWidth;
  canvas.height = mosaicHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill with default color in case some tiles are missing
  ctx.fillStyle = '#8FBC8F'; // Default green color
  ctx.fillRect(0, 0, mosaicWidth, mosaicHeight);
  
  const loadPromises = [];
  let loadedTiles = 0;
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const promise = loadSingleTile(folderHandle, zoom, x, y, tileSize)
        .then(img => {
          if (img) {
            const canvasX = (x - minX) * tileSize;
            const canvasY = (y - minY) * tileSize;
            ctx.drawImage(img, canvasX, canvasY, tileSize, tileSize);
          }
          
          // Update progress
          loadedTiles++;
          if (onProgress) {
            onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
          }
        })
        .catch(err => {
          console.warn(`Failed to load tile ${zoom}/${x}/${y}:`, err);
          
          // Still count as "loaded" for progress tracking
          loadedTiles++;
          if (onProgress) {
            onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
          }
        });
      
      loadPromises.push(promise);
    }
  }
  
  await Promise.all(loadPromises);
  
  // Return ImageData
  return ctx.getImageData(0, 0, mosaicWidth, mosaicHeight);
}

/**
 * Load tiles from FileList and create a mosaic texture
 * @param {FileList} files - Files from webkitdirectory input
 * @param {object} tileRange - Tile range to load
 * @param {number} tileSize - Size of individual tiles (default 256)
 * @param {Function} onProgress - Optional progress callback (loaded, total, message)
 * @returns {Promise<ImageData>} Mosaic texture as ImageData
 */
export async function loadTileMosaicFromFiles(files, tileRange, tileSize = 256, onProgress = null) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  const tilesWide = maxX - minX + 1;
  const tilesHigh = maxY - minY + 1;
  const totalTiles = tilesWide * tilesHigh;
  const mosaicWidth = tilesWide * tileSize;
  const mosaicHeight = tilesHigh * tileSize;
  
  console.log(`Loading ${tilesWide}x${tilesHigh} tiles (${mosaicWidth}x${mosaicHeight} pixels)`);
  
  // Create file lookup map for faster access
  const fileMap = new Map();
  for (const file of files) {
    const pathParts = file.webkitRelativePath.split('/');
    if (pathParts.length >= 4) {
      const z = pathParts[1];
      const x = pathParts[2];
      const y = pathParts[3].replace('.jpg', ''); // Remove extension
      const key = `${z}/${x}/${y}`;
      fileMap.set(key, file);
    }
  }
  
  // Create canvas for mosaic
  const canvas = document.createElement('canvas');
  canvas.width = mosaicWidth;
  canvas.height = mosaicHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill with default color (light gray)
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, mosaicWidth, mosaicHeight);
  
  let loadedTiles = 0;
  const loadPromises = [];
  
  for (let tileY = minY; tileY <= maxY; tileY++) {
    for (let tileX = minX; tileX <= maxX; tileX++) {
      const promise = (async () => {
        try {
          const img = await loadSingleTileFromFiles(fileMap, zoom, tileX, tileY, tileSize);
          if (img) {
            const canvasX = (tileX - minX) * tileSize;
            const canvasY = (tileY - minY) * tileSize;
            ctx.drawImage(img, canvasX, canvasY, tileSize, tileSize);
          }
        } catch (error) {
          console.warn(`Failed to load tile ${zoom}/${tileX}/${tileY}:`, error);
        }
        
        loadedTiles++;
        if (onProgress) {
          onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
        }
      })();
      
      loadPromises.push(promise);
    }
  }
  
  await Promise.all(loadPromises);
  
  // Return ImageData
  return ctx.getImageData(0, 0, mosaicWidth, mosaicHeight);
}

/**
 * Load a single tile from the folder structure
 * @param {FileSystemDirectoryHandle} folderHandle - Root folder handle
 * @param {number} z - Zoom level
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} tileSize - Expected tile size
 * @returns {Promise<HTMLImageElement|null>} Loaded image or null if not found
 */
async function loadSingleTile(folderHandle, z, x, y, tileSize) {
  try {
    // Navigate folder structure: z/x/y.jpg
    const zHandle = await folderHandle.getDirectoryHandle(z.toString());
    const xHandle = await zHandle.getDirectoryHandle(x.toString());
    const fileHandle = await xHandle.getFileHandle(`${y}.jpg`);
    
    const file = await fileHandle.getFile();
    const url = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image`));
      };
      img.src = url;
    });
  } catch (error) {
    return null; // Tile not found
  }
}

/**
 * Load a single tile from FileList
 * @param {Map} fileMap - Map of tile paths to File objects
 * @param {number} z - Zoom level
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} tileSize - Expected tile size
 * @returns {Promise<HTMLImageElement|null>} Loaded image or null if not found
 */
async function loadSingleTileFromFiles(fileMap, z, x, y, tileSize) {
  try {
    const key = `${z}/${x}/${y}`;
    const file = fileMap.get(key);
    
    if (!file) {
      return null; // Tile not found
    }
    
    const url = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image`));
      };
      img.src = url;
    });
  } catch (error) {
    return null; // Tile not found
  }
}

/**
 * Calculate geographic bounds for the loaded tile area
 * @param {object} tileRange - Tile range
 * @returns {object} Geographic bounds [west, south, east, north]
 */
export function getTileAreaBounds(tileRange) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  
  const nw = tileToBounds(minX, minY, zoom);
  const se = tileToBounds(maxX, maxY, zoom);
  
  return [nw.west, se.south, se.east, nw.north]; // [west, south, east, north]
}

/**
 * Determine optimal zoom level based on area size and available zoom levels
 * @param {number} sizeKm - Area size in kilometers
 * @param {number[]} availableZooms - Available zoom levels in the folder
 * @param {number} maxTiles - Maximum number of tiles to load (default 100)
 * @returns {number} Optimal zoom level
 */
export function getOptimalZoomLevel(sizeKm, availableZooms = [], maxTiles = 100) {
  // If no available zooms provided, use the original logic
  if (availableZooms.length === 0) {
    return getOptimalZoomLevelOriginal(sizeKm, maxTiles);
  }
  
  // Sort available zooms from highest to lowest (prefer higher detail)
  const sortedZooms = [...availableZooms].sort((a, b) => b - a);
  
  // At zoom level z, each tile covers approximately (40075 / 2^z) km at equator
  const kmPerTileAtEquator = 40075; // Earth circumference in km
  
  for (const zoom of sortedZooms) {
    const kmPerTile = kmPerTileAtEquator / Math.pow(2, zoom);
    const tilesNeeded = Math.pow(Math.ceil(sizeKm / kmPerTile), 2);
    
    if (tilesNeeded <= maxTiles) {
      console.log(`Selected zoom level ${zoom} from available levels: [${availableZooms.join(', ')}]`);
      return zoom;
    }
  }
  
  // If all zoom levels require too many tiles, use the lowest available zoom
  const lowestZoom = Math.min(...availableZooms);
  console.log(`All zoom levels require too many tiles, using lowest available: ${lowestZoom}`);
  return lowestZoom;
}

/**
 * Original zoom level calculation (fallback when no folder is scanned)
 * @param {number} sizeKm - Area size in kilometers
 * @param {number} maxTiles - Maximum number of tiles to load (default 100)
 * @returns {number} Optimal zoom level
 */
function getOptimalZoomLevelOriginal(sizeKm, maxTiles = 100) {
  // At zoom level z, each tile covers approximately (40075 / 2^z) km at equator
  const kmPerTileAtEquator = 40075; // Earth circumference in km
  
  for (let zoom = 1; zoom <= 18; zoom++) {
    const kmPerTile = kmPerTileAtEquator / Math.pow(2, zoom);
    const tilesNeeded = Math.pow(Math.ceil(sizeKm / kmPerTile), 2);
    
    if (tilesNeeded <= maxTiles) {
      return zoom;
    }
  }
  
  return 10; // Fallback zoom level
}
