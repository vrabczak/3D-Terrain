/**
 * Event Handlers - Manages file inputs, graphics settings, and zoom level synchronization
 */

import { detectAvailableZoomLevelsFromFiles, getOptimalZoomLevel } from './osm-tile-utils.js';

export class EventHandlers {
  constructor(uiManager) {
    this.uiManager = uiManager;
    this.selectedFiles = null;
    this.availableZoomLevels = [];
    this.isUpdatingGraphicsSettings = false;
    this.initializeEventHandlers();
  }

  initializeEventHandlers() {
    this.setupFileInputHandlers();
    this.setupGraphicsSettingsSync();
  }

  setupFileInputHandlers() {
    const { tileFolderInput, folderStatus } = this.uiManager.elements;

    // Set loading cursor when user clicks on OSM folder input
    tileFolderInput.addEventListener('click', () => {
      document.body.style.cursor = 'wait';
    });

    // Handle folder selection
    tileFolderInput.addEventListener('change', async (event) => {
      try {
        const files = event.target.files;
        if (files && files.length > 0) {
          this.selectedFiles = files;
          
          // Get folder name from the first file's path
          const firstFile = files[0];
          const pathParts = firstFile.webkitRelativePath.split('/');
          const folderName = pathParts[0];
          
          folderStatus.textContent = `Vybrána složka: ${folderName} (${files.length} souborů)`;
          folderStatus.style.color = 'green';
          
          // Detect available zoom levels
          console.log('Detekuji dostupné zoom levely...');
          this.availableZoomLevels = await detectAvailableZoomLevelsFromFiles(files);
          console.log('Dostupné zoom levely:', this.availableZoomLevels);
          
          // Update zoom level dropdown
          this.updateZoomLevelOptions(this.availableZoomLevels);
          
          // Reset cursor after processing
          document.body.style.cursor = 'default';
        } else {
          folderStatus.textContent = 'Žádná složka nevybrána';
          folderStatus.style.color = '';
          this.availableZoomLevels = [];
          this.updateZoomLevelOptions([]);
          
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
  }

  setupGraphicsSettingsSync() {
    const { graphicsSettingsSelect, zoomLevelSelect } = this.uiManager.elements;

    // Sync graphics settings with advanced settings
    graphicsSettingsSelect.addEventListener('change', () => {
      if (this.isUpdatingGraphicsSettings) return; // Prevent infinite loops
      
      const graphicsSettings = graphicsSettingsSelect.value;
      
      // Update advanced settings based on graphics settings
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
              targetZoomIndex = 0; // Lowest zoom
              break;
            case 'veryLow':
              targetZoomIndex = Math.floor(availableZooms.length * 0.25);
              break;
            case 'low':
              targetZoomIndex = Math.floor(availableZooms.length * 0.5);
              break;
            case 'medium':
              targetZoomIndex = Math.floor(availableZooms.length * 0.75);
              break;
            case 'high':
              targetZoomIndex = availableZooms.length - 1; // Highest zoom
              break;
            default:
              targetZoomIndex = Math.floor(availableZooms.length * 0.5);
          }
          
          // Ensure index is within bounds
          targetZoomIndex = Math.max(0, Math.min(targetZoomIndex, availableZooms.length - 1));
          const targetZoom = availableZooms[targetZoomIndex];
          
          zoomLevelSelect.value = targetZoom.toString();
          console.log(`Graphics setting ${graphicsSettings}: Set zoom level to ${targetZoom} (index ${targetZoomIndex}/${availableZooms.length - 1}, available: ${availableZooms.join(', ')})`);
        }
      }
      
      this.isUpdatingGraphicsSettings = true; // Set flag to prevent infinite loops
      setTimeout(() => {
        this.isUpdatingGraphicsSettings = false; // Reset flag after a short delay
      }, 100);
    });
  }

  // Get description for zoom level
  getZoomDescription(zoom) {
    const descriptions = {
      10: "Velmi nízké rozlišení (cca 150m/pixel)",
      12: "Nízké rozlišení (cca 38m/pixel)", 
      14: "Střední rozlišení (cca 9.5m/pixel)",
      16: "Vysoké rozlišení (cca 2.4m/pixel)",
      18: "Velmi vysoké rozlišení (cca 0.6m/pixel)"
    };
    return descriptions[zoom] || `Zoom level ${zoom}`;
  }

  // Sync zoom level with graphics settings
  syncZoomLevelWithGraphicsSettings(graphicsSettings, availableZooms) {
    if (availableZooms.length === 0) return;
    
    let targetZoomIndex;
    
    switch (graphicsSettings) {
      case 'veryVeryLow':
        targetZoomIndex = 0;
        break;
      case 'veryLow':
        targetZoomIndex = Math.floor(availableZooms.length * 0.25);
        break;
      case 'low':
        targetZoomIndex = Math.floor(availableZooms.length * 0.5);
        break;
      case 'medium':
        targetZoomIndex = Math.floor(availableZooms.length * 0.75);
        break;
      case 'high':
        targetZoomIndex = availableZooms.length - 1;
        break;
      default:
        targetZoomIndex = Math.floor(availableZooms.length * 0.5);
    }
    
    targetZoomIndex = Math.max(0, Math.min(targetZoomIndex, availableZooms.length - 1));
    const targetZoom = availableZooms[targetZoomIndex];
    
    this.uiManager.elements.zoomLevelSelect.value = targetZoom.toString();
    console.log(`Synced zoom level to ${targetZoom} for graphics setting ${graphicsSettings}`);
  }

  // Update zoom level dropdown based on available levels
  updateZoomLevelOptions(availableZooms) {
    const { zoomLevelSelect, graphicsSettingsSelect } = this.uiManager.elements;
    
    if (availableZooms.length === 0) {
      zoomLevelSelect.disabled = true;
      zoomLevelSelect.innerHTML = '<option value="">Žádné zoom levely nenalezeny</option>';
      return;
    }
    
    // Sort zoom levels
    const sortedZooms = [...availableZooms].sort((a, b) => a - b);
    
    // Clear existing options
    zoomLevelSelect.innerHTML = '';
    
    // Add auto option
    const autoOption = document.createElement('option');
    autoOption.value = 'auto';
    autoOption.textContent = 'Automaticky (doporučeno)';
    zoomLevelSelect.appendChild(autoOption);
    
    // Add available zoom levels
    sortedZooms.forEach(zoom => {
      const option = document.createElement('option');
      option.value = zoom.toString();
      option.textContent = `${zoom} - ${this.getZoomDescription(zoom)}`;
      zoomLevelSelect.appendChild(option);
    });
    
    // Enable the select
    zoomLevelSelect.disabled = false;
    
    // Set default to auto
    zoomLevelSelect.value = 'auto';
    
    // Sync with current graphics settings
    const currentGraphicsSettings = graphicsSettingsSelect.value;
    if (currentGraphicsSettings) {
      this.syncZoomLevelWithGraphicsSettings(currentGraphicsSettings, sortedZooms);
    }
    
    console.log(`Updated zoom level options: [${sortedZooms.join(', ')}]`);
  }

  // Getters for external access
  getSelectedFiles() {
    return this.selectedFiles;
  }

  getAvailableZoomLevels() {
    return this.availableZoomLevels;
  }
}
