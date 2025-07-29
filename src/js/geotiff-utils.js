// js/geotiff-utils.js
import { fromBlob } from 'geotiff';

export async function loadGeoTIFF(file) {
  const tiff = await fromBlob(file);
  const image = await tiff.getImage();
  
  // Check if this is a DEM (single band) or orthophoto (multi-band)
  const samplesPerPixel = image.getSamplesPerPixel();
  console.log(`Loading GeoTIFF: ${image.getWidth()}x${image.getHeight()}, ${samplesPerPixel} bands`);
  
  let rasters;
  if (samplesPerPixel === 1) {
    // DEM - single band, no interleaving needed
    const rasterData = await image.readRasters();
    console.log('Raw raster data type:', typeof rasterData);
    console.log('Raw raster data constructor:', rasterData.constructor.name);
    console.log('Raw raster data length/size:', rasterData.length || 'no length property');
    console.log('Is array?', Array.isArray(rasterData));
    
    // Handle different possible return formats
    if (Array.isArray(rasterData)) {
      rasters = rasterData;
      console.log(`DEM loaded: ${rasterData[0]?.length || 0} elevation values in first band`);
    } else if (rasterData && typeof rasterData.length === 'number') {
      // Single TypedArray
      rasters = [rasterData];
      console.log(`DEM loaded: ${rasterData.length} elevation values`);
    } else {
      console.error('Unexpected raster data format:', rasterData);
      rasters = [];
    }
  } else {
    // Orthophoto - multiple bands, keep separate
    rasters = await image.readRasters({ interleave: false });
    console.log(`Orthophoto loaded: ${rasters.length} bands`);
  }

  const [originX, originY, pixelSizeX, pixelSizeY] = getGeoTransform(image);

  return {
    image,
    rasters,
    width: image.getWidth(),
    height: image.getHeight(),
    bbox: image.getBoundingBox(),
    geoTransform: { originX, originY, pixelSizeX, pixelSizeY },
    samplesPerPixel
  };
}

function getGeoTransform(image) {
  const tiepoint = image.getTiePoints()[0];
  const pixelScale = image.getFileDirectory().ModelPixelScale;

  const originX = tiepoint.x;
  const originY = tiepoint.y;
  const pixelSizeX = pixelScale[0];
  const pixelSizeY = -pixelScale[1];

  return [originX, originY, pixelSizeX, pixelSizeY];
}

export async function resampleTextureToDEM(demData, orthoData) {
  const { width, height, geoTransform: demTransform, bbox: demBbox } = demData;
  const { rasters: orthoRasters, geoTransform: orthoTransform, samplesPerPixel, bbox: orthoBbox } = orthoData;

  console.log('DEM extent:', demBbox);
  console.log('Orthophoto extent:', orthoBbox);
  
  // Zkontroluj překryv mezi DEM a orthophoto
  const overlapMinX = Math.max(demBbox[0], orthoBbox[0]);
  const overlapMinY = Math.max(demBbox[1], orthoBbox[1]);
  const overlapMaxX = Math.min(demBbox[2], orthoBbox[2]);
  const overlapMaxY = Math.min(demBbox[3], orthoBbox[3]);
  
  const hasOverlap = overlapMinX < overlapMaxX && overlapMinY < overlapMaxY;
  
  if (!hasOverlap) {
    console.warn('DEM a orthophoto se nepřekrývají geograficky!');
    console.warn('DEM:', demBbox);
    console.warn('Orthophoto:', orthoBbox);
  }
  
  const overlapArea = hasOverlap ? 
    (overlapMaxX - overlapMinX) * (overlapMaxY - overlapMinY) : 0;
  const demArea = (demBbox[2] - demBbox[0]) * (demBbox[3] - demBbox[1]);
  const coveragePercent = (overlapArea / demArea * 100).toFixed(1);
  
  console.log(`Orthophoto pokrývá ${coveragePercent}% DEM oblasti`);

  const textureData = new Uint8ClampedArray(width * height * 4);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const lon = demTransform.originX + col * demTransform.pixelSizeX;
      const lat = demTransform.originY + row * demTransform.pixelSizeY;

      let r, g, b;
      
      // Zkontroluj, zda je pixel v oblasti orthophoto
      if (hasOverlap && 
          lon >= orthoBbox[0] && lon <= orthoBbox[2] && 
          lat >= orthoBbox[1] && lat <= orthoBbox[3]) {
        // Pixel je v oblasti orthophoto - použij skutečnou barvu
        [r, g, b] = sampleOrthoRGB(orthoRasters, lon, lat, orthoTransform, orthoData.width, orthoData.height, samplesPerPixel);
      } else {
        // Pixel je mimo orthophoto - použij neutrální barvu nebo gradient
        // Můžeš použít výšku pro vytvoření výškového gradientu
        const elevation = getElevationAtCoordinate(demData, lon, lat);
        [r, g, b] = createElevationGradient(elevation);
      }

      const i = (row * width + col) * 4;
      textureData[i + 0] = r;
      textureData[i + 1] = g;
      textureData[i + 2] = b;
      textureData[i + 3] = 255;
    }
  }

  return new ImageData(textureData, width, height);
}

// Pomocná funkce pro získání výšky na konkrétní souřadnici
function getElevationAtCoordinate(demData, lon, lat) {
  const { rasters, width, height, geoTransform } = demData;
  const elevationData = rasters[0] || rasters;
  
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
  
  const col = Math.floor(x);
  const row = Math.floor(y);
  
  if (col < 0 || col >= width || row < 0 || row >= height) return 0;
  
  const i = row * width + col;
  return elevationData[i] || 0;
}

// Vytvoř barevný gradient na základě výšky
function createElevationGradient(elevation) {
  // Normalizuj výšku pro barevný gradient (upravit podle tvých dat)
  const normalizedHeight = Math.max(0, Math.min(1, (elevation + 100) / 1000));
  
  if (normalizedHeight < 0.3) {
    // Nízké oblasti - zelená/modrá
    return [50, 120, 80];
  } else if (normalizedHeight < 0.6) {
    // Střední oblasti - žlutá/hnědá
    return [150, 130, 80];
  } else {
    // Vysoké oblasti - bílá/šedá
    return [200, 200, 200];
  }
}

function sampleOrthoRGB(rasters, lon, lat, transform, width, height, samplesPerPixel) {
  const x = (lon - transform.originX) / transform.pixelSizeX;
  const y = (lat - transform.originY) / transform.pixelSizeY;

  const col = Math.floor(x);
  const row = Math.floor(y);

  if (col < 0 || col >= width || row < 0 || row >= height) return [0, 0, 0];
  
  const i = row * width + col;
  
  if (samplesPerPixel >= 3) {
    // RGB orthophoto
    return [
      rasters[0][i] || 0,
      rasters[1][i] || 0,
      rasters[2][i] || 0
    ];
  } else if (samplesPerPixel === 1) {
    // Grayscale - use same value for R, G, B
    const gray = rasters[0][i] || 0;
    return [gray, gray, gray];
  } else {
    return [0, 0, 0];
  }
}

// Lightweight function to analyze GeoTIFF metadata for resolution analysis
// This only reads metadata, not the actual raster data, making it very fast
export async function analyzeGeoTIFFMetadata(file) {
  const tiff = await fromBlob(file);
  const image = await tiff.getImage();
  
  // Get basic metadata without reading raster data
  const width = image.getWidth();
  const height = image.getHeight();
  const bbox = image.getBoundingBox();
  const samplesPerPixel = image.getSamplesPerPixel();
  const [originX, originY, pixelSizeX, pixelSizeY] = getGeoTransform(image);
  
  console.log(`GeoTIFF metadata: ${width}x${height}, ${samplesPerPixel} bands`);
  
  return {
    width,
    height,
    bbox,
    geoTransform: { originX, originY, pixelSizeX, pixelSizeY },
    samplesPerPixel
  };
}

// Ořízne DEM na oblast orthophoto pro lepší vizualizaci
export function cropDEMToOrthophoto(demData, orthoData) {
  const { rasters, width, height, geoTransform, bbox: demBbox } = demData;
  const { bbox: orthoBbox } = orthoData;
  const elevationData = rasters[0] || rasters;
  
  // Vypočítej překryv
  const cropMinX = Math.max(demBbox[0], orthoBbox[0]);
  const cropMinY = Math.max(demBbox[1], orthoBbox[1]);
  const cropMaxX = Math.min(demBbox[2], orthoBbox[2]);
  const cropMaxY = Math.min(demBbox[3], orthoBbox[3]);
  
  // Převeď geografické souřadnice na pixelové indexy v DEM
  const startCol = Math.max(0, Math.floor((cropMinX - demBbox[0]) / Math.abs(geoTransform.pixelSizeX)));
  const endCol = Math.min(width - 1, Math.ceil((cropMaxX - demBbox[0]) / Math.abs(geoTransform.pixelSizeX)));
  const startRow = Math.max(0, Math.floor((demBbox[3] - cropMaxY) / Math.abs(geoTransform.pixelSizeY)));
  const endRow = Math.min(height - 1, Math.ceil((demBbox[3] - cropMinY) / Math.abs(geoTransform.pixelSizeY)));
  
  const cropWidth = endCol - startCol + 1;
  const cropHeight = endRow - startRow + 1;
  
  console.log(`Ořezávám DEM z ${width}x${height} na ${cropWidth}x${cropHeight}`);
  console.log(`Pixelové indexy: cols ${startCol}-${endCol}, rows ${startRow}-${endRow}`);
  
  // Vytvoř ořezaná data
  const croppedElevationData = new Float32Array(cropWidth * cropHeight);
  
  for (let row = 0; row < cropHeight; row++) {
    for (let col = 0; col < cropWidth; col++) {
      const sourceRow = startRow + row;
      const sourceCol = startCol + col;
      const sourceIndex = sourceRow * width + sourceCol;
      const targetIndex = row * cropWidth + col;
      
      croppedElevationData[targetIndex] = elevationData[sourceIndex];
    }
  }
  
  // Aktualizuj geoTransform pro ořezanou oblast
  const newOriginX = demBbox[0] + startCol * Math.abs(geoTransform.pixelSizeX);
  const newOriginY = demBbox[3] - startRow * Math.abs(geoTransform.pixelSizeY);
  
  const croppedGeoTransform = {
    originX: newOriginX,
    originY: newOriginY,
    pixelSizeX: geoTransform.pixelSizeX,
    pixelSizeY: geoTransform.pixelSizeY
  };
  
  // Aktualizuj bbox
  const croppedBbox = [
    newOriginX,
    newOriginY + cropHeight * geoTransform.pixelSizeY,
    newOriginX + cropWidth * Math.abs(geoTransform.pixelSizeX),
    newOriginY
  ];
  
  return {
    ...demData,
    rasters: [croppedElevationData],
    width: cropWidth,
    height: cropHeight,
    geoTransform: croppedGeoTransform,
    bbox: croppedBbox
  };
}
