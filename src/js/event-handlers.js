/**
 * Event Handlers - Manages file inputs, graphics settings, and zoom level synchronization.
 * Stores user selections (OSM folder, obstacles ZIP) and exposes getters
 * that the RenderController reads during the render workflow.
 *
 * @module event-handlers
 */

import { detectAvailableZoomLevelsFromFiles } from './osm-tile-utils.js';

/**
 * @typedef {Object} UIElements
 * @property {HTMLInputElement} tileFolderInput
 * @property {HTMLElement} folderStatus
 * @property {HTMLSelectElement} graphicsSettingsSelect
 * @property {HTMLSelectElement} zoomLevelSelect
 * @property {HTMLSelectElement} sceneResolutionSelect
 * @property {HTMLSelectElement} antialiasingSelect
 * @property {HTMLElement} [obstaclesStatus]
 */

/**
 * @typedef {Object} UIManager
 * @property {UIElements} elements
 * @property {() => boolean} validateForm
 * @property {() => void} setLoadingState
 * @property {() => void} showProgress
 * @property {(progress:number, message?:string) => void} updateProgress
 * @property {() => void} hideMenuAndShowControls
 * @property {() => void} hideProgress
 * @property {() => {
 *   demFile: File,
 *   zoomLevel: string|number,
 *   modelSize: number,
 *   latitude: number,
 *   longitude: number,
 *   heightScaleMultiplier: number,
 *   graphicsSettings: 'veryVeryLow'|'veryLow'|'low'|'medium'|'high',
 *   sceneResolution: number|string,
 *   antialiasing: 'true'|'false'|'auto'
 * }} getFormValues
 */

/**
 * Manages DOM event wiring and keeps user selections in memory.
 */
export class EventHandlers {
  /**
   * @param {UIManager} uiManager
   */
  constructor(uiManager) {
    /** @type {UIManager} */
    this.uiManager = uiManager;

    /** @type {FileList|null} */
    this.selectedFiles = null;

    /** @type {number[]} */
    this.availableZoomLevels = [];

    /** @type {boolean} */
    this.isUpdatingGraphicsSettings = false;

    /** @type {'root'|'single'} */
    this.tilesMode = 'root'; // 'root' or 'single'

    // keep obstacles ZIP like we keep OSM folder/DEM in UI manager
    /** @type {File|null} */
    this.obstaclesZipFile = null;

    this.initializeEventHandlers();
  }

  /** Wire up all initial event handlers. */
  initializeEventHandlers() {
    this.setupFileInputHandlers();
    this.setupGraphicsSettingsSync();
  }

  /** Set up OSM folder and obstacles ZIP input handlers. */
  setupFileInputHandlers() {
    const { tileFolderInput, folderStatus } = /** @type {UIElements} */ (this.uiManager.elements);

    // Show wait cursor while the picker is open
    tileFolderInput.addEventListener('click', () => {
      document.body.style.cursor = 'wait';
    });

    tileFolderInput.addEventListener('change', async (event) => {
      try {
        /** @type {FileList|null} */
        const files = /** @type {HTMLInputElement} */(event.target).files;
        if (files && files.length > 0) {
          this.selectedFiles = files;

          // Extract top-level folder name
          const firstFile = files[0];
          const pathParts = (firstFile.webkitRelativePath || '').split('/');
          const folderName = pathParts[0] || '(unknown)';

          folderStatus.textContent = `Vybrána složka: ${folderName} (${files.length} souborů)`;
          folderStatus.style.color = 'green';

          console.log('Detekuji dostupné zoom levely...');
          let zooms = await detectAvailableZoomLevelsFromFiles(files);
          console.log('Dostupné zoom levely:', zooms);

          // If no zoom levels are found, maybe user picked a single zoom folder
          if (!zooms || zooms.length === 0) {
            if (/^\d+$/.test(folderName)) {
              const singleZoom = parseInt(folderName, 10);
              zooms = [singleZoom];
              this.tilesMode = 'single';
              // legacy globals kept if other parts rely on them
              window.__tilesMode = 'single';
              window.__singleZoom = singleZoom;
              console.log('Jednoúrovňová složka detekována, zoom:', singleZoom);
            } else {
              this.tilesMode = 'root';
              window.__tilesMode = 'root';
              window.__singleZoom = undefined;
            }
          } else {
            this.tilesMode = 'root';
            window.__tilesMode = 'root';
            window.__singleZoom = undefined;
          }

          this.availableZoomLevels = zooms;
          this.updateZoomLevelOptions(zooms);

          document.body.style.cursor = 'default';
        } else {
          folderStatus.textContent = 'Žádná složka nevybrána';
          folderStatus.style.color = '';
          this.availableZoomLevels = [];
          this.updateZoomLevelOptions([]);
          this.tilesMode = 'root';
          window.__tilesMode = 'root';
          window.__singleZoom = undefined;
          document.body.style.cursor = 'default';
        }
      } catch (err) {
        console.error('Chyba při výběru složky:', err);
        folderStatus.textContent = 'Chyba při výběru složky';
        folderStatus.style.color = 'red';
        document.body.style.cursor = 'default';
      }
    });

    // Obstacles ZIP input (no controller reference; we just store the File)
    const obstaclesZipInput = document.getElementById('obstaclesZipInput');
    if (obstaclesZipInput) {
      obstaclesZipInput.addEventListener('change', (e) => {
        const file = /** @type {HTMLInputElement} */(e.target).files && /** @type {HTMLInputElement} */(e.target).files[0];
        if (file) {
          this.obstaclesZipFile = file;
          console.log(`Vybrán soubor překážek: ${file.name}`);
          const status = this.uiManager?.elements?.obstaclesStatus;
          if (status) {
            status.textContent = `Překážky: ${file.name}`;
            status.style.color = 'green';
          }
        } else {
          this.obstaclesZipFile = null;
          const status = this.uiManager?.elements?.obstaclesStatus;
          if (status) {
            status.textContent = 'Překážky: nevybráno';
            status.style.color = '';
          }
        }
      });
    }
  }

  /** Synchronize graphics preset with other UI settings and suggested zoom. */
  setupGraphicsSettingsSync() {
    const { graphicsSettingsSelect, zoomLevelSelect } = /** @type {UIElements} */ (this.uiManager.elements);

    graphicsSettingsSelect.addEventListener('change', () => {
      if (this.isUpdatingGraphicsSettings) return;

      const graphicsSettings = /** @type {UIElements} */ (this.uiManager.elements).graphicsSettingsSelect.value;
      const { sceneResolutionSelect, antialiasingSelect } = /** @type {UIElements} */ (this.uiManager.elements);

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
          antialiasingSelect.value = 'false';
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

      // Adjust zoom suggestion
      if (zoomLevelSelect && zoomLevelSelect.options.length > 0) {
        const availableZooms = Array.from(zoomLevelSelect.options)
          .map(o => o.value)
          .filter(v => v !== '' && v !== 'auto' && !isNaN(parseInt(v, 10)))
          .map(v => parseInt(v, 10))
          .sort((a, b) => a - b);

        if (availableZooms.length > 0) {
          let idx;
          switch (graphicsSettings) {
            case 'veryVeryLow': idx = 0; break;
            case 'veryLow':     idx = Math.floor(availableZooms.length * 0.25); break;
            case 'low':         idx = Math.floor(availableZooms.length * 0.5);  break;
            case 'medium':      idx = Math.floor(availableZooms.length * 0.75); break;
            case 'high':        idx = availableZooms.length - 1; break;
            default:            idx = Math.floor(availableZooms.length * 0.5);
          }
          idx = Math.max(0, Math.min(idx, availableZooms.length - 1));
          zoomLevelSelect.value = String(availableZooms[idx]);
          console.log(`Graphics setting ${graphicsSettings}: Set zoom level to ${availableZooms[idx]}`);
        }
      }

      this.isUpdatingGraphicsSettings = true;
      setTimeout(() => (this.isUpdatingGraphicsSettings = false), 100);
    });
  }

  /**
   * Human-readable description for zoom levels (approximate GSD).
   * @param {number} zoom
   * @returns {string}
   */
  getZoomDescription(zoom) {
    const desc = {
      10: 'Velmi nízké rozlišení (cca 150m/pixel)',
      12: 'Nízké rozlišení (cca 38m/pixel)',
      14: 'Střední rozlišení (cca 9.5m/pixel)',
      16: 'Vysoké rozlišení (cca 2.4m/pixel)',
      18: 'Velmi vysoké rozlišení (cca 0.6m/pixel)',
    };
    return desc[zoom] || `Zoom level ${zoom}`;
  }

  /**
   * Replace the zoom level <select> options based on available tile zooms.
   * @param {number[]} availableZooms
   */
  updateZoomLevelOptions(availableZooms) {
    const { zoomLevelSelect, graphicsSettingsSelect } = /** @type {UIElements} */ (this.uiManager.elements);

    if (!availableZooms || availableZooms.length === 0) {
      zoomLevelSelect.disabled = true;
      zoomLevelSelect.innerHTML = '<option value="">Žádné zoom levely nenalezeny</option>';
      return;
    }

    const sortedZooms = [...availableZooms].sort((a, b) => a - b);
    zoomLevelSelect.innerHTML = '';

    if (sortedZooms.length > 1) {
      const auto = document.createElement('option');
      auto.value = 'auto';
      auto.textContent = 'Automaticky (doporučeno)';
      zoomLevelSelect.appendChild(auto);
    }

    for (const z of sortedZooms) {
      const opt = document.createElement('option');
      opt.value = String(z);
      opt.textContent = `${z} - ${this.getZoomDescription(z)}`;
      zoomLevelSelect.appendChild(opt);
    }

    zoomLevelSelect.disabled = false;

    if (sortedZooms.length > 1) {
      zoomLevelSelect.value = 'auto';
      const current = graphicsSettingsSelect.value;
      if (current) this.syncZoomLevelWithGraphicsSettings(current, sortedZooms);
    } else {
      // Single zoom → select directly
      zoomLevelSelect.value = String(sortedZooms[0]);
    }

    console.log(`Updated zoom level options: [${sortedZooms.join(', ')}]`);
  }

  /**
   * Suggest an appropriate zoom based on the graphics preset.
   * @param {'veryVeryLow'|'veryLow'|'low'|'medium'|'high'} graphicsSettings
   * @param {number[]} availableZooms
   * @returns {void}
   */
  syncZoomLevelWithGraphicsSettings(graphicsSettings, availableZooms) {
    if (!availableZooms || availableZooms.length === 0) return;
    let idx;
    switch (graphicsSettings) {
      case 'veryVeryLow': idx = 0; break;
      case 'veryLow':     idx = Math.floor(availableZooms.length * 0.25); break;
      case 'low':         idx = Math.floor(availableZooms.length * 0.5);  break;
      case 'medium':      idx = Math.floor(availableZooms.length * 0.75); break;
      case 'high':        idx = availableZooms.length - 1; break;
      default:            idx = Math.floor(availableZooms.length * 0.5);
    }
    idx = Math.max(0, Math.min(idx, availableZooms.length - 1));
    const targetZoom = availableZooms[idx];
    this.uiManager.elements.zoomLevelSelect.value = String(targetZoom);
    console.log(`Synced zoom level to ${targetZoom} for graphics setting ${graphicsSettings}`);
  }

  // ----- Getters -----

  /**
   * The user-selected OSM tiles (folder) as a FileList, if any.
   * @returns {FileList|null}
   */
  getSelectedFiles() {
    return this.selectedFiles;
  }

  /**
   * The available tile zoom levels detected from the folder.
   * @returns {number[]}
   */
  getAvailableZoomLevels() {
    return this.availableZoomLevels;
  }

  /**
   * The user-selected obstacles ZIP file, if any.
   * @returns {File|null}
   */
  getObstaclesZipFile() {
    return this.obstaclesZipFile;
  }
}
