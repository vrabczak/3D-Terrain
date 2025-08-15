// src/js/overlays/Overlay2D.js
import * as THREE from 'three';

/**
 * Unified Overlay2D class that manages all 2D overlay elements:
 * - Compass/North Arrow
 * - Speed Control Sliders
 * - Controls Legend
 * Uses modern JavaScript practices with proper encapsulation and event handling
 */
export class Overlay2D {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    
    // DOM elements
    this.elements = {
      compass: document.getElementById('north-arrow'),
      compassRose: null, // Will be found within compass
      speedControl: document.getElementById('speed-control'),
      movementSpeedSlider: document.getElementById('movementSpeed'),
      movementSpeedValue: document.getElementById('speedValue'),
      rotationSpeedSlider: document.getElementById('rotationSpeed'),
      rotationSpeedValue: document.getElementById('rotationSpeedValue'),
      controlsLegend: document.getElementById('controls-legend')
    };
    
    // Speed values
    this.speeds = {
      movement: 0.005, // Default from HTML
      rotation: 0.01   // Default from HTML
    };
    
    // State
    this.initialized = false;
    this.visible = false;
    
    // Callbacks for speed changes (to communicate with KeyboardControls)
    this.onSpeedChange = null;
    
    // Bind methods to preserve 'this' context
    this.handleMovementSpeedChange = this.handleMovementSpeedChange.bind(this);
    this.handleRotationSpeedChange = this.handleRotationSpeedChange.bind(this);
  }
  
  /**
   * Initialize all overlay components
   */
  init() {
    if (this.initialized) return;
    
    this.initCompass();
    this.initSpeedControls();
    this.initControlsLegend();
    
    this.initialized = true;
  }
  
  /**
   * Initialize compass/north arrow component
   */
  initCompass() {
    if (this.elements.compass) {
      // Find the compass rose within the compass element
      this.elements.compassRose = this.elements.compass.querySelector('.compass-rose');
      
      if (!this.elements.compassRose) {
        console.warn('Compass rose element not found within north-arrow');
      }
    } else {
      console.warn('North arrow element not found');
    }
  }
  
  /**
   * Initialize speed control sliders
   */
  initSpeedControls() {
    // Movement speed slider
    if (this.elements.movementSpeedSlider && this.elements.movementSpeedValue) {
      this.elements.movementSpeedSlider.addEventListener('input', this.handleMovementSpeedChange);
      
      // Set initial values
      this.speeds.movement = parseFloat(this.elements.movementSpeedSlider.value);
      this.elements.movementSpeedValue.textContent = this.speeds.movement.toFixed(3);
    } else {
      console.warn('Movement speed controls not found');
    }
    
    // Rotation speed slider
    if (this.elements.rotationSpeedSlider && this.elements.rotationSpeedValue) {
      this.elements.rotationSpeedSlider.addEventListener('input', this.handleRotationSpeedChange);
      
      // Set initial values
      this.speeds.rotation = parseFloat(this.elements.rotationSpeedSlider.value);
      this.elements.rotationSpeedValue.textContent = this.speeds.rotation.toFixed(3);
    } else {
      console.warn('Rotation speed controls not found');
    }
  }
  
  /**
   * Initialize controls legend
   */
  initControlsLegend() {
    if (!this.elements.controlsLegend) {
      console.warn('Controls legend element not found');
    }
    // Legend is static, no initialization needed beyond DOM reference
  }
  
  /**
   * Handle movement speed slider changes
   */
  handleMovementSpeedChange(event) {
    this.speeds.movement = parseFloat(event.target.value);
    this.elements.movementSpeedValue.textContent = this.speeds.movement.toFixed(3);
    
    // Notify external listeners (e.g., KeyboardControls)
    if (this.onSpeedChange) {
      this.onSpeedChange('movement', this.speeds.movement);
    }
  }
  
  /**
   * Handle rotation speed slider changes
   */
  handleRotationSpeedChange(event) {
    this.speeds.rotation = parseFloat(event.target.value);
    this.elements.rotationSpeedValue.textContent = this.speeds.rotation.toFixed(3);
    
    // Notify external listeners (e.g., KeyboardControls)
    if (this.onSpeedChange) {
      this.onSpeedChange('rotation', this.speeds.rotation);
    }
  }
  
  /**
   * Update compass rotation based on camera orientation
   * Should be called in the animation loop
   */
  updateCompass() {
    if (!this.elements.compassRose || !this.controls) return;
    
    // Calculate camera azimuth (horizontal rotation around Y axis)
    const cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);
    
    // Project camera direction onto horizontal plane (ignore Y component)
    const horizontalDirection = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
    
    // Calculate angle from North (positive Z axis)
    // In our coordinate system, North is positive Z direction
    // But we need to calculate the angle from where North should be relative to camera
    // Adjust for flipped X coordinate system from mesh scale
    let azimuthAngle = Math.atan2(horizontalDirection.x, horizontalDirection.z);
    
    // Convert to degrees
    let azimuthDegrees = azimuthAngle * (180 / Math.PI);
    
    // Add 180 degrees to flip the direction (since we want North relative to camera, not camera relative to North)
    azimuthDegrees += 180;
    
    // Rotate the compass rose to point North correctly
    this.elements.compassRose.style.transform = `rotate(${azimuthDegrees}deg)`;
  }
  
  /**
   * Show all overlay elements
   */
  show() {
    if (!this.initialized) this.init();
    
    this.visible = true;
    
    // Show speed controls
    if (this.elements.speedControl) {
      this.elements.speedControl.style.display = 'block';
    }
    
    // Compass and legend are typically always visible when terrain is loaded
    // but we can control their visibility here if needed
  }
  
  /**
   * Hide all overlay elements
   */
  hide() {
    this.visible = false;
    
    // Hide speed controls
    if (this.elements.speedControl) {
      this.elements.speedControl.style.display = 'none';
    }
  }
  
  /**
   * Set callback for speed changes
   */
  setSpeedChangeCallback(callback) {
    this.onSpeedChange = callback;
  }
  
  /**
   * Get current movement speed
   */
  getMovementSpeed() {
    return this.speeds.movement;
  }
  
  /**
   * Get current rotation speed
   */
  getRotationSpeed() {
    return this.speeds.rotation;
  }
  
  /**
   * Set movement speed programmatically
   */
  setMovementSpeed(speed) {
    this.speeds.movement = speed;
    
    if (this.elements.movementSpeedSlider) {
      this.elements.movementSpeedSlider.value = speed;
    }
    if (this.elements.movementSpeedValue) {
      this.elements.movementSpeedValue.textContent = speed.toFixed(3);
    }
  }
  
  /**
   * Set rotation speed programmatically
   */
  setRotationSpeed(speed) {
    this.speeds.rotation = speed;
    
    if (this.elements.rotationSpeedSlider) {
      this.elements.rotationSpeedSlider.value = speed;
    }
    if (this.elements.rotationSpeedValue) {
      this.elements.rotationSpeedValue.textContent = speed.toFixed(3);
    }
  }
  
  /**
   * Update all overlay components
   * Should be called in the animation loop
   */
  update() {
    if (!this.visible || !this.initialized) return;
    
    this.updateCompass();
  }
  
  /**
   * Check if overlays are visible
   */
  isVisible() {
    return this.visible;
  }
  
  /**
   * Cleanup event listeners and resources
   */
  dispose() {
    if (this.elements.movementSpeedSlider) {
      this.elements.movementSpeedSlider.removeEventListener('input', this.handleMovementSpeedChange);
    }
    if (this.elements.rotationSpeedSlider) {
      this.elements.rotationSpeedSlider.removeEventListener('input', this.handleRotationSpeedChange);
    }
    
    this.initialized = false;
    this.visible = false;
    this.onSpeedChange = null;
  }
}
