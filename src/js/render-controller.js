/**
 * Render Controller - Handles the main render button logic and terrain generation workflow.
 * Orchestrates loading of DEM + OSM tiles, builds the terrain, and finally loads obstacles
 * (if provided) and renders them via TerrainRenderer#renderObstacles().
 *
 * @module render-controller
 */

import { loadGeoTIFF } from './geotiff-utils.js';
import { TerrainRenderer } from './terrain.js';
import { loadObstaclesFromZip } from './obstacles-loader.js';

import { 
  calculateTileRange, 
  loadTileMosaicFromFiles, 
  getTileAreaBounds, 
  getOptimalZoomLevel 
} from './osm-tile-utils.js';
import { resampleDEMToTexture } from './data-processing.js';

/**
 * @typedef {[number, number, number, number]} LonLatBounds
 * Tuple of [west, south, east, north] in degrees.
 */

/**
 * @typedef {Object} Obstacle
 * @property {number} lat         Latitude in degrees
 * @property {number} lon         Longitude in degrees
 * @property {number} heightMeters Height in meters (from PREVYSENI or fallback field)
 * @property {Object<string, any>} props  Original feature properties
 */

/**
 * Coordinates the whole "Render" pipeline with minimal state.
 */
export class RenderController {
  /**
   * @param {import('./event-handlers.js').EventHandlers} uiManager  (kept for parity with your pattern)
   * @param {import('./event-handlers.js').EventHandlers} eventHandlers
   */
  constructor(uiManager, eventHandlers) {
    /** @type {any} */
    this.uiManager = uiManager;
    /** @type {import('./event-handlers.js').EventHandlers} */
    this.eventHandlers = eventHandlers;

    /** @type {TerrainRenderer|null} Will be created when needed */
    this.terrainRenderer = null;

    /** @type {LonLatBounds|null} */
    this.tileBounds = null;

    /** @type {File|null} File selected by the user (if using setObstaclesZipFile path) */
    this.obstaclesZipFile = null;

    /** @type {Obstacle[]|null} Parsed obstacles cache (used by alternate flow) */
    this.obstaclesData = null;

    this.initializeRenderButton();
  }

  /** Attach the click handler to the Render button. */
  initializeRenderButton() {
    this.uiManager.elements.renderBtn.addEventListener('click', this.handleRenderClick.bind(this));
  }

  /**
   * Optional alternate flow: allow direct injection of the obstacles ZIP
   * (mirrors earlier variant). In the current flow you typically use
   * EventHandlers#getObstaclesZipFile() instead.
   * @param {File|null} file
   * @returns {void}
   */
  setObstaclesZipFile(file) {
    this.obstaclesZipFile = file;
    // Could parse immediately here in an alternate flow:
    // this._loadObstaclesNow();
  }

  /**
   * If terrain is ready and obstacle data are present, render them.
   * (Used by the alternate flow that parses obstacles early.)
   * @private
   * @returns {void}
   */
  _applyObstaclesIfReady() {
    if (
      this.terrainRenderer &&
      typeof this.terrainRenderer.renderObstacles === 'function' &&
      Array.isArray(this.obstaclesData) &&
      this.obstaclesData.length > 0
    ) {
      this.terrainRenderer.renderObstacles(this.obstaclesData);
    }
  }

  /**
   * Keep only obstacles inside the rendered tile bounds.
   * Handles antimeridian wrap and optional margin in degrees.
   *
   * @private
   * @param {Obstacle[]} obstacles
   * @param {LonLatBounds} bounds [west, south, east, north]
   * @param {number} [marginDeg=0] Extra degrees added on each side
   * @returns {Obstacle[]} Filtered obstacles
   */
  _filterObstaclesToTileBounds(obstacles, bounds, marginDeg = 0) {
    if (!Array.isArray(bounds) || bounds.length !== 4) return obstacles || [];
    let [west, south, east, north] = bounds;

    // expand bounds a bit if desired
    west  -= marginDeg;
    south -= marginDeg;
    east  += marginDeg;
    north += marginDeg;

    // clamp lat
    south = Math.max(-90, south);
    north = Math.min( 90, north);

    // normalize longitudes to [-180, 180]
    const norm = (lon) => {
      let x = lon;
      while (x < -180) x += 360;
      while (x >  180) x -= 360;
      return x;
    };

    west = norm(west);
    east = norm(east);

    const wraps = west > east; // true if bounds cross the 180° meridian

    return (obstacles || []).filter((o) => {
      if (o.lat < south || o.lat > north) return false;
      const lon = norm(o.lon);
      if (!wraps) {
        return lon >= west && lon <= east;
      }
      // wrap case: inside if lon >= west OR lon <= east
      return lon >= west || lon <= east;
    });
  }

  /** Handle the Render button click. */
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

  /**
   * Main terrain build pipeline:
   * 1) Load DEM (GeoTIFF)
   * 2) Load OSM tile mosaic
   * 3) Compute geographic bounds
   * 4) Resample DEM to texture area
   * 5) Generate terrain via TerrainRenderer
   * 6) Load + filter + render obstacles (if a ZIP was selected)
   *
   * @returns {Promise<void>}
   */
  async processTerrainGeneration() {
    const formValues = this.uiManager.getFormValues();
    const selectedFiles = this.eventHandlers.getSelectedFiles();
    const availableZoomLevels = this.eventHandlers.getAvailableZoomLevels();
    
    const terrainResolution = 15; // Fixed terrain resolution

    // Dispose of previous terrain renderer if it exists
    if (this.terrainRenderer) {
      this.terrainRenderer.dispose();
    }

    // Create new terrain renderer instance
    this.terrainRenderer = new TerrainRenderer();

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
    this.tileBounds = getTileAreaBounds(tileRange);
    console.log('Geografické hranice dlaždic:', this.tileBounds);

    this.uiManager.updateProgress(90, 'Převzorkování DEM dat...');
    // Resample DEM data to match tile texture dimensions
    console.log('Převzorkování DEM dat na rozměry textury...');
    const resampledDemData = resampleDEMToTexture(demData, textureImageData, this.tileBounds);

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

    // Generate the terrain using the class instance
    await this.terrainRenderer.generateTerrain(
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

    // After the terrain is ready, apply obstacles if a ZIP was selected in the UI
    const obstaclesFile = this.eventHandlers.getObstaclesZipFile?.();
    if (obstaclesFile) {
      this.uiManager.updateProgress(96, 'Načítám překážky (Shapefile)...');
      try {
        /** @type {Obstacle[]} */
        let obstacles = await loadObstaclesFromZip(obstaclesFile);
        console.log(`Překážky v souboru: ${obstacles.length}`);
        if (this.tileBounds) {
          obstacles = this._filterObstaclesToTileBounds(obstacles, this.tileBounds, 0);
        }
        console.log(`Překážky po ořezu: ${obstacles.length}`);
        this.terrainRenderer.renderObstacles(obstacles);
      } catch (e) {
        console.error('Chyba při načítání překážek:', e);
        alert('Nepodařilo se načíst překážky ze ZIPu. Zkontrolujte formát a zkuste znovu.');
      }
    }

    this.uiManager.updateProgress(100, 'Hotovo!');
    
    // Hide progress after a short delay
    setTimeout(() => {
      this.uiManager.hideProgress();
    }, 1000);
  }

  /**
   * Choose a final OSM zoom based on the user's choice and available tiles.
   * @param {'auto'|string|number} zoomLevel
   * @param {number} modelSize
   * @param {number[]} availableZoomLevels
   * @returns {number} final zoom level to use
   */
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

  /**
   * Adjust engine workload for the chosen graphics setting.
   * @param {'veryVeryLow'|'veryLow'|'low'|'medium'|'high'} graphicsSettings
   * @param {number} terrainResolution Base DEM resolution in meters (hint)
   * @param {number} finalZoomLevel
   * @returns {{ adjustedTerrainResolution:number, adjustedZoomLevel:number }}
   */
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

  /** @returns {TerrainRenderer|null} The current terrain renderer instance. */
  getTerrainRenderer() {
    return this.terrainRenderer;
  }

  /** Dispose GPU/CPU resources and clear references. */
  dispose() {
    if (this.terrainRenderer) {
      this.terrainRenderer.dispose();
      this.terrainRenderer = null;
    }
  }
}
