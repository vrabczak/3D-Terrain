// src/js/controls/KeyboardControls.js
import * as THREE from 'three';

/**
 * Modern KeyboardControls class for aircraft-style camera movement
 * Handles keyboard input, movement calculations, and control state management
 */
export class KeyboardControls {
  constructor(camera, controls, renderer) {
    this.camera = camera;
    this.orbitControls = controls;
    this.renderer = renderer;
    
    // Control state
    this.keyStates = {};
    this.isActive = false;
    this.initialized = false;
    
    // Movement parameters
    this.movementSpeed = 0.005; // Default from HTML
    this.rotationSpeed = 0.01;  // Default from HTML
    
    // Movement vectors (reused for performance)
    this.velocity = new THREE.Vector3();
    this.cameraDirection = new THREE.Vector3();
    this.cameraRight = new THREE.Vector3();
    this.cameraUp = new THREE.Vector3();
    
    // Movement keys configuration
    this.movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyT', 'KeyG'];
    
    // Bind methods to preserve 'this' context
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
  }
  
  /**
   * Initialize keyboard controls and event listeners
   */
  init() {
    if (this.initialized) return;
    
    this.setupEventListeners();
    this.initialized = true;
  }
  
  /**
   * Setup all event listeners for keyboard and mouse input
   */
  setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    
    // Mouse click to restore mouse controls
    this.renderer.domElement.addEventListener('mousedown', this.handleMouseDown);
    
    // Handle window focus/blur to reset key states
    window.addEventListener('blur', this.handleWindowBlur);
  }
  
  /**
   * Handle keydown events
   */
  handleKeyDown(event) {
    const key = event.code;
    this.keyStates[key] = true;
    
    // Check if any movement keys are pressed
    if (this.movementKeys.includes(key)) {
      this.activateKeyboardMode();
      event.preventDefault();
    }
  }
  
  /**
   * Handle keyup events
   */
  handleKeyUp(event) {
    const key = event.code;
    this.keyStates[key] = false;
    event.preventDefault();
  }
  
  /**
   * Handle mouse down events to potentially restore mouse controls
   */
  handleMouseDown(event) {
    // Don't interfere with hamburger button clicks
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn && (event.target === hamburgerBtn || hamburgerBtn.contains(event.target))) {
      return;
    }
    
    if (this.isActive) {
      // Check if no movement keys are currently pressed
      const anyMovementKeyPressed = this.movementKeys.some(k => this.keyStates[k]);
      
      if (!anyMovementKeyPressed) {
        this.deactivateKeyboardMode();
      }
    }
  }
  
  /**
   * Handle window blur to reset states
   */
  handleWindowBlur() {
    this.keyStates = {};
    this.deactivateKeyboardMode();
  }
  
  /**
   * Activate keyboard control mode
   */
  activateKeyboardMode() {
    this.isActive = true;
    this.orbitControls.enabled = false;
  }
  
  /**
   * Deactivate keyboard control mode and restore mouse controls
   */
  deactivateKeyboardMode() {
    this.isActive = false;
    this.orbitControls.enabled = true;
    this.orbitControls.update();
  }
  
  /**
   * Update camera position and rotation based on current key states
   * Should be called in the animation loop
   */
  update() {
    if (!this.isActive) return;
    
    // Get camera direction and right vectors
    this.camera.getWorldDirection(this.cameraDirection);
    this.cameraRight.crossVectors(this.cameraDirection, this.camera.up).normalize();
    
    // Project camera direction onto horizontal plane (XZ plane)
    const horizontalDirection = new THREE.Vector3(
      this.cameraDirection.x,
      0,  // Zero out the vertical component
      this.cameraDirection.z
    ).normalize();
    
    // Reset velocity
    this.velocity.set(0, 0, 0);
    
    // Use horizontal direction for forward/backward movement
    if (this.keyStates['KeyW']) this.velocity.add(horizontalDirection.clone().multiplyScalar(this.movementSpeed));
    if (this.keyStates['KeyS']) this.velocity.add(horizontalDirection.clone().multiplyScalar(-this.movementSpeed));
    
    // Left/right strafing remains the same
    if (this.keyStates['KeyA']) this.velocity.add(this.cameraRight.clone().multiplyScalar(-this.movementSpeed));
    if (this.keyStates['KeyD']) this.velocity.add(this.cameraRight.clone().multiplyScalar(this.movementSpeed));
    
    // Vertical movement (T/G) remains unchanged
    if (this.keyStates['KeyT']) this.velocity.y += this.movementSpeed;
    if (this.keyStates['KeyG']) this.velocity.y -= this.movementSpeed;
    
    // Apply movement
    this.camera.position.add(this.velocity);
    
    // Rotation controls remain the same
    const worldUp = new THREE.Vector3(0, 1, 0);
    const horizontalRight = new THREE.Vector3().crossVectors(horizontalDirection, worldUp).normalize();
    
    if (this.keyStates['KeyQ']) this.camera.rotateOnWorldAxis(worldUp, this.rotationSpeed);
    if (this.keyStates['KeyE']) this.camera.rotateOnWorldAxis(worldUp, -this.rotationSpeed);
    if (this.keyStates['KeyR']) this.camera.rotateOnWorldAxis(horizontalRight, this.rotationSpeed);
    if (this.keyStates['KeyF']) this.camera.rotateOnWorldAxis(horizontalRight, -this.rotationSpeed);
  }
  
  /**
   * Level camera roll to remove any unwanted rotation around the forward axis
   */
  levelCameraRoll() {
    // Get the camera's current forward direction
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    
    // Create a target up vector (world up)
    const worldUp = new THREE.Vector3(0, 1, 0);
    
    // Calculate the right vector (perpendicular to forward and world up)
    const right = new THREE.Vector3().crossVectors(forward, worldUp).normalize();
    
    // Calculate the corrected up vector (perpendicular to forward and right)
    const correctedUp = new THREE.Vector3().crossVectors(right, forward.negate()).normalize();
    
    // Create a rotation matrix with the corrected orientation
    const matrix = new THREE.Matrix4();
    matrix.makeBasis(right, correctedUp, forward.negate());
    
    // Apply the rotation to the camera
    this.camera.rotation.setFromRotationMatrix(matrix);
  }
  
  /**
   * Set movement speed
   */
  setMovementSpeed(speed) {
    this.movementSpeed = speed;
  }
  
  /**
   * Set rotation speed
   */
  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }
  
  /**
   * Get current movement speed
   */
  getMovementSpeed() {
    return this.movementSpeed;
  }
  
  /**
   * Get current rotation speed
   */
  getRotationSpeed() {
    return this.rotationSpeed;
  }
  
  /**
   * Check if keyboard controls are currently active
   */
  isKeyboardActive() {
    return this.isActive;
  }
  
  /**
   * Cleanup event listeners
   */
  dispose() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.renderer.domElement.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('blur', this.handleWindowBlur);
    this.initialized = false;
  }
}
