import '../style.css'; // Import CSS for webpack processing
import { loadGeoTIFF, analyzeGeoTIFFMetadata } from './geotiff-utils.js';
import { generateTerrain } from './terrain.js';
import { 
  calculateTileRange, 
  loadTileMosaic,
  loadTileMosaicFromFiles, 
  getTileAreaBounds, 
  getOptimalZoomLevel,
  detectAvailableZoomLevelsFromFiles 
} from './osm-tile-utils.js';

window.addEventListener('DOMContentLoaded', () => {
  const demInput = document.getElementById('demFile');
  const tileFolderInput = document.getElementById('tileFolder');
  const folderStatus = document.getElementById('folderStatus');
  const latitudeInput = document.getElementById('latitude');
  const longitudeInput = document.getElementById('longitude');
  const modelSizeInput = document.getElementById('modelSize');
  const zoomLevelSelect = document.getElementById('zoomLevel');
  const heightScaleSelect = document.getElementById('heightScale');
  const terrainResolutionSelect = document.getElementById('terrainResolution');
  const renderBtn = document.getElementById('renderBtn');

  // Progress bar elements
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressPercentage = document.getElementById('progress-percentage');

  let selectedFiles = null;
  let availableZoomLevels = [];

  // Initialize hamburger menu functionality
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuContainer = document.getElementById('upload-container');
  const speedControl = document.getElementById('speed-control');

  // Hamburger menu toggle
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    menuContainer.classList.toggle('collapsed');
  });

  // Initialize speed slider immediately
  const speedSlider = document.getElementById('movementSpeed');
  const speedValue = document.getElementById('speedValue');
  
  if (speedSlider && speedValue) {
    // Update speed value display when slider changes
    speedSlider.addEventListener('input', (event) => {
      speedValue.textContent = parseFloat(event.target.value).toFixed(3);
    });
    
    // Set initial value
    speedValue.textContent = parseFloat(speedSlider.value).toFixed(3);
  }

  // Initialize rotation speed slider immediately
  const rotationSpeedSlider = document.getElementById('rotationSpeed');
  const rotationSpeedValue = document.getElementById('rotationSpeedValue');
  
  if (rotationSpeedSlider && rotationSpeedValue) {
    // Update rotation speed value display when slider changes
    rotationSpeedSlider.addEventListener('input', (event) => {
      rotationSpeedValue.textContent = parseFloat(event.target.value).toFixed(3);
    });
    
    // Set initial value
    rotationSpeedValue.textContent = parseFloat(rotationSpeedSlider.value).toFixed(3);
  }

  // Progress management functions
  function showProgress() {
    progressContainer.style.display = 'block';
    updateProgress(0, 'Inicializace...');
  }

  function hideProgress() {
    progressContainer.style.display = 'none';
  }

  function updateProgress(percentage, message) {
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = message;
    progressPercentage.textContent = `${Math.round(percentage)}%`;
  }

  // Handle folder selection
  tileFolderInput.addEventListener('change', async (event) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        selectedFiles = files;
        
        // Get folder name from the first file's path
        const firstFile = files[0];
        const folderName = firstFile.webkitRelativePath.split('/')[0];
        
        folderStatus.textContent = `Vybrána: ${folderName}`;
        folderStatus.style.color = 'green';
        
        // Detect available zoom levels
        console.log('Detekuji dostupné zoom levely...');
        availableZoomLevels = await detectAvailableZoomLevelsFromFiles(selectedFiles);
        console.log(`Nalezené zoom levely: [${availableZoomLevels.join(', ')}]`);
        
        // Update zoom level dropdown
        updateZoomLevelOptions(availableZoomLevels);
      } else {
        selectedFiles = null;
        folderStatus.textContent = 'Žádná složka nevybrána';
        folderStatus.style.color = '';
        availableZoomLevels = [];
        updateZoomLevelOptions([]);
      }
    } catch (error) {
      console.error('Chyba při výběru složky:', error);
      folderStatus.textContent = 'Chyba při výběru složky';
      folderStatus.style.color = 'red';
    }
  });

  // Update zoom level dropdown based on available levels
  function updateZoomLevelOptions(availableZooms) {
    // Clear existing options except "auto"
    const autoOption = zoomLevelSelect.querySelector('option[value="auto"]');
    zoomLevelSelect.innerHTML = '';
    zoomLevelSelect.appendChild(autoOption);
    
    if (availableZooms.length > 0) {
      // Add available zoom levels
      availableZooms.forEach(zoom => {
        const option = document.createElement('option');
        option.value = zoom;
        option.textContent = `${zoom} (${getZoomDescription(zoom)})`;
        zoomLevelSelect.appendChild(option);
      });
      
      // Enable render button when valid zoom levels are available
      renderBtn.disabled = false;
      renderBtn.textContent = 'Zobrazit terén';
    } else {
      // No zoom levels detected - disable render button
      renderBtn.disabled = true;
      renderBtn.textContent = 'Nejprve vyberte platnou složku s OSM dlaždicemi';
      
      // Clear zoom level dropdown (keep only auto option)
      // Don't add default levels if no OSM tiles are detected
    }
  }

  // Get description for zoom level
  function getZoomDescription(zoom) {
    if (zoom <= 10) return 'nízké rozlišení';
    if (zoom <= 12) return 'střední rozlišení';
    if (zoom <= 14) return 'vysoké rozlišení';
    return 'velmi vysoké rozlišení';
  }

  // Analyze DEM resolution and populate terrain resolution options
  function analyzeDEMAndSetResolutionOptions(demData) {
    const { width, height, geoTransform, bbox } = demData;
    
    // Calculate DEM pixel size in meters
    const METERS_PER_DEGREE = 111000;
    const pixelSizeXMeters = Math.abs(geoTransform.pixelSizeX) * METERS_PER_DEGREE;
    const pixelSizeYMeters = Math.abs(geoTransform.pixelSizeY) * METERS_PER_DEGREE;
    const demResolution = Math.max(pixelSizeXMeters, pixelSizeYMeters);
    
    console.log(`DEM rozlišení: ${demResolution.toFixed(1)}m per pixel`);
    
    // Calculate geographic area
    const [west, south, east, north] = bbox;
    const areaWidthMeters = Math.abs(east - west) * METERS_PER_DEGREE;
    const areaHeightMeters = Math.abs(north - south) * METERS_PER_DEGREE;
    
    console.log(`Oblast: ${areaWidthMeters.toFixed(0)}m x ${areaHeightMeters.toFixed(0)}m`);
    
    // Generate resolution options based on DEM quality
    const resolutionOptions = [];
    
    // Start with DEM native resolution, then add multiples and fractions
    const baseResolution = Math.round(demResolution);
    
    // Add finer resolutions (if DEM supports it)
    if (baseResolution > 20) {
      resolutionOptions.push(Math.round(baseResolution / 4));
      resolutionOptions.push(Math.round(baseResolution / 2));
    } else if (baseResolution > 10) {
      resolutionOptions.push(Math.round(baseResolution / 2));
    }
    
    // Add native resolution
    resolutionOptions.push(baseResolution);
    
    // Add coarser resolutions
    resolutionOptions.push(baseResolution * 2);
    resolutionOptions.push(baseResolution * 4);
    
    // Add some standard options
    const standardOptions = [10, 20, 30, 50, 100];
    standardOptions.forEach(option => {
      if (!resolutionOptions.includes(option)) {
        resolutionOptions.push(option);
      }
    });
    
    // Sort and remove duplicates
    const uniqueOptions = [...new Set(resolutionOptions)].sort((a, b) => a - b);
    
    // Populate the select element
    const terrainResolutionSelect = document.getElementById('terrainResolution');
    terrainResolutionSelect.innerHTML = '';
    terrainResolutionSelect.disabled = false;
    
    uniqueOptions.forEach(resolution => {
      const option = document.createElement('option');
      option.value = resolution;
      
      let description = '';
      if (resolution <= baseResolution / 2) {
        description = 'velmi vysoké rozlišení';
      } else if (resolution <= baseResolution) {
        description = 'vysoké rozlišení (nativní DEM)';
      } else if (resolution <= baseResolution * 2) {
        description = 'střední rozlišení';
      } else {
        description = 'nízké rozlišení';
      }
      
      option.textContent = `${resolution}m (${description})`;
      
      // Set as selected if it matches or is close to DEM resolution
      if (resolution === baseResolution) {
        option.selected = true;
      }
      
      terrainResolutionSelect.appendChild(option);
    });
    
    console.log(`Nastaveny možnosti rozlišení terénu: [${uniqueOptions.join(', ')}]m`);
    console.log(`Výchozí rozlišení: ${baseResolution}m (nativní DEM)`);
  }

  // Handle DEM file selection - analyze resolution immediately
  demInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
      // Reset terrain resolution if no file selected
      terrainResolutionSelect.innerHTML = '<option value="">Načtěte DEM pro analýzu rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      return;
    }

    try {
      console.log('Analyzuji DEM soubor pro rozlišení...');
      terrainResolutionSelect.innerHTML = '<option value="">Analyzuji rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      
      // Use fast metadata analysis instead of loading full raster data
      const demMetadata = await analyzeGeoTIFFMetadata(file);
      analyzeDEMAndSetResolutionOptions(demMetadata);
      
    } catch (error) {
      console.error('Chyba při analýze DEM souboru:', error);
      terrainResolutionSelect.innerHTML = '<option value="">Chyba při analýze DEM</option>';
      terrainResolutionSelect.disabled = true;
      alert('Chyba při analýze DEM souboru. Zkontrolujte, že je soubor platný GeoTIFF.');
    }
  });

  renderBtn.addEventListener('click', async () => {
    // Set loading cursor and show progress
    document.body.style.cursor = 'wait';
    renderBtn.disabled = true;
    renderBtn.textContent = 'Načítám...';
    showProgress();

    const demFile = demInput.files[0];
    const latitude = parseFloat(latitudeInput.value);
    const longitude = parseFloat(longitudeInput.value);
    const modelSize = parseFloat(modelSizeInput.value);
    const zoomLevel = zoomLevelSelect.value;
    const heightScaleMultiplier = parseFloat(heightScaleSelect.value);
    const terrainResolution = parseFloat(terrainResolutionSelect.value);

    // Validation
    if (!demFile) {
      alert('Nahrajte DEM GeoTIFF soubor');
      return;
    }

    if (!selectedFiles) {
      alert('Vyberte složku s OSM dlaždicemi');
      return;
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Zadejte platné souřadnice (zeměpisná šířka a délka)');
      return;
    }

    if (isNaN(modelSize) || modelSize <= 0) {
      alert('Zadejte platnou velikost modelu v kilometrech');
      return;
    }

    try {
      updateProgress(10, 'Načítám DEM soubor...');
      console.log('Načítám DEM...');
      const demData = await loadGeoTIFF(demFile);
      
      updateProgress(20, 'Zpracovávám DEM data...');
      
      // Analyze DEM resolution and populate terrain resolution options
      analyzeDEMAndSetResolutionOptions(demData);
      
      // Determine zoom level
      let finalZoomLevel;
      if (zoomLevel === 'auto') {
        finalZoomLevel = getOptimalZoomLevel(modelSize, availableZoomLevels, 100);
        console.log(`Automaticky vybraný zoom level: ${finalZoomLevel} (z dostupných: [${availableZoomLevels.join(', ')}])`);
      } else {
        finalZoomLevel = parseInt(zoomLevel);
        
        // Check if selected zoom level is available
        if (availableZoomLevels.length > 0 && !availableZoomLevels.includes(finalZoomLevel)) {
          const proceed = confirm(
            `Vybraný zoom level ${finalZoomLevel} není dostupný ve složce.\n` +
            `Dostupné zoom levely: [${availableZoomLevels.join(', ')}]\n\n` +
            'Chcete pokračovat s nejbližším dostupným zoom levelem?'
          );
          if (!proceed) return;
          
          // Find closest available zoom level
          finalZoomLevel = availableZoomLevels.reduce((prev, curr) => 
            Math.abs(curr - finalZoomLevel) < Math.abs(prev - finalZoomLevel) ? curr : prev
          );
          console.log(`Použit nejbližší dostupný zoom level: ${finalZoomLevel}`);
        }
      }

      updateProgress(30, 'Výpočet rozsahu dlaždic...');
      // Calculate tile range
      console.log(`Výpočet rozsahu dlaždic pro oblast ${modelSize}km kolem [${latitude}, ${longitude}]`);
      const tileRange = calculateTileRange(latitude, longitude, modelSize, finalZoomLevel);
      console.log('Rozsah dlaždic:', tileRange);

      // Calculate number of tiles
      const tilesWide = tileRange.maxX - tileRange.minX + 1;
      const tilesHigh = tileRange.maxY - tileRange.minY + 1;
      const totalTiles = tilesWide * tilesHigh;
      
      console.log(`Načítám ${totalTiles} dlaždic (${tilesWide}x${tilesHigh})`);

      // Load tile mosaic with progress tracking
      console.log('Načítám OSM dlaždice...');
      const textureImageData = await loadTileMosaicFromFiles(selectedFiles, tileRange, 256, (loaded, total, message) => {
        const tileProgress = 30 + (loaded / total) * 50; // 30% to 80% for tile loading
        updateProgress(tileProgress, message);
      });
      
      updateProgress(85, 'Získávám geografické hranice...');
      // Get geographic bounds of the tile area
      const tileBounds = getTileAreaBounds(tileRange);
      console.log('Geografické hranice dlaždic:', tileBounds);

      updateProgress(90, 'Převzorkování DEM dat...');
      // Resample DEM data to match tile texture dimensions
      console.log('Převzorkování DEM dat na rozměry textury...');
      const resampledDemData = resampleDEMToTexture(demData, textureImageData, tileBounds);

      updateProgress(95, 'Generování 3D terénu...');
      console.log(`Výšková exagerace: ${heightScaleMultiplier}x`);
      console.log(`Rozlišení terénu: ${terrainResolution}m`);
      console.log('Generuji 3D terén...');

      // Hide menu and show hamburger button after successful model load
      menuContainer.classList.add('collapsed');
      hamburgerBtn.style.display = 'flex';
      speedControl.style.display = 'block';

      generateTerrain(resampledDemData, textureImageData, heightScaleMultiplier, terrainResolution);
      
      updateProgress(100, 'Hotovo!');
      
      // Hide progress after a short delay
      setTimeout(() => {
        hideProgress();
      }, 1000);
      
    } catch (error) {
      console.error('Chyba při načítání nebo zpracování dat:', error);
      alert('Chyba při načítání nebo zpracování dat. Podívejte se do konzole pro více informací.');
    } finally {
      // Restore cursor and button state
      document.body.style.cursor = 'default';
      renderBtn.disabled = false;
      renderBtn.textContent = 'Zobrazit terén';
    }
  });
});

/**
 * Resample DEM data to match texture dimensions and geographic bounds
 * @param {Object} demData - Original DEM data
 * @param {ImageData} textureImageData - Tile texture data
 * @param {Array} tileBounds - Geographic bounds [west, south, east, north]
 * @returns {Object} Resampled DEM data structure
 */
function resampleDEMToTexture(demData, textureImageData, tileBounds) {
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
function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  // Check if coordinate is within DEM bounds
  if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
    return 0; // Outside DEM bounds
  }
  
  // Convert geographic coordinates to pixel coordinates
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
  
  const col = Math.floor(x);
  const row = Math.floor(y);
  
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
