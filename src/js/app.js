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
  const graphicsSettingsSelect = document.getElementById('graphicsSettings');
  const renderBtn = document.getElementById('renderBtn');

  // Progress bar elements
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressPercentage = document.getElementById('progress-percentage');

  let selectedFiles = null;
  let availableZoomLevels = [];
  let isUpdatingGraphicsSettings = false; // Flag to prevent infinite loops

  // Initialize zoom level dropdown as disabled until OSM tiles are loaded
  zoomLevelSelect.disabled = true;
  zoomLevelSelect.innerHTML = '<option value="">Načtěte OSM dlaždice pro výběr zoom levelu...</option>';

  // Initialize hamburger menu functionality
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuContainer = document.getElementById('upload-container');
  const advancedDialog = document.getElementById('advanced-dialog');
  const speedControl = document.getElementById('speed-control');

  console.log('Hamburger button element:', hamburgerBtn);
  console.log('Menu container element:', menuContainer);

  // Hamburger menu toggle
  if (hamburgerBtn && menuContainer) {
    // Remove any existing event listeners to prevent duplicates
    hamburgerBtn.removeEventListener('click', handleHamburgerClick);
    
    function handleHamburgerClick(event) {
      console.log('Hamburger button clicked!');
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      // Log current state before toggle
      console.log('Before toggle - Menu classes:', menuContainer.className);
      console.log('Before toggle - Computed transform:', window.getComputedStyle(menuContainer).transform);
      
      const isCollapsed = menuContainer.classList.contains('collapsed');
      
      if (isCollapsed) {
        // Show menu
        menuContainer.classList.remove('collapsed');
        hamburgerBtn.classList.add('active');
        console.log('Showing menu');
      } else {
        // Hide menu
        menuContainer.classList.add('collapsed');
        hamburgerBtn.classList.remove('active');
        console.log('Hiding menu');
      }
      
      // Log state after toggle
      console.log('After toggle - Menu classes:', menuContainer.className);
      console.log('After toggle - Hamburger classes:', hamburgerBtn.className);
      
      // Force a reflow and check computed styles
      setTimeout(() => {
        console.log('After reflow - Computed transform:', window.getComputedStyle(menuContainer).transform);
        console.log('After reflow - Menu visibility:', window.getComputedStyle(menuContainer).visibility);
        console.log('After reflow - Menu display:', window.getComputedStyle(menuContainer).display);
      }, 100);
    }
    
    hamburgerBtn.addEventListener('click', handleHamburgerClick, { once: false, passive: false });
  } else {
    console.error('Hamburger button or menu container not found!');
  }

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

  // Set loading cursor when user clicks on OSM folder input
  tileFolderInput.addEventListener('click', () => {
    document.body.style.cursor = 'wait';
  });

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
        
        // Reset cursor after successful processing
        document.body.style.cursor = 'default';
      } else {
        selectedFiles = null;
        folderStatus.textContent = 'Žádná složka nevybrána';
        folderStatus.style.color = '';
        availableZoomLevels = [];
        updateZoomLevelOptions([]);
        
        // Reset cursor when no files are selected (user canceled)
        document.body.style.cursor = 'default';
      }
    } catch (error) {
      console.error('Chyba při výběru složky:', error);
      folderStatus.textContent = 'Chyba při výběru složky';
      folderStatus.style.color = 'red';
      
      // Reset cursor on error
      document.body.style.cursor = 'default';
    }
  });

  // Get description for zoom level
  function getZoomDescription(zoom) {
    if (zoom <= 10) return 'nízké rozlišení';
    if (zoom <= 12) return 'střední rozlišení';
    if (zoom <= 14) return 'vysoké rozlišení';
    return 'velmi vysoké rozlišení';
  }

  // Sync zoom level with graphics settings
  function syncZoomLevelWithGraphicsSettings(graphicsSettings, availableZooms) {
    // Get all available zoom levels
    const availableZoomLevels = availableZooms.map(zoom => parseInt(zoom));
    
    if (availableZoomLevels.length > 0) {
      let targetZoomIndex;
      
      // Map 5 graphics settings to available zoom levels more intelligently
      switch (graphicsSettings) {
        case 'veryVeryLow':
          // Use lowest available zoom (index 0)
          targetZoomIndex = 0;
          break;
        case 'veryLow':
          // Use 25% through the available range
          targetZoomIndex = Math.floor(availableZoomLevels.length * 0.25);
          break;
        case 'low':
          // Use 50% through the available range (middle)
          targetZoomIndex = Math.floor(availableZoomLevels.length * 0.5);
          break;
        case 'medium':
          // Use 75% through the available range
          targetZoomIndex = Math.floor(availableZoomLevels.length * 0.75);
          break;
        case 'high':
          // Use highest available zoom (last index)
          targetZoomIndex = availableZoomLevels.length - 1;
          break;
        default:
          targetZoomIndex = Math.floor(availableZoomLevels.length * 0.5);
      }
      
      const targetZoom = availableZoomLevels[targetZoomIndex];
      zoomLevelSelect.value = targetZoom.toString();
      console.log(`Graphics setting ${graphicsSettings}: Set zoom level to ${targetZoom} (index ${targetZoomIndex}/${availableZoomLevels.length - 1}, available: ${availableZoomLevels.join(', ')})`);
    }
  }

  // Update zoom level dropdown based on available levels
  function updateZoomLevelOptions(availableZooms) {
    // Clear existing options
    zoomLevelSelect.innerHTML = '';
    
    if (availableZooms.length > 0) {
      // Add available zoom levels
      availableZooms.forEach(zoom => {
        const option = document.createElement('option');
        option.value = zoom;
        option.textContent = `${zoom} (${getZoomDescription(zoom)})`;
        zoomLevelSelect.appendChild(option);
      });
      
      // Enable zoom level dropdown
      zoomLevelSelect.disabled = false;
      
      // Sync zoom level with current graphics settings directly
      const currentGraphicsSettings = graphicsSettingsSelect.value;
      if (currentGraphicsSettings) {
        syncZoomLevelWithGraphicsSettings(currentGraphicsSettings, availableZooms);
      }
      
      // Enable render button when valid zoom levels are available
      renderBtn.disabled = false;
      renderBtn.textContent = 'Zobrazit terén';
    } else {
      // No zoom levels detected - disable render button
      renderBtn.disabled = true;
      renderBtn.textContent = 'Nejprve vyberte platnou složku s OSM dlaždicemi';
      
      // Clear zoom level dropdown
    }
  }

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
    const terrainResolution = 15; // Fixed terrain resolution
    const graphicsSettings = graphicsSettingsSelect.value;

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

      // Adjust terrain generation parameters based on graphics settings
      let adjustedTerrainResolution;
      let adjustedZoomLevel;
      let detectedNativeResolution = 30; // Fallback value

      switch (graphicsSettings) {
        case 'veryVeryLow':
          adjustedTerrainResolution = detectedNativeResolution * 2;
          adjustedZoomLevel = Math.max(finalZoomLevel - 2, 0);
          break;
        case 'veryLow':
          adjustedTerrainResolution = detectedNativeResolution;
          adjustedZoomLevel = Math.max(finalZoomLevel - 1, 0);
          break;
        case 'low':
          adjustedTerrainResolution = detectedNativeResolution * 0.5;
          adjustedZoomLevel = finalZoomLevel;
          break;
        case 'medium':
          adjustedTerrainResolution = detectedNativeResolution * 0.25;
          adjustedZoomLevel = finalZoomLevel;
          break;
        case 'high':
          adjustedTerrainResolution = detectedNativeResolution * 0.1;
          adjustedZoomLevel = Math.min(finalZoomLevel + 1, 18);
          break;
        default:
          adjustedTerrainResolution = detectedNativeResolution;
          adjustedZoomLevel = finalZoomLevel;
      }
      
      console.log(`Rozlišení terénu: ${adjustedTerrainResolution}m (native: ${detectedNativeResolution}m, graphics: ${graphicsSettings})`);
      console.log('Generuji 3D terén...');
      
      // Get advanced settings
      const sceneResolutionSelect = document.getElementById('sceneResolution');
      const antialiasingSelect = document.getElementById('antialiasing');

      const sceneResolution = parseFloat(sceneResolutionSelect.value);
      const maxTerrainDimension = 512;
      const textureDownsample = 1;
      const antialiasing = antialiasingSelect.value === 'true';

      // Hide menu and show hamburger button after successful model load also hide advanced settings
      menuContainer.classList.add('collapsed');
      hamburgerBtn.style.display = 'flex';
      speedControl.style.display = 'block';
      toggleAdvancedDialog();

      generateTerrain(resampledDemData, textureImageData, heightScaleMultiplier, adjustedTerrainResolution, adjustedZoomLevel, sceneResolution, maxTerrainDimension, textureDownsample, antialiasing);
      
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

  // Advanced settings elements
  const sceneResolutionSelect = document.getElementById('sceneResolution');
  const maxTerrainDimensionSelect = 512;
  const textureDownsampleSelect = 1;
  const antialiasingSelect = document.getElementById('antialiasing');

  // Advanced settings toggle functionality
  window.toggleAdvancedDialog = function() {
    const advancedDialog = document.getElementById('advanced-dialog');
    
    if (advancedDialog.style.display === 'none' || advancedDialog.style.display === '') {
      advancedDialog.style.display = 'block';
    } else {
      advancedDialog.style.display = 'none';
    }
  };

  // Sync graphics settings with advanced settings
  graphicsSettingsSelect.addEventListener('change', function() {
    if (isUpdatingGraphicsSettings) return; // Prevent infinite loops
    
    const graphicsSettings = this.value;
    
    // Update advanced settings based on graphics settings
    switch (graphicsSettings) {
      case 'veryVeryLow':
        sceneResolutionSelect.value = '0.25';
        antialiasingSelect.value = 'false';
        break;
      case 'veryLow':
        sceneResolutionSelect.value = '0.5';
        antialiasingSelect.value = 'false';
        break;
      case 'low':
        sceneResolutionSelect.value = '0.75';
        antialiasingSelect.value = 'auto';
        break;
      case 'medium':
        sceneResolutionSelect.value = '1';
        antialiasingSelect.value = 'auto';
        break;
      case 'high':
        sceneResolutionSelect.value = '1';
        antialiasingSelect.value = 'true';
        break;
    }

    // Update zoom level display (if available)
    if (zoomLevelSelect.options.length > 0) {
      // Get all available zoom levels
      const availableZooms = Array.from(zoomLevelSelect.options)
        .map(option => option.value)
        .filter(value => value !== '' && !isNaN(parseInt(value)))
        .map(value => parseInt(value))
        .sort((a, b) => a - b);
      
      if (availableZooms.length > 0) {
        let targetZoomIndex;
        
        // Map 5 graphics settings to available zoom levels more intelligently
        switch (graphicsSettings) {
          case 'veryVeryLow':
            // Use lowest available zoom (index 0)
            targetZoomIndex = 0;
            break;
          case 'veryLow':
            // Use 25% through the available range
            targetZoomIndex = Math.floor(availableZooms.length * 0.25);
            break;
          case 'low':
            // Use 50% through the available range (middle)
            targetZoomIndex = Math.floor(availableZooms.length * 0.5);
            break;
          case 'medium':
            // Use 75% through the available range
            targetZoomIndex = Math.floor(availableZooms.length * 0.75);
            break;
          case 'high':
            // Use highest available zoom (last index)
            targetZoomIndex = availableZooms.length - 1;
            break;
          default:
            targetZoomIndex = Math.floor(availableZooms.length * 0.5);
        }
        
        const targetZoom = availableZooms[targetZoomIndex];
        zoomLevelSelect.value = targetZoom.toString();
        console.log(`Graphics setting ${graphicsSettings}: Set zoom level to ${targetZoom} (index ${targetZoomIndex}/${availableZooms.length - 1}, available: ${availableZooms.join(', ')})`);
      }
    }
    
    isUpdatingGraphicsSettings = true; // Set flag to prevent infinite loops
    setTimeout(() => {
      isUpdatingGraphicsSettings = false; // Reset flag after a short delay
    }, 100);
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
});
