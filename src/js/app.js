import '../style.css'; // Import CSS for webpack processing
import { UIManager } from './ui-manager.js';
import { EventHandlers } from './event-handlers.js';
import { RenderController } from './render-controller.js';

/**
 * Main Application - Coordinates all modules and initializes the app
 */
class TerrainApp {
  constructor() {
    this.uiManager = null;
    this.eventHandlers = null;
    this.renderController = null;
  }

  initialize() {
    console.log('Initializing Terrain App...');
    
    // Initialize UI Manager first
    this.uiManager = new UIManager();
    
    // Initialize Event Handlers with UI Manager reference
    this.eventHandlers = new EventHandlers(this.uiManager);
    
    // Initialize Render Controller with both managers
    this.renderController = new RenderController(this.uiManager, this.eventHandlers);
    
    // Make toggleAdvancedDialog globally available for backward compatibility
    window.toggleAdvancedDialog = this.uiManager.toggleAdvancedDialog.bind(this.uiManager);
    
    console.log('Terrain App initialized successfully!');
  }
}

// Initialize the application when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Prevent duplicate initialization
  if (window.terrainAppInitialized) {
    console.warn('Terrain app already initialized, skipping duplicate initialization');
    return;
  }
  
  window.terrainAppInitialized = true;
  const app = new TerrainApp();
  app.initialize();
});
