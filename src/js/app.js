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
  let detectedNativeResolution = null; // Store the detected native resolution from DEM analysis

  // Initialize zoom level dropdown as disabled until OSM tiles are loaded
  zoomLevelSelect.disabled = true;
  zoomLevelSelect.innerHTML = '<option value="">Načtěte OSM dlaždice pro výběr zoom levelu...</option>';

  // Initialize hamburger menu functionality
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuContainer = document.getElementById('upload-container');
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

  // Analyze DEM resolution and populate terrain resolution options
  function analyzeDEMAndSetResolutionOptions(demData) {
    const { width, height, geoTransform, bbox } = demData;
    
    // Calculate DEM pixel size in meters
    const METERS_PER_DEGREE = 111000;
    const pixelSizeXMeters = Math.abs(geoTransform.pixelSizeX) * METERS_PER_DEGREE;
    const pixelSizeYMeters = Math.abs(geoTransform.pixelSizeY) * METERS_PER_DEGREE;
    const nativeResolution = Math.max(pixelSizeXMeters, pixelSizeYMeters);
    
    console.log(`DEM rozlišení: ${nativeResolution.toFixed(1)}m per pixel`);
    
    // Calculate geographic area
    const [west, south, east, north] = bbox;
    const areaWidthMeters = Math.abs(east - west) * METERS_PER_DEGREE;
    const areaHeightMeters = Math.abs(north - south) * METERS_PER_DEGREE;
    
    console.log(`Oblast: ${areaWidthMeters.toFixed(0)}m x ${areaHeightMeters.toFixed(0)}m`);
    
    // Store native resolution
    detectedNativeResolution = Math.round(nativeResolution);
    
    // Create terrain resolution options based on graphics settings
    const resolutionOptions = [
      { value: Math.round(nativeResolution * 2), label: 'Ultra nízká (2x nativní)', setting: 'veryVeryLow' },
      { value: Math.round(nativeResolution), label: 'Velmi nízká (nativní)', setting: 'veryLow' },
      { value: Math.round(nativeResolution * 0.5), label: 'Nízká (0.5x nativní)', setting: 'low' },
      { value: Math.round(nativeResolution * 0.25), label: 'Střední (0.25x nativní)', setting: 'medium' },
      { value: Math.round(nativeResolution * 0.1), label: 'Vysoká (0.1x nativní)', setting: 'high' }
    ];
    
    // Populate the select element
    terrainResolutionSelect.innerHTML = '';
    terrainResolutionSelect.disabled = false;
    
    resolutionOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = `${option.value}m (${option.label})`;
      optionElement.dataset.setting = option.setting;
      terrainResolutionSelect.appendChild(optionElement);
    });
    
    console.log(`Terrain resolution options created for native ${detectedNativeResolution}m`);
    
    // Set initial selection based on current graphics setting
    updateTerrainResolutionForGraphicsSetting(graphicsSettingsSelect.value);
  }

  // Set loading cursor when user clicks on DEM file input
  demInput.addEventListener('click', () => {
    document.body.style.cursor = 'wait';
  });

  // Handle DEM file selection - analyze resolution immediately
  demInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
      // Reset terrain resolution if no file selected
      terrainResolutionSelect.innerHTML = '<option value="">Načtěte DEM pro analýzu rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      detectedNativeResolution = null; // Reset native resolution
      console.log('DEBUG: detectedNativeResolution reset to null');
      // Reset cursor when no file is selected (user canceled)
      document.body.style.cursor = 'default';
      return;
    }

    try {
      console.log('Analyzuji DEM soubor pro rozlišení...');
      terrainResolutionSelect.innerHTML = '<option value="">Analyzuji rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      
      // Use fast metadata analysis instead of loading full raster data
      const demMetadata = await analyzeGeoTIFFMetadata(file);
      analyzeDEMAndSetResolutionOptions(demMetadata);
      
      // Trigger graphics settings sync now that terrain resolution options are available
      const currentGraphicsSettings = graphicsSettingsSelect.value;
      if (currentGraphicsSettings && detectedNativeResolution) {
        console.log(`DEBUG: About to trigger graphics sync with native resolution: ${detectedNativeResolution}m`);
        // Manually trigger the graphics settings change event to sync terrain resolution
        graphicsSettingsSelect.dispatchEvent(new Event('change'));
      }
      
      // Reset cursor after successful analysis
      document.body.style.cursor = 'default';
      
    } catch (error) {
      console.error('Chyba při analýze DEM souboru:', error);
      terrainResolutionSelect.innerHTML = '<option value="">Chyba při analýze DEM</option>';
      terrainResolutionSelect.disabled = true;
      detectedNativeResolution = null; // Reset on error
      console.log('DEBUG: detectedNativeResolution reset to null due to error');
      alert('Chyba při analýze DEM souboru. Zkontrolujte, že je soubor platný GeoTIFF.');
      
      // Reset cursor on error
      document.body.style.cursor = 'default';
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

      // Adjust terrain generation parameters based on graphics settings
      let adjustedTerrainResolution;
      let adjustedZoomLevel;
      
      // Use the detected native resolution from DEM analysis
      if (!detectedNativeResolution) {
        console.error('Native resolution not detected. Using fallback.');
        detectedNativeResolution = 30; // Fallback value
      }
      
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
      const maxTerrainDimensionSelect = document.getElementById('maxTerrainDimension');
      const textureDownsampleSelect = document.getElementById('textureDownsample');
      const antialiasingSelect = document.getElementById('antialiasing');

      const sceneResolution = parseFloat(sceneResolutionSelect.value);
      const maxTerrainDimension = parseFloat(maxTerrainDimensionSelect.value);
      const textureDownsample = parseFloat(textureDownsampleSelect.value);
      const antialiasing = antialiasingSelect.value === 'true';

      // Hide menu and show hamburger button after successful model load
      menuContainer.classList.add('collapsed');
      hamburgerBtn.style.display = 'flex';
      speedControl.style.display = 'block';

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
  const maxTerrainDimensionSelect = document.getElementById('maxTerrainDimension');
  const textureDownsampleSelect = document.getElementById('textureDownsample');
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
        maxTerrainDimensionSelect.value = '128';
        textureDownsampleSelect.value = '4';
        antialiasingSelect.value = 'false';
        break;
      case 'veryLow':
        sceneResolutionSelect.value = '0.5';
        maxTerrainDimensionSelect.value = '256';
        textureDownsampleSelect.value = '3';
        antialiasingSelect.value = 'false';
        break;
      case 'low':
        sceneResolutionSelect.value = '0.75';
        maxTerrainDimensionSelect.value = '512';
        textureDownsampleSelect.value = '2';
        antialiasingSelect.value = 'auto';
        break;
      case 'medium':
        sceneResolutionSelect.value = '1';
        maxTerrainDimensionSelect.value = '1024';
        textureDownsampleSelect.value = '1';
        antialiasingSelect.value = 'auto';
        break;
      case 'high':
        sceneResolutionSelect.value = '1';
        maxTerrainDimensionSelect.value = '2048';
        textureDownsampleSelect.value = '1';
        antialiasingSelect.value = 'true';
        break;
    }
    
    // Update terrain resolution display (if available and native resolution detected)
    if (terrainResolutionSelect.options.length > 1 && detectedNativeResolution) {
      console.log(`DEBUG: Using detectedNativeResolution = ${detectedNativeResolution}m for graphics setting ${graphicsSettings}`);
      
      // Get all available terrain resolution options sorted by value
      const availableResolutions = Array.from(terrainResolutionSelect.options)
        .map(option => parseFloat(option.value))
        .filter(value => !isNaN(value))
        .sort((a, b) => a - b);
      
      console.log(`DEBUG: Available terrain resolutions: [${availableResolutions.join(', ')}]m`);
      
      let targetResolutionIndex;
      
      // Map 5 graphics settings to available terrain resolutions intelligently
      // Lower graphics = higher resolution values (less detailed)
      // Higher graphics = lower resolution values (more detailed)
      switch (graphicsSettings) {
        case 'veryVeryLow':
          // Use highest resolution value (least detailed) - last 20% of options
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.8);
          break;
        case 'veryLow':
          // Use 60% through the range
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.6);
          break;
        case 'low':
          // Use middle (50%)
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.5);
          break;
        case 'medium':
          // Use 30% through the range (more detailed)
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.3);
          break;
        case 'high':
          // Use lowest resolution value (most detailed) - first 10%
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.1);
          break;
        default:
          targetResolutionIndex = Math.floor(availableResolutions.length * 0.5);
      }
      
      // Ensure index is within bounds
      targetResolutionIndex = Math.max(0, Math.min(targetResolutionIndex, availableResolutions.length - 1));
      const targetResolution = availableResolutions[targetResolutionIndex];
      
      // Find the option with this resolution value
      let selectedOption = null;
      for (let option of terrainResolutionSelect.options) {
        if (parseFloat(option.value) === targetResolution) {
          selectedOption = option;
          break;
        }
      }
      
      if (selectedOption) {
        terrainResolutionSelect.value = selectedOption.value;
        console.log(`Graphics setting ${graphicsSettings}: Set terrain resolution to ${selectedOption.value}m (index ${targetResolutionIndex}/${availableResolutions.length - 1}, native: ${detectedNativeResolution}m)`);
      }
    } else {
      console.log(`DEBUG: Terrain resolution sync skipped - options: ${terrainResolutionSelect.options.length}, native: ${detectedNativeResolution}`);
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

  // Update terrain resolution based on graphics setting
  function updateTerrainResolutionForGraphicsSetting(graphicsSetting) {
    const resolutionOptions = Array.from(terrainResolutionSelect.options)
      .map(option => ({ value: parseFloat(option.value), label: option.textContent, setting: option.dataset.setting }));
    
    const matchingOption = resolutionOptions.find(option => option.setting === graphicsSetting);
    
    if (matchingOption) {
      terrainResolutionSelect.value = matchingOption.value;
      console.log(`Set terrain resolution to ${matchingOption.value}m for graphics setting ${graphicsSetting}`);
    }
  }

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
