// src/js/terrain.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KeyboardControls } from './controls/KeyboardControls.js';
import { Overlay2D } from './overlays/Overlay2D.js';
import { MeshFactory } from './MeshFactory.js';

/**
 * TerrainRenderer — orchestrates the app pipeline (scene, IO, camera, controls, render loop)
 * and delegates all mesh creation & geodetic↔model math to MeshFactory.
 */
export class TerrainRenderer {
  constructor() {
    /** @type {THREE.Scene|null} */ this.scene = null;
    /** @type {THREE.PerspectiveCamera|null} */ this.camera = null;
    /** @type {THREE.WebGLRenderer|null} */ this.renderer = null;
    /** @type {OrbitControls|null} */ this.controls = null;

    /** @type {MeshFactory} */ this.meshFactory = new MeshFactory();
    /** @type {THREE.Mesh|null} */ this.terrainMesh = null;

    /** @type {KeyboardControls|null} */ this.keyboardControls = null;
    /** @type {Overlay2D|null} */ this.overlay2D = null;

    /** @type {number|null} */ this.animationId = null;
    /** @type {boolean} */ this.isAnimating = false;

    /** @type {boolean} */ this._lightingReady = false;

    this.animate = this.animate.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  // ---------------------------------------------------------------------------
  // Pipeline
  // ---------------------------------------------------------------------------

  /**
   * Generate and display 3D terrain from DEM and texture data.
   *
   * @param {{
   *   width:number,
   *   height:number,
   *   rasters: Float32Array[]|Float32Array,
   *   geoTransform: {originX:number, originY:number, pixelSizeX:number, pixelSizeY:number},
   *   samplesPerPixel:number,
   *   bbox:[number,number,number,number]
   * }} demData DEM (GeoTIFF) read result.
   * @param {ImageData|null} textureImageData Resampled orthophoto/OSM imagery aligned to DEM bbox (optional).
   * @param {number} [heightScaleMultiplier=1] Vertical exaggeration multiplier (1 = true meters).
   * @param {number} [terrainResolution=30] Desired ground resolution (m/cell) for elevation grid and mesh.
   * @param {number|null} [adjustedZoomLevel=null] Unused here; kept for compatibility with caller.
   * @param {number} [sceneResolution=1] Unused here; reserved for future rendering scale.
   * @param {number} [maxTerrainDimension=1024] Max grid dimension (limits triangles/vertices).
   * @param {number} [textureDownsample=1] Downsample factor for texture (1 = original).
   * @param {'auto'|boolean|string} [antialiasing='auto'] Renderer AA setting.
   * @returns {Promise<void>}
   */
  async generateTerrain(
    demData,
    textureImageData,
    heightScaleMultiplier = 1,
    terrainResolution = 30,
    adjustedZoomLevel = null,
    sceneResolution = 1,
    maxTerrainDimension = 1024,
    textureDownsample = 1,
    antialiasing = 'auto'
  ) {
    try {
      // Build terrain mesh via MeshFactory
      const { mesh, dimensions, elevationStats } = this.meshFactory.build(demData, textureImageData, {
        heightScaleMultiplier,
        terrainResolution,
        maxTerrainDimension,
        textureDownsample,
      });

      // Lazy-init Three.js once
      if (!this.scene) this.initThreeJS(antialiasing);

      // Replace existing mesh if present
      if (this.terrainMesh) {
        this.scene.remove(this.terrainMesh);
        this.disposeMesh(this.terrainMesh);
      }

      this.terrainMesh = mesh;
      this.scene.add(mesh);

      // Improve texture quality: anisotropy + ensure map updates
      const mat = /** @type {any} */ (mesh.material);
      if (mat && mat.map && this.renderer) {
        const getMaxAniso = this.renderer.capabilities.getMaxAnisotropy?.bind(this.renderer.capabilities);
        mat.map.anisotropy = getMaxAniso ? getMaxAniso() : 8;
        mat.map.needsUpdate = true;
      }

      // Lights and overlays (run once)
      if (!this._lightingReady) { this.setupLighting(); this._lightingReady = true; }
      if (!this.overlay2D) { this.initControlsAndOverlays(); }
      this.positionCamera(dimensions);

      //test object
      //await this.addTestBall(49.16661,16.12393);
      
      // Animate
      this.startAnimation();

      // Diagnostics
      console.log(`Terrain: ${dimensions.realWorldWidth.toFixed(0)} m × ${dimensions.realWorldHeight.toFixed(0)} m, grid ${dimensions.terrainWidth}×${dimensions.terrainHeight}`);
      console.log(`Elevation: min=${elevationStats.min} m, max=${elevationStats.max} m`);
    } catch (error) {
      console.error('Error while generating terrain:', error);
      throw error;
    }
  }

  // ---------------------------------------------------------------------------
  // Three.js setup and scene utilities
  // ---------------------------------------------------------------------------

  /**
   * Initialize Three.js scene, camera, renderer, and attach window-resize handler.
   * @param {'auto'|boolean|string} antialiasing Renderer AA setting.
   * @returns {void}
   */
  initThreeJS(antialiasing) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // sky blue

    // Camera
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('three-canvas'));
    const aspect = Math.max(1e-6, canvas.clientWidth / Math.max(1, canvas.clientHeight));
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000);

    // Antialiasing
    let aa = false;
    if (antialiasing === 'auto') aa = window.devicePixelRatio <= 2;
    else if (antialiasing === 'true' || antialiasing === true) aa = true;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: aa });
    const width = Math.floor(canvas.clientWidth);
    const height = Math.floor(canvas.clientHeight);
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Modern color management
    // Shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50000;
    this.controls.maxPolarAngle = Math.PI;

    // Resize
    window.addEventListener('resize', this.handleWindowResize);
  }

  /** Add ambient/hemi/directional lights. */
  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  /** Init keyboard controls and overlay UI. */
  initControlsAndOverlays() {
    this.keyboardControls = new KeyboardControls(this.camera, this.controls, this.renderer);
    this.keyboardControls.init();

    this.overlay2D = new Overlay2D(this.camera, this.keyboardControls);
    this.overlay2D.init();
    this.overlay2D.show();

    this.overlay2D.setSpeedChangeCallback((type, value) => {
      if (type === 'movement') this.keyboardControls.setMovementSpeed(value);
      else if (type === 'rotation') this.keyboardControls.setRotationSpeed(value);
    });

    this.keyboardControls.setMovementSpeed(this.overlay2D.getMovementSpeed());
    this.keyboardControls.setRotationSpeed(this.overlay2D.getRotationSpeed());
  }

  /**
   * Place the camera at a reasonable vantage point based on terrain size.
   * @param {{realWorldWidth:number, realWorldHeight:number}} dimensions
   */
  positionCamera(dimensions) {
    const maxDimension = Math.max(dimensions.realWorldWidth, dimensions.realWorldHeight);
    this.camera.position.set(0, maxDimension * 0.5, maxDimension * 0.3);
    this.camera.lookAt(0, 0, 0);
  }

  /** Dispose a single mesh's GPU resources. */
  disposeMesh(mesh) {
    if (!mesh) return;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material;
    if (mat) {
      if (Array.isArray(mat)) mat.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
      else { if (mat.map) mat.map.dispose(); mat.dispose(); }
    }
  }

  // ---------------------------------------------------------------------------
  // Animation loop
  // ---------------------------------------------------------------------------

  /** Start the render loop. */
  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  /** Stop the render loop. */
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isAnimating = false;
  }

  /** Animation tick: update controls/overlays and render the scene. */
  animate() {
    if (!this.isAnimating) return;
    this.animationId = requestAnimationFrame(this.animate);

    if (this.keyboardControls) this.keyboardControls.update();
    if (this.controls && (!this.keyboardControls || !this.keyboardControls.isKeyboardActive())) this.controls.update();
    if (this.overlay2D) this.overlay2D.update();

    this.renderer.render(this.scene, this.camera);
  }

  /** Handle browser window resizes. */
  handleWindowResize() {
    if (!this.camera || !this.renderer) return;
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('three-canvas'));
    this.camera.aspect = Math.max(1e-6, canvas.clientWidth / Math.max(1, canvas.clientHeight));
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }

  // ---------------------------------------------------------------------------
  // Convenience wrappers that forward to MeshFactory
  // ---------------------------------------------------------------------------

  /**
   * Convert geographic position to world/scene coordinates on the terrain surface.
   * Forwards to MeshFactory.latLonToModelXYZ.
   * @param {number} lat
   * @param {number} lon
   * @param {{clampToBounds?: boolean}} [options]
   * @returns {{x:number,y:number,z:number}}
   */
  latLonToModelXYZ(lat, lon, options) {
    return this.meshFactory.latLonToModelXYZ(lat, lon, options);
  }

  /**
   * Convert real meters to model units (Mercator-aware horizontally, exaggerated vertically).
   * Forwards to MeshFactory.metersToModelUnits.
   * @param {number} meters
   * @param {'horizontal'|'vertical'} [axis='horizontal']
   * @param {number} [lat]
   */
  metersToModelUnits(meters, axis = 'horizontal', lat) {
    return this.meshFactory.metersToModelUnits(meters, axis, lat);
  }

  /**
   * Demo: add a red sphere of 1 km diameter at (lat, lon), resting on the terrain surface.
   * Dimensions are physically correct at that latitude.
   * @param {number} lat
   * @param {number} lon
   * @returns {THREE.Mesh}
   */
  addTestBall(lat, lon) {
    if (!this.scene) throw new Error('Scene not initialized.');
    // Radii in model units
    const radiusMeters = 500; // 1 km diameter
    const radiusHorizUnits = this.metersToModelUnits(radiusMeters, 'horizontal', lat);
    const radiusVertUnits  = this.metersToModelUnits(radiusMeters, 'vertical');

    const p = this.latLonToModelXYZ(lat, lon);

    // Sphere geometry built with horizontal radius; correct Y-scale so it stays a true sphere in meters
    const geom = new THREE.SphereGeometry(radiusHorizUnits, 48, 32);
    const mat  = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.6, metalness: 0.0 });
    const sphere = new THREE.Mesh(geom, mat);
    sphere.name = 'TestBall_1000m';

    const verticalPerMeter   = this.metersToModelUnits(1, 'vertical');
    const horizontalPerMeter = this.metersToModelUnits(1, 'horizontal', lat);
    const yScaleComp = verticalPerMeter / horizontalPerMeter;
    sphere.scale.set(1, yScaleComp, 1);

    sphere.position.set(p.x, p.y + radiusVertUnits, p.z);
    this.scene.add(sphere);
    return sphere;
  }

  // ---------------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------------

  /** Dispose of resources, remove listeners, and clear references. */
  dispose() {
    this.stopAnimation();

    if (this.keyboardControls) { this.keyboardControls.dispose(); this.keyboardControls = null; }
    if (this.overlay2D) { this.overlay2D.dispose(); this.overlay2D = null; }

    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh) this.disposeMesh(child);
      });
      this.scene.clear();
    }

    if (this.renderer) this.renderer.dispose();

    window.removeEventListener('resize', this.handleWindowResize);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.terrainMesh = null;
  }
}

// Export both the class and a convenience function for backward compatibility
export const terrainRenderer = new TerrainRenderer();

/** Backward-compatibility function mirroring prior API. */
export function generateTerrain(...args) {
  return terrainRenderer.generateTerrain(...args);
}
