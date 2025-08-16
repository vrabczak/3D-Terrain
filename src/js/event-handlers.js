/**
 * Event Handlers - Manages file inputs, graphics settings, and zoom level synchronization
 */

import { detectAvailableZoomLevelsFromFiles } from './osm-tile-utils.js';

export class EventHandlers {
  constructor(uiManager) {
    this.uiManager = uiManager;
    this.selectedFiles = null;
    this.availableZoomLevels = [];
    this.isUpdatingGraphicsSettings = false;
    this.tilesMode = 'root'; // 'root' or 'single'
    this.initializeEventHandlers();
  }

  initializeEventHandlers() {
    this.setupFileInputHandlers();
    this.setupGraphicsSettingsSync();
  }

  setupFileInputHandlers() {
    const { tileFolderInput, folderStatus } = this.uiManager.elements;

    // Show wait cursor while the picker is open
    tileFolderInput.addEventListener('click', () => {
      document.body.style.cursor = 'wait';
    });

    tileFolderInput.addEventListener('change', async (event) => {
      try {
        const files = event.target.files;
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
  }

  setupGraphicsSettingsSync() {
    const { graphicsSettingsSelect, zoomLevelSelect } = this.uiManager.elements;

    graphicsSettingsSelect.addEventListener('change', () => {
      if (this.isUpdatingGraphicsSettings) return;

      const graphicsSettings = graphicsSettingsSelect.value;
      const { sceneResolutionSelect, antialiasingSelect } = this.uiManager.elements;

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

  updateZoomLevelOptions(availableZooms) {
    const { zoomLevelSelect, graphicsSettingsSelect } = this.uiManager.elements;

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

  // Getters
  getSelectedFiles() {
    return this.selectedFiles;
  }

  getAvailableZoomLevels() {
    return this.availableZoomLevels;
  }
}
