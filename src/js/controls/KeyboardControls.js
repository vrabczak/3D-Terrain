// src/js/controls/KeyboardControls.js
import * as THREE from 'three';

/**
 * KeyboardControls
 *
 * Provides aircraft-style keyboard navigation for a Three.js camera,
 * with seamless switching to OrbitControls (mouse navigation).
 *
 * - WASD: move forward/backward/strafe (horizontal plane)
 * - Q/E: yaw left/right (rotate around world up)
 * - R/F: pitch up/down (clamped between horizon and ground)
 * - T/G: ascend/descend vertically
 *
 * When any movement key is pressed, OrbitControls are disabled
 * and keyboard mode takes over. On the next mouse down inside
 * the renderer element, keyboard mode is deactivated and
 * OrbitControls are restored (at the same camera position/target).
 */
export class KeyboardControls {
  /**
   * @param {THREE.Camera} camera - The Three.js camera to control.
   * @param {import('three/examples/jsm/controls/OrbitControls.js').OrbitControls} controls - OrbitControls instance.
   * @param {THREE.WebGLRenderer} renderer - Renderer whose DOM element will receive input events.
   */
  constructor(camera, controls, renderer) {
    /** @type {THREE.Camera} */
    this.camera = camera;

    /** @type {import('three/examples/jsm/controls/OrbitControls.js').OrbitControls} */
    this.orbitControls = controls;

    /** @type {THREE.WebGLRenderer} */
    this.renderer = renderer;

    /** @type {Record<string, boolean>} - Tracks currently pressed keys */
    this.keyStates = {};

    /** @type {boolean} - True if keyboard navigation is active */
    this.isActive = false;

    /** @type {boolean} - True if event listeners are already registered */
    this.initialized = false;

    /** @type {number} - Movement speed per update step */
    this.movementSpeed = 0.005;

    /** @type {number} - Rotation speed per update step (radians) */
    this.rotationSpeed  = 0.01;

    // Reusable vectors (avoid allocations every frame)
    this.velocity         = new THREE.Vector3();
    this.cameraDirection  = new THREE.Vector3();
    this.cameraRight      = new THREE.Vector3();
    this.cameraUp         = new THREE.Vector3();
    this.tmpVec           = new THREE.Vector3();
    this.worldUp          = new THREE.Vector3(0, 1, 0);

    /** @type {string[]} - Keyboard codes mapped to movement/rotation */
    this.movementKeys = ['KeyW','KeyS','KeyA','KeyD','KeyQ','KeyE','KeyR','KeyF','KeyT','KeyG'];

    // Bind methods so they can be safely used as event listeners
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp   = this.handleKeyUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handlePointerDownCapture = this.handlePointerDownCapture.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
  }

  /**
   * Initialize and attach input event listeners (only once).
   */
  init() {
    if (this.initialized) return;
    this.setupEventListeners();
    this.initialized = true;
  }

  /**
   * Attach all required event listeners for keyboard/mouse control.
   * Uses capture-phase pointerdown to switch back to OrbitControls immediately.
   */
  setupEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup',   this.handleKeyUp);

    const el = this.orbitControls?.domElement || this.renderer.domElement;

    // Capture-phase pointerdown → switch to OrbitControls before it sees the event
    el.addEventListener('pointerdown', this.handlePointerDownCapture, { capture: true });

    // Legacy fallback
    el.addEventListener('mousedown', this.handleMouseDown);

    window.addEventListener('blur', this.handleWindowBlur);
  }

  /**
   * Handle key down events, activating keyboard mode when a movement key is pressed.
   * @param {KeyboardEvent} event
   */
  handleKeyDown(event) {
    const key = event.code;
    this.keyStates[key] = true;

    if (this.movementKeys.includes(key)) {
      this.activateKeyboardMode();
      event.preventDefault();
    }
  }

  /**
   * Handle key up events.
   * @param {KeyboardEvent} event
   */
  handleKeyUp(event) {
    const key = event.code;
    this.keyStates[key] = false;
    event.preventDefault();
  }

  /**
   * Capture-phase pointerdown handler.
   * Runs before OrbitControls' own listener, allowing us to
   * deactivate keyboard mode so OrbitControls consumes this very event.
   * @param {PointerEvent} event
   */
  handlePointerDownCapture(event) {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn && (event.target === hamburgerBtn || hamburgerBtn.contains(event.target))) {
      return; // allow UI interaction
    }

    if (this.isActive) {
      this.deactivateKeyboardMode();
    }
  }

  /**
   * Fallback mousedown handler (legacy).
   * @param {MouseEvent} event
   */
  handleMouseDown(event) {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn && (event.target === hamburgerBtn || hamburgerBtn.contains(event.target))) {
      return;
    }

    if (this.isActive) {
      this.deactivateKeyboardMode();
    }
  }

  /**
   * Reset key states and deactivate keyboard mode when window loses focus.
   */
  handleWindowBlur() {
    this.keyStates = {};
    this.deactivateKeyboardMode();
  }

  /**
   * Activate keyboard navigation mode (disables OrbitControls).
   */
  activateKeyboardMode() {
    this.isActive = true;
    this.orbitControls.enabled = false;
  }

  /**
   * Deactivate keyboard mode and restore OrbitControls.
   * Keeps camera position/orientation intact by syncing OrbitControls target.
   */
  deactivateKeyboardMode() {
    this.isActive = false;
    this.syncOrbitToCamera();
    this.orbitControls.enabled = true;
    this.orbitControls.update();
  }

  /**
   * Compute current camera pitch angle from the forward vector.
   * @returns {number} Pitch in radians, where 0 = horizon, negative = looking down, positive = looking up.
   */
  getPitch() {
    this.camera.getWorldDirection(this.cameraDirection);
    const y = THREE.MathUtils.clamp(this.cameraDirection.y, -1, 1);
    return Math.asin(y);
  }

  /**
   * Update loop: apply movement and rotation from current key states.
   * Call once per frame in your animation loop.
   */
  update() {
    if (!this.isActive) return;

    // --- Directions ---
    this.camera.getWorldDirection(this.cameraDirection);
    this.cameraRight.crossVectors(this.cameraDirection, this.worldUp).normalize();

    const horizontalDirection = this.tmpVec.set(
      this.cameraDirection.x, 0, this.cameraDirection.z
    ).normalize();

    // --- Translation ---
    this.velocity.set(0,0,0);

    if (this.keyStates['KeyW']) this.velocity.addScaledVector(horizontalDirection,  this.movementSpeed);
    if (this.keyStates['KeyS']) this.velocity.addScaledVector(horizontalDirection, -this.movementSpeed);
    if (this.keyStates['KeyA']) this.velocity.addScaledVector(this.cameraRight, -this.movementSpeed);
    if (this.keyStates['KeyD']) this.velocity.addScaledVector(this.cameraRight,  this.movementSpeed);
    if (this.keyStates['KeyT']) this.velocity.y += this.movementSpeed;
    if (this.keyStates['KeyG']) this.velocity.y -= this.movementSpeed;

    this.camera.position.add(this.velocity);

    // --- Rotation ---
    if (this.keyStates['KeyQ']) this.camera.rotateOnWorldAxis(this.worldUp,  this.rotationSpeed);
    if (this.keyStates['KeyE']) this.camera.rotateOnWorldAxis(this.worldUp, -this.rotationSpeed);

    let delta = 0;
    if (this.keyStates['KeyR']) delta += this.rotationSpeed;
    if (this.keyStates['KeyF']) delta -= this.rotationSpeed;

    if (delta !== 0) {
      const currentPitch = this.getPitch();
      const EPS = 0.01;
      const minPitch = -Math.PI/2 + EPS;
      const maxPitch = 0;

      const targetPitch = THREE.MathUtils.clamp(currentPitch + delta, minPitch, maxPitch);
      const applyDelta  = targetPitch - currentPitch;

      if (Math.abs(applyDelta) > 1e-6) {
        this.camera.getWorldDirection(this.cameraDirection);
        this.cameraRight.crossVectors(this.cameraDirection, this.worldUp).normalize();
        this.camera.rotateOnWorldAxis(this.cameraRight, applyDelta);
      }
    }
  }

  /**
   * Remove roll component from the camera (align up with world up).
   */
  levelCameraRoll() {
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);

    const right = new THREE.Vector3().crossVectors(forward, this.worldUp).normalize();
    const correctedUp = new THREE.Vector3().crossVectors(right, forward).normalize();

    const m = new THREE.Matrix4();
    m.makeBasis(right, correctedUp, forward);
    this.camera.rotation.setFromRotationMatrix(m);
  }

  /** @param {number} speed */
  setMovementSpeed(speed){ this.movementSpeed = speed; }

  /** @param {number} speed */
  setRotationSpeed(speed){ this.rotationSpeed = speed; }

  /** @returns {number} */
  getMovementSpeed(){ return this.movementSpeed; }

  /** @returns {number} */
  getRotationSpeed(){ return this.rotationSpeed; }

  /** @returns {boolean} */
  isKeyboardActive(){ return this.isActive; }

  /**
   * Synchronize OrbitControls target to match current camera orientation/position.
   * Prevents teleporting when switching back to mouse control.
   */
  syncOrbitToCamera() {
    this.camera.getWorldDirection(this.cameraDirection);

    const dist =
      (typeof this.orbitControls.getDistance === 'function')
        ? this.orbitControls.getDistance()
        : this.camera.position.distanceTo(this.orbitControls.target);

    const minD = (this.orbitControls.minDistance ?? 0);
    const maxD = (this.orbitControls.maxDistance ?? Infinity);
    const clampedDist = THREE.MathUtils.clamp(dist, minD, maxD);

    const newTarget = this.camera.position.clone()
      .add(this.cameraDirection.clone().multiplyScalar(clampedDist));

    this.orbitControls.target.copy(newTarget);

    if (this.orbitControls.enableDamping) {
      const old = this.orbitControls.enableDamping;
      this.orbitControls.enableDamping = false;
      this.orbitControls.update();
      this.orbitControls.enableDamping = old;
    } else {
      this.orbitControls.update();
    }
  }

  /**
   * Remove all event listeners and reset internal state.
   */
  dispose() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup',   this.handleKeyUp);

    const el = this.orbitControls?.domElement || this.renderer.domElement;
    el.removeEventListener('pointerdown', this.handlePointerDownCapture, { capture: true });
    el.removeEventListener('mousedown',   this.handleMouseDown);

    window.removeEventListener('blur', this.handleWindowBlur);
    this.initialized = false;
  }
}
