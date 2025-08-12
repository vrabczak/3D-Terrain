/**
 * UI Manager - Handles DOM elements, progress bar, and hamburger menu
 */

export class UIManager {
  constructor() {
    this.elements = {};
    this.initializeElements();
    this.initializeHamburgerMenu();
    this.initializeSpeedSlider();
  }

  initializeElements() {
    // Form elements
    this.elements.demInput = document.getElementById('demFile');
    this.elements.tileFolderInput = document.getElementById('tileFolder');
    this.elements.folderStatus = document.getElementById('folderStatus');
    this.elements.latitudeInput = document.getElementById('latitude');
    this.elements.longitudeInput = document.getElementById('longitude');
    this.elements.modelSizeInput = document.getElementById('modelSize');
    this.elements.zoomLevelSelect = document.getElementById('zoomLevel');
    this.elements.heightScaleSelect = document.getElementById('heightScale');
    this.elements.graphicsSettingsSelect = document.getElementById('graphicsSettings');
    this.elements.renderBtn = document.getElementById('renderBtn');

    // Progress bar elements
    this.elements.progressContainer = document.getElementById('progress-container');
    this.elements.progressBar = document.getElementById('progress-bar');
    this.elements.progressText = document.getElementById('progress-text');
    this.elements.progressPercentage = document.getElementById('progress-percentage');

    // Menu elements
    this.elements.hamburgerBtn = document.getElementById('hamburger-btn');
    this.elements.menuContainer = document.getElementById('upload-container');
    this.elements.advancedDialog = document.getElementById('advanced-dialog');
    this.elements.speedControl = document.getElementById('speed-control');

    // Advanced settings elements
    this.elements.sceneResolutionSelect = document.getElementById('sceneResolution');
    this.elements.antialiasingSelect = document.getElementById('antialiasing');

    // Initialize zoom level dropdown as disabled until OSM tiles are loaded
    this.elements.zoomLevelSelect.disabled = true;
    this.elements.zoomLevelSelect.innerHTML = '<option value="">Načtěte OSM dlaždice pro výběr zoom levelu...</option>';
  }

  initializeHamburgerMenu() {
    const { hamburgerBtn, menuContainer } = this.elements;

    console.log('Hamburger button element:', hamburgerBtn);
    console.log('Menu container element:', menuContainer);

    if (hamburgerBtn && menuContainer) {
      // Remove any existing event listeners to prevent duplicates
      hamburgerBtn.removeEventListener('click', this.handleHamburgerClick.bind(this));
      hamburgerBtn.addEventListener('click', this.handleHamburgerClick.bind(this), { once: false, passive: false });
    } else {
      console.error('Hamburger button or menu container not found!');
    }
  }

  handleHamburgerClick(event) {
    console.log('Hamburger button clicked!');
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    const { hamburgerBtn, menuContainer } = this.elements;
    
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

  initializeSpeedSlider() {
    const rotationSpeedSlider = document.getElementById('rotationSpeed');
    const rotationSpeedValue = document.getElementById('rotationSpeedValue');
    
    if (rotationSpeedSlider && rotationSpeedValue) {
      rotationSpeedSlider.addEventListener('input', (event) => {
        rotationSpeedValue.textContent = parseFloat(event.target.value).toFixed(3);
      });
      
      // Set initial value
      rotationSpeedValue.textContent = parseFloat(rotationSpeedSlider.value).toFixed(3);
    }
  }

  // Progress management functions
  showProgress() {
    this.elements.progressContainer.style.display = 'block';
  }

  hideProgress() {
    this.elements.progressContainer.style.display = 'none';
  }

  updateProgress(percentage, message) {
    this.elements.progressBar.style.width = `${percentage}%`;
    this.elements.progressText.textContent = message;
    this.elements.progressPercentage.textContent = `${Math.round(percentage)}%`;
  }

  // Advanced settings toggle functionality
  toggleAdvancedDialog() {
    const { advancedDialog } = this.elements;
    if (advancedDialog.style.display === 'none' || advancedDialog.style.display === '') {
      advancedDialog.style.display = 'block';
    } else {
      advancedDialog.style.display = 'none';
    }
  }

  // UI state management
  setLoadingState(isLoading) {
    document.body.style.cursor = isLoading ? 'wait' : 'default';
    this.elements.renderBtn.disabled = isLoading;
    this.elements.renderBtn.textContent = isLoading ? 'Načítám...' : 'Zobrazit terén';
  }

  hideMenuAndShowControls() {
    const { menuContainer, hamburgerBtn, speedControl, advancedDialog } = this.elements;
    menuContainer.classList.add('collapsed');
    hamburgerBtn.style.display = 'flex';
    speedControl.style.display = 'block';
    
    // Close advanced dialog if it's open
    if (advancedDialog.style.display === 'block') {
      advancedDialog.style.display = 'none';
    }
  }

  // Get all form values
  getFormValues() {
    return {
      demFile: this.elements.demInput.files[0],
      latitude: parseFloat(this.elements.latitudeInput.value),
      longitude: parseFloat(this.elements.longitudeInput.value),
      modelSize: parseFloat(this.elements.modelSizeInput.value),
      zoomLevel: this.elements.zoomLevelSelect.value,
      heightScaleMultiplier: parseFloat(this.elements.heightScaleSelect.value),
      graphicsSettings: this.elements.graphicsSettingsSelect.value,
      sceneResolution: parseFloat(this.elements.sceneResolutionSelect.value),
      antialiasing: this.elements.antialiasingSelect.value === 'true'
    };
  }

  // Validation helpers
  validateForm() {
    const values = this.getFormValues();
    
    if (!values.demFile) {
      alert('Nahrajte DEM GeoTIFF soubor');
      return false;
    }

    if (isNaN(values.latitude) || isNaN(values.longitude)) {
      alert('Zadejte platné souřadnice (zeměpisná šířka a délka)');
      return false;
    }

    if (isNaN(values.modelSize) || values.modelSize <= 0) {
      alert('Zadejte platnou velikost modelu v kilometrech');
      return false;
    }

    return true;
  }
}
