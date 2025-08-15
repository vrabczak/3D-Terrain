// src/js/terrain.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KeyboardControls } from './controls/KeyboardControls.js';
import { Overlay2D } from './overlays/Overlay2D.js';

/**
 * Modern TerrainRenderer class for 3D terrain visualization
 * Handles Three.js scene setup, terrain generation, and rendering
 */
export class TerrainRenderer {
  constructor() {
    // Three.js core objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Control and overlay systems
    this.keyboardControls = null;
    this.overlay2D = null;
    
    // Animation state
    this.animationId = null;
    this.isAnimating = false;
    
    // Bind methods to preserve 'this' context
    this.animate = this.animate.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }
  
  /**
   * Generate and display 3D terrain from DEM and texture data
   */
  async generateTerrain(demData, textureImageData, heightScaleMultiplier = 1, terrainResolution = 30, adjustedZoomLevel = null, sceneResolution = 1, maxTerrainDimension = 1024, textureDownsample = 1, antialiasing = 'auto') {
    try {
      // Validate input data
      this.validateDEMData(demData);
      
      const { width, height, rasters, geoTransform, samplesPerPixel, bbox } = demData;
      const elevationData = rasters[0] || rasters;
      
      // Analyze elevation data
      const elevationStats = this.analyzeElevationData(elevationData);
      console.log(`DEM analýza: min=${elevationStats.min}m, max=${elevationStats.max}m, platných hodnot=${elevationStats.validCount}/${elevationData.length}`);
      
      // Calculate terrain dimensions
      const terrainDimensions = this.calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension);
      console.log(`Geografické rozměry: ${terrainDimensions.realWorldWidth.toFixed(0)}m x ${terrainDimensions.realWorldHeight.toFixed(0)}m`);
      console.log(`Rozlišení terénu: ${terrainResolution}m -> mřížka ${terrainDimensions.terrainWidth}x${terrainDimensions.terrainHeight}`);
      console.log(`Mesh rozměry: ${terrainDimensions.meshWidth}x${terrainDimensions.meshHeight} (omezeno ${maxTerrainDimension})`);
      
      // Check if DEM data is already resampled to tile bounds
      // If the DEM dimensions match or are close to the texture dimensions, use it directly
      const isPreResampled = textureImageData && 
        Math.abs(width - textureImageData.width) < 100 && 
        Math.abs(height - textureImageData.height) < 100;
      
      let highResElev;
      if (isPreResampled) {
        console.log('Using pre-resampled DEM data directly');
        // Use the resampled DEM data directly, but resize to match terrain dimensions
        highResElev = this.resizeElevationGrid(elevationData, width, height, terrainDimensions);
      } else {
        console.log('Building high-resolution elevation grid from original DEM');
        // Build high-resolution elevation grid by sampling from original DEM
        highResElev = this.buildHighResolutionElevationGrid(elevationData, width, height, geoTransform, bbox, terrainDimensions);
      }
      
      console.log(`Built high-res elevation grid: ${highResElev.length} values`);
      
      // Sample a few values for debugging
      const sampleIndices = [0, Math.floor(highResElev.length * 0.25), Math.floor(highResElev.length * 0.5), Math.floor(highResElev.length * 0.75), highResElev.length - 1];
      const samples = sampleIndices.map(i => highResElev[i]);
      console.log(`Sample high-res elevations:`, samples);
      
      console.log('About to create terrain geometry...');
      
      // Create terrain geometry
      const geometry = this.createTerrainGeometry(terrainDimensions, highResElev, elevationStats, heightScaleMultiplier);
      console.log('Terrain geometry created successfully');
      
      // Create terrain texture
      const texture = this.createTerrainTexture(textureImageData, textureDownsample);
      
      // Initialize Three.js scene
      this.initThreeJS(antialiasing);
      
      // Create and add terrain mesh
      const terrainMesh = this.createTerrainMesh(geometry, texture, terrainDimensions);
      this.scene.add(terrainMesh);
      
      // Add lighting
      this.setupLighting();
      
      // Initialize controls and overlays
      this.initControlsAndOverlays();
      
      // Position camera
      this.positionCamera(terrainDimensions);
      
      // Start animation loop
      this.startAnimation();
      
      console.log("Terén úspěšně vygenerován!");
      
    } catch (error) {
      console.error("Chyba při generování terénu:", error);
      throw error;
    }
  }
  
  /**
   * Validate DEM data structure and dimensions
   */
  validateDEMData(demData) {
    const { width, height, samplesPerPixel, rasters } = demData;
    
    if (width < 2 || height < 2) {
      throw new Error("DEM má neplatné rozměry: minimálně 2x2 pixelů");
    }
    
    if (samplesPerPixel !== 1) {
      throw new Error("Nahraný soubor není platný DEM (výškový model)");
    }
    
    // Validate elevation data array
    const elevationData = rasters[0] || rasters;
    if (!elevationData || elevationData.length !== width * height) {
      throw new Error("DEM GeoTIFF má neplatná výšková data");
    }
  }
  
  /**
   * Analyze elevation data for statistics
   */
  analyzeElevationData(elevationData) {
    let minElevation = Infinity;
    let maxElevation = -Infinity;
    let validCount = 0;
    
    for (let i = 0; i < elevationData.length; i++) {
      const value = elevationData[i];
      // Ignore NoData values (often -9999, NaN, or extreme values)
      if (isFinite(value) && value > -1000 && value < 10000) {
        minElevation = Math.min(minElevation, value);
        maxElevation = Math.max(maxElevation, value);
        validCount++;
      }
    }
    
    return {
      min: minElevation,
      max: maxElevation,
      validCount: validCount,
      range: maxElevation - minElevation
    };
  }
  
  /**
   * Calculate terrain dimensions based on geographic bounds and resolution
   */
  calculateTerrainDimensions(bbox, terrainResolution, maxTerrainDimension) {
    const [west, south, east, north] = bbox;
    const METERS_PER_DEGREE_LAT = 111000;
    
    // Calculate center latitude for longitude scaling
    const centerLat = (north + south) / 2;
    const METERS_PER_DEGREE_LON = 111000 * Math.cos(centerLat * Math.PI / 180);
    
    const geographicWidth = Math.abs(east - west) * METERS_PER_DEGREE_LON;
    const geographicHeight = Math.abs(north - south) * METERS_PER_DEGREE_LAT;
    
    // Calculate terrain mesh dimensions based on desired resolution
    const terrainWidth = Math.ceil(geographicWidth / terrainResolution);
    const terrainHeight = Math.ceil(geographicHeight / terrainResolution);
    
    // Limit mesh dimensions based on maxTerrainDimension
    const meshWidth = Math.min(terrainWidth, maxTerrainDimension);
    const meshHeight = Math.min(terrainHeight, maxTerrainDimension);
    
    return {
      realWorldWidth: geographicWidth,
      realWorldHeight: geographicHeight,
      terrainWidth,
      terrainHeight,
      meshWidth,
      meshHeight
    };
  }
  
  /**
   * Build high-resolution elevation grid
   */
  buildHighResolutionElevationGrid(elevationData, width, height, geoTransform, bbox, dimensions) {
    const [west, south, east, north] = bbox;
    const { terrainWidth, terrainHeight } = dimensions;
    
    const highResPixelX = (east - west) / terrainWidth;
    const highResPixelY = (north - south) / terrainHeight;
    const highResElev = new Float32Array(terrainWidth * terrainHeight);
    
    for (let r = 0; r < terrainHeight; r++) {
      const lat = north - r * highResPixelY;
      for (let c = 0; c < terrainWidth; c++) {
        const lon = west + c * highResPixelX;
        const elevation = this.sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat);
        highResElev[r * terrainWidth + c] = elevation;
      }
    }
    
    return highResElev;
  }
  
  /**
   * Resize elevation grid to match terrain dimensions
   */
  resizeElevationGrid(elevationData, width, height, dimensions) {
    const { terrainWidth, terrainHeight } = dimensions;
    
    const resizedElev = new Float32Array(terrainWidth * terrainHeight);
    
    for (let r = 0; r < terrainHeight; r++) {
      for (let c = 0; c < terrainWidth; c++) {
        const sourceX = Math.floor(c * width / terrainWidth);
        const sourceY = Math.floor(r * height / terrainHeight);
        const sourceIndex = sourceY * width + sourceX;
        const targetIndex = r * terrainWidth + c;
        resizedElev[targetIndex] = elevationData[sourceIndex];
      }
    }
    
    return resizedElev;
  }
  
  /**
   * Create terrain geometry with elevation data
   */
  createTerrainGeometry(dimensions, highResElev, elevationStats, heightScaleMultiplier) {
    const { realWorldWidth, realWorldHeight, meshWidth, meshHeight, terrainWidth, terrainHeight } = dimensions;
    
    const geometry = new THREE.PlaneGeometry(realWorldWidth, realWorldHeight, meshWidth - 1, meshHeight - 1);
    const vertices = geometry.attributes.position.array;
    
    const heightScale = this.calculateHeightScale(realWorldWidth, realWorldHeight, elevationStats.range, heightScaleMultiplier);
    
    // Map high-resolution elevation data to mesh vertices
    for (let r = 0; r < meshHeight; r++) {
      for (let c = 0; c < meshWidth; c++) {
        // Calculate corresponding position in high-res data
        const highResR = Math.floor((r / (meshHeight - 1)) * (terrainHeight - 1));
        const highResC = Math.floor((c / (meshWidth - 1)) * (terrainWidth - 1));
        
        const elevation = highResElev[highResR * terrainWidth + highResC];
        const vertexIndex = r * meshWidth + c;
        
        // Set the Z coordinate (height)
        if (isFinite(elevation)) {
          vertices[vertexIndex * 3 + 2] = (elevation - elevationStats.min) * heightScale;
        } else {
          vertices[vertexIndex * 3 + 2] = 0; // Default height for invalid data
        }
      }
    }
    
    // Update geometry after modifying vertices
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    return geometry;
  }
  
  /**
   * Create terrain texture from image data
   */
  createTerrainTexture(textureImageData, textureDownsample) {
    if (textureImageData) {
      // Downsample texture if requested
      let finalImageData = textureImageData;
      if (textureDownsample > 1) {
        finalImageData = this.downsampleImageData(textureImageData, textureDownsample);
      }
      
      const canvas = this.imageDataToCanvas(finalImageData);
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    } else {
      // Default texture if no OSM tiles
      const texture = new THREE.Texture();
      texture.image = { width: 1, height: 1, data: new Uint8Array([128, 128, 128, 255]) };
      texture.needsUpdate = true;
      return texture;
    }
  }
  
  /**
   * Create terrain mesh with geometry and texture
   */
  createTerrainMesh(geometry, texture, dimensions) {
    const material = new THREE.MeshLambertMaterial({ 
      map: texture,
      side: THREE.DoubleSide
    });
    
    const terrainMesh = new THREE.Mesh(geometry, material);
    terrainMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    // Remove the X-axis flip that was causing west-east mirroring
    // terrainMesh.scale.x = -1; // Flip X to match geographic orientation
    
    return terrainMesh;
  }
  
  /**
   * Initialize Three.js scene, camera, and renderer
   */
  initThreeJS(antialiasing) {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
    
    // Create camera
    const canvas = document.getElementById('three-canvas');
    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000);
    
    // Determine antialiasing setting
    let antialias = false;
    if (antialiasing === 'auto') {
      antialias = window.devicePixelRatio <= 2;
    } else if (antialiasing === 'true' || antialiasing === true) {
      antialias = true;
    }
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: antialias
    });
    
    // Set size based on resolution scale
    const width = Math.floor(canvas.clientWidth);
    const height = Math.floor(canvas.clientHeight);
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enable shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Create orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50000;
    this.controls.maxPolarAngle = Math.PI;
    
    // Handle window resize
    window.addEventListener('resize', this.handleWindowResize);
  }
  
  /**
   * Setup lighting for the scene
   */
  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }
  
  /**
   * Initialize keyboard controls and 2D overlays
   */
  initControlsAndOverlays() {
    // Initialize keyboard controls
    this.keyboardControls = new KeyboardControls(this.camera, this.controls, this.renderer);
    this.keyboardControls.init();
    
    // Initialize 2D overlay system
    this.overlay2D = new Overlay2D(this.camera, this.keyboardControls);
    this.overlay2D.init();
    this.overlay2D.show();
    
    // Set up communication between controls and overlays
    this.overlay2D.setSpeedChangeCallback((type, value) => {
      if (type === 'movement') {
        this.keyboardControls.setMovementSpeed(value);
      } else if (type === 'rotation') {
        this.keyboardControls.setRotationSpeed(value);
      }
    });
    
    // Sync initial speed values
    this.keyboardControls.setMovementSpeed(this.overlay2D.getMovementSpeed());
    this.keyboardControls.setRotationSpeed(this.overlay2D.getRotationSpeed());
  }
  
  /**
   * Position camera appropriately for the terrain
   */
  positionCamera(dimensions) {
    const maxDimension = Math.max(dimensions.realWorldWidth, dimensions.realWorldHeight);
    this.camera.position.set(0, maxDimension * 0.5, maxDimension * 0.3);
    this.camera.lookAt(0, 0, 0);
  }
  
  /**
   * Start the animation loop
   */
  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }
  
  /**
   * Stop the animation loop
   */
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isAnimating = false;
  }
  
  /**
   * Animation loop
   */
  animate() {
    if (!this.isAnimating) return;
    
    this.animationId = requestAnimationFrame(this.animate);
    
    // Update keyboard controls
    if (this.keyboardControls) {
      this.keyboardControls.update();
    }
    
    // Update OrbitControls only when keyboard is not active
    if (this.controls && (!this.keyboardControls || !this.keyboardControls.isKeyboardActive())) {
      this.controls.update();
    }
    
    // Update 2D overlays (compass rotation, etc.)
    if (this.overlay2D) {
      this.overlay2D.update();
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Handle window resize events
   */
  handleWindowResize() {
    if (!this.camera || !this.renderer) return;
    
    const canvas = document.getElementById('three-canvas');
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }
  
  /**
   * Calculate appropriate height scaling
   */
  calculateHeightScale(geographicWidth, geographicHeight, elevationRange, heightScaleMultiplier) {
    // Ensure we don't divide by zero
    if (elevationRange <= 0) {
      console.warn("Elevation range is zero or negative, using default scaling");
      return heightScaleMultiplier; // Use the multiplier directly
    }
    
    // Use the heightScaleMultiplier directly as the scaling factor
    // This makes "2x" in the UI actually mean 2x elevation scaling
    const finalScale = heightScaleMultiplier;
    
    console.log(`Height scale details: terrainSize=${Math.max(geographicWidth, geographicHeight)}, elevationRange=${elevationRange}, heightScaleMultiplier=${heightScaleMultiplier}, finalScale=${finalScale}`);
    
    return finalScale;
  }
  
  /**
   * Sample DEM elevation at geographic coordinates
   */
  sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
    const [west, south, east, north] = bbox;
    
    // Check if coordinate is within DEM bounds
    if (lon < west || lon > east || lat < south || lat > north) {
      return 0;
    }
    
    // Convert geographic coordinates to pixel coordinates using geoTransform
    const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
    const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
    
    // Bilinear interpolation in source DEM raster
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, width - 1);
    const y1 = Math.min(y0 + 1, height - 1);
    const dx = x - x0;
    const dy = y - y0;

    const getSafe = (c, r) => {
      if (c < 0 || c >= width || r < 0 || r >= height) return 0;
      const val = elevationData[r * width + c];
      return (isFinite(val) && val > -1000 && val < 10000) ? val : 0;
    };

    const e00 = getSafe(x0, y0);
    const e10 = getSafe(x1, y0);
    const e01 = getSafe(x0, y1);
    const e11 = getSafe(x1, y1);

    const e0 = e00 * (1 - dx) + e10 * dx;
    const e1 = e01 * (1 - dx) + e11 * dx;
    const elevation = e0 * (1 - dy) + e1 * dy;

    return elevation;
  }
  
  /**
   * Convert ImageData to Canvas
   */
  imageDataToCanvas(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
  
  /**
   * Downsample ImageData by a given factor
   */
  downsampleImageData(imageData, factor) {
    const newWidth = Math.floor(imageData.width / factor);
    const newHeight = Math.floor(imageData.height / factor);
    const newImageData = new ImageData(newWidth, newHeight);

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const sourceX = Math.floor(x * factor);
        const sourceY = Math.floor(y * factor);
        const sourceIndex = (sourceY * imageData.width * 4) + (sourceX * 4);
        const targetIndex = (y * newWidth * 4) + (x * 4);
        newImageData.data[targetIndex] = imageData.data[sourceIndex];
        newImageData.data[targetIndex + 1] = imageData.data[sourceIndex + 1];
        newImageData.data[targetIndex + 2] = imageData.data[sourceIndex + 2];
        newImageData.data[targetIndex + 3] = imageData.data[sourceIndex + 3];
      }
    }

    return newImageData;
  }
  
  /**
   * Dispose of resources and cleanup
   */
  dispose() {
    // Stop animation
    this.stopAnimation();
    
    // Dispose of controls and overlays
    if (this.keyboardControls) {
      this.keyboardControls.dispose();
      this.keyboardControls = null;
    }
    
    if (this.overlay2D) {
      this.overlay2D.dispose();
      this.overlay2D = null;
    }
    
    // Dispose of Three.js objects
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });
      this.scene.clear();
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.handleWindowResize);
    
    // Clear references
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
  }
}

// Export both the class and a convenience function for backward compatibility
export const terrainRenderer = new TerrainRenderer();

// Backward compatibility function
export function generateTerrain(...args) {
  return terrainRenderer.generateTerrain(...args);
}
