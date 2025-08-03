/**
 * Render Controller - Handles the main render button logic and terrain generation workflow
 */

import { loadGeoTIFF } from './geotiff-utils.js';
import { generateTerrain } from './terrain.js';
import { 
  calculateTileRange, 
  loadTileMosaicFromFiles, 
  getTileAreaBounds, 
  getOptimalZoomLevel 
} from './osm-tile-utils.js';
import { resampleDEMToTexture } from './data-processing.js';

export class RenderController {
  constructor(uiManager, eventHandlers) {
    this.uiManager = uiManager;
    this.eventHandlers = eventHandlers;
    this.initializeRenderButton();
  }

  initializeRenderButton() {
    this.uiManager.elements.renderBtn.addEventListener('click', this.handleRenderClick.bind(this));
  }

  async handleRenderClick() {
    // Set loading state
    this.uiManager.setLoadingState(true);
    this.uiManager.showProgress();

    // Validate form
    if (!this.uiManager.validateForm()) {
      this.uiManager.setLoadingState(false);
      return;
    }

    // Check if OSM tiles are selected
    const selectedFiles = this.eventHandlers.getSelectedFiles();
    if (!selectedFiles) {
      alert('Vyberte složku s OSM dlaždicemi');
      this.uiManager.setLoadingState(false);
      return;
    }

    try {
      await this.processTerrainGeneration();
    } catch (error) {
      console.error('Chyba při načítání nebo zpracování dat:', error);
      alert('Chyba při načítání nebo zpracování dat. Podívejte se do konzole pro více informací.');
    } finally {
      this.uiManager.setLoadingState(false);
    }
  }

  async processTerrainGeneration() {
    const formValues = this.uiManager.getFormValues();
    const selectedFiles = this.eventHandlers.getSelectedFiles();
    const availableZoomLevels = this.eventHandlers.getAvailableZoomLevels();
    
    const terrainResolution = 15; // Fixed terrain resolution

    // Load DEM data
    this.uiManager.updateProgress(10, 'Načítám DEM soubor...');
    console.log('Načítám DEM...');
    const demData = await loadGeoTIFF(formValues.demFile);
    
    this.uiManager.updateProgress(20, 'Zpracovávám DEM data...');
    
    // Determine zoom level
    const finalZoomLevel = this.determineFinalZoomLevel(
      formValues.zoomLevel, 
      formValues.modelSize, 
      availableZoomLevels
    );

    // Calculate tile range
    this.uiManager.updateProgress(30, 'Výpočet rozsahu dlaždic...');
    console.log(`Výpočet rozsahu dlaždic pro oblast ${formValues.modelSize}km kolem [${formValues.latitude}, ${formValues.longitude}]`);
    const tileRange = calculateTileRange(formValues.latitude, formValues.longitude, formValues.modelSize, finalZoomLevel);
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
      this.uiManager.updateProgress(tileProgress, message);
    });
    
    this.uiManager.updateProgress(85, 'Získávám geografické hranice...');
    // Get geographic bounds of the tile area
    const tileBounds = getTileAreaBounds(tileRange);
    console.log('Geografické hranice dlaždic:', tileBounds);

    this.uiManager.updateProgress(90, 'Převzorkování DEM dat...');
    // Resample DEM data to match tile texture dimensions
    console.log('Převzorkování DEM dat na rozměry textury...');
    const resampledDemData = resampleDEMToTexture(demData, textureImageData, tileBounds);

    this.uiManager.updateProgress(95, 'Generování 3D terénu...');
    console.log(`Výšková exagerace: ${formValues.heightScaleMultiplier}x`);
    console.log(`Rozlišení terénu: ${terrainResolution}m`);
    console.log('Generuji 3D terén...');

    // Adjust terrain generation parameters based on graphics settings
    const { adjustedTerrainResolution, adjustedZoomLevel } = this.adjustTerrainParameters(
      formValues.graphicsSettings, 
      terrainResolution, 
      finalZoomLevel
    );
    
    console.log(`Rozlišení terénu: ${adjustedTerrainResolution}m (graphics: ${formValues.graphicsSettings})`);
    console.log('Generuji 3D terén...');
    
    // Terrain generation parameters
    const maxTerrainDimension = 512;
    const textureDownsample = 1;

    // Hide menu and show controls after successful model load
    this.uiManager.hideMenuAndShowControls();

    // Generate the terrain
    generateTerrain(
      resampledDemData, 
      textureImageData, 
      formValues.heightScaleMultiplier, 
      adjustedTerrainResolution, 
      adjustedZoomLevel, 
      formValues.sceneResolution, 
      maxTerrainDimension, 
      textureDownsample, 
      formValues.antialiasing
    );
    
    this.uiManager.updateProgress(100, 'Hotovo!');
    
    // Hide progress after a short delay
    setTimeout(() => {
      this.uiManager.hideProgress();
    }, 1000);
  }

  determineFinalZoomLevel(zoomLevel, modelSize, availableZoomLevels) {
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
        if (!proceed) {
          throw new Error('User cancelled due to unavailable zoom level');
        }
        
        // Find closest available zoom level
        finalZoomLevel = availableZoomLevels.reduce((prev, curr) => 
          Math.abs(curr - finalZoomLevel) < Math.abs(prev - finalZoomLevel) ? curr : prev
        );
        console.log(`Použit nejbližší dostupný zoom level: ${finalZoomLevel}`);
      }
    }
    
    return finalZoomLevel;
  }

  adjustTerrainParameters(graphicsSettings, terrainResolution, finalZoomLevel) {
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

    return { adjustedTerrainResolution, adjustedZoomLevel };
  }
}
