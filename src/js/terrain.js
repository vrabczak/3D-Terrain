// src/js/terrain.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let keyboardControlsInitialized = false;

// Aircraft-style keyboard controls
let keyStates = {};
let movementSpeed = 0.1; // Changed to match HTML default
let rotationSpeed = 0.02;
let isKeyboardControlActive = false;

// Movement vectors
let velocity = new THREE.Vector3();
let cameraDirection = new THREE.Vector3();
let cameraRight = new THREE.Vector3();
let cameraUp = new THREE.Vector3();

export function generateTerrain(demData, textureImageData, heightScaleMultiplier = 1, terrainResolution = 30, adjustedZoomLevel = null, sceneResolution = 1, maxTerrainDimension = 1024, textureDownsample = 1, antialiasing = 'auto') {
  const { width, height, rasters, geoTransform, samplesPerPixel, bbox } = demData;

  // Ochrany proti špatným datům
  if (width < 2 || height < 2) {
    console.error("DEM má neplatné rozměry:", width, height);
    alert("DEM GeoTIFF má příliš malý rozměr (minimálně 2x2 pixelů)");
    return;
  }

  // Pro DEM by měl být samplesPerPixel = 1
  if (samplesPerPixel !== 1) {
    console.error("DEM by měl mít pouze 1 band, má:", samplesPerPixel);
    alert("Nahraný soubor není platný DEM (výškový model)");
    return;
  }

  // DEM data jsou nyní v rasters[0] (první a jediný band)
  const elevationData = rasters[0] || rasters;
  
  if (!elevationData || elevationData.length !== width * height) {
    console.error("DEM data neodpovídají rozměrům:", elevationData?.length, width * height);
    alert("DEM GeoTIFF má neplatná výšková data");
    return;
  }

  // Analýza výškových dat pro lepší škálování
  let minElevation = Infinity;
  let maxElevation = -Infinity;
  let validValues = 0;
  
  for (let i = 0; i < elevationData.length; i++) {
    const value = elevationData[i];
    // Ignoruj NoData hodnoty (často -9999, NaN, nebo extrémní hodnoty)
    if (isFinite(value) && value > -1000 && value < 10000) {
      minElevation = Math.min(minElevation, value);
      maxElevation = Math.max(maxElevation, value);
      validValues++;
    }
  }
  
  console.log(`DEM analýza: min=${minElevation}m, max=${maxElevation}m, platných hodnot=${validValues}/${elevationData.length}`);
  
  if (validValues === 0) {
    alert("DEM neobsahuje platné výškové hodnoty");
    return;
  }

  // Calculate terrain dimensions based on geographic bounds and user-specified resolution
  const [west, south, east, north] = bbox;
  const METERS_PER_DEGREE_LAT = 111000; // Latitude degrees are always ~111km
  
  // Calculate center latitude for longitude scaling
  const centerLat = (north + south) / 2;
  const METERS_PER_DEGREE_LON = 111000 * Math.cos(centerLat * Math.PI / 180); // Longitude degrees vary by latitude
  
  const geographicWidth = Math.abs(east - west) * METERS_PER_DEGREE_LON;
  const geographicHeight = Math.abs(north - south) * METERS_PER_DEGREE_LAT;
  
  // Calculate terrain mesh dimensions based on desired resolution
  const terrainWidth = Math.ceil(geographicWidth / terrainResolution);
  const terrainHeight = Math.ceil(geographicHeight / terrainResolution);
  
  console.log(`Geografické rozměry: ${geographicWidth.toFixed(0)}m x ${geographicHeight.toFixed(0)}m`);
  console.log(`Rozlišení terénu: ${terrainResolution}m -> mřížka ${terrainWidth}x${terrainHeight}`);
  
  // Build high-resolution elevation grid once based on terrainResolution
  const highResPixelX = (east - west) / terrainWidth;
  const highResPixelY = (north - south) / terrainHeight;
  const highResElev = new Float32Array(terrainWidth * terrainHeight);
  for (let r = 0; r < terrainHeight; r++) {
    const lat = north - r * highResPixelY;
    for (let c = 0; c < terrainWidth; c++) {
      const lon = west + c * highResPixelX;
      const e = sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat);
      highResElev[r * terrainWidth + c] = (isFinite(e) && e > -1000 && e < 10000) ? e : 0;
    }
  }

  // Use provided advanced settings instead of deriving from complexity
  console.log(`Pokročilé nastavení: rozlišení scény ${(sceneResolution * 100).toFixed(0)}%, max rozměr ${maxTerrainDimension}, texture downsample ${textureDownsample}x, antialiasing ${antialiasing}`);
  
  let finalTerrainWidth = terrainWidth;
  let finalTerrainHeight = terrainHeight;
  
  if (terrainWidth > maxTerrainDimension || terrainHeight > maxTerrainDimension) {
    const scaleFactor = Math.min(
      maxTerrainDimension / terrainWidth,
      maxTerrainDimension / terrainHeight
    );
    finalTerrainWidth = Math.floor(terrainWidth * scaleFactor);
    finalTerrainHeight = Math.floor(terrainHeight * scaleFactor);
    const actualResolution = Math.max(
      geographicWidth / finalTerrainWidth,
      geographicHeight / finalTerrainHeight
    );
    
    console.log(`Omezuji rozměry terénu na ${finalTerrainWidth}x${finalTerrainHeight} (skutečné rozlišení: ${actualResolution.toFixed(1)}m)`);
  }

  // Determine antialiasing setting
  let useAntialiasing;
  if (antialiasing === 'auto') {
    useAntialiasing = sceneResolution >= 0.75;
  } else {
    useAntialiasing = antialiasing === 'true';
  }

  initThree(sceneResolution, useAntialiasing);

  // Create texture from ImageData with specified downsampling
  const texture = new THREE.CanvasTexture(imageDataToCanvas(downsampleImageData(textureImageData, textureDownsample)));
  
  // Fix texture orientation - enable flipY to correct North-South texture mapping
  texture.flipY = true;
  texture.premultiplyAlpha = false;
  texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  
  // Create high-resolution terrain geometry
  const geometry = new THREE.PlaneGeometry(1, 1, finalTerrainWidth - 1, finalTerrainHeight - 1);
  const positions = geometry.attributes.position.array;

  // Map high-resolution elevation to down-sampled mesh vertices
  const scaleX = terrainWidth / finalTerrainWidth;
  const scaleY = terrainHeight / finalTerrainHeight;
  const smoothThreshold = Math.max(1, (maxElevation - minElevation) * 0.01); // 1 % of elev range (~small noise)
  for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
    const row = Math.floor(j / finalTerrainWidth);
    const col = j % finalTerrainWidth;

    const srcY = row * scaleY;
    const srcX = col * scaleX;
    const y0 = Math.floor(srcY);
    const x0 = Math.floor(srcX);
    const y1 = Math.min(y0 + 1, terrainHeight - 1);
    const x1 = Math.min(x0 + 1, terrainWidth - 1);
    const dy = srcY - y0;
    const dx = srcX - x0;

    const e00 = highResElev[y0 * terrainWidth + x0];
    const e10 = highResElev[y0 * terrainWidth + x1];
    const e01 = highResElev[y1 * terrainWidth + x0];
    const e11 = highResElev[y1 * terrainWidth + x1];

    let elevation;
    const localMin = Math.min(e00, e10, e01, e11);
    const localMax = Math.max(e00, e10, e01, e11);
    if (localMax - localMin < smoothThreshold) {
      // Low local relief → average to smooth small steps
      elevation = (e00 + e10 + e01 + e11) * 0.25;
    } else {
      // Significant relief → preserve detail with bilinear interpolation
      const e0 = e00 * (1 - dx) + e10 * dx;
      const e1 = e01 * (1 - dx) + e11 * dx;
      elevation = e0 * (1 - dy) + e1 * dy;
    }

    positions[i + 2] = (elevation - minElevation) * getHeightScale(geographicWidth, geographicHeight, maxElevation - minElevation, heightScaleMultiplier);
  }

  geometry.computeVertexNormals();

  const material = new THREE.MeshPhongMaterial({ 
    map: texture,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotateX(-Math.PI / 2); // Revert to original rotation
  
  // Scale mesh to match geographic dimensions
  const SCENE_SCALE = 1000;
  const finalScaleX = geographicWidth / SCENE_SCALE;
  const finalScaleY = geographicHeight / SCENE_SCALE;
  
  // Use normal positive scaling for both axes - no flipping needed
  mesh.scale.set(finalScaleX, finalScaleY, 1);
  mesh.position.set(0, 0, 0);
  
  console.log(`3D scéna škálování: ${finalScaleX.toFixed(2)} x ${finalScaleY.toFixed(2)}`);
  
  scene.add(mesh);
  
  // Position camera appropriately
  const maxDimension = Math.max(finalScaleX, finalScaleY);
  const cameraDistance = maxDimension * 2;
  
  camera.position.set(0, cameraDistance * 0.8, cameraDistance * 0.6);
  camera.lookAt(0, 0, 0);
  
  controls.target.set(0, 0, 0);
  controls.update();
  
  console.log(`Kamera pozice: ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}`);
  console.log(`Kamera vzdálenost: ${cameraDistance.toFixed(2)} jednotek`);
}

// Helper function to calculate appropriate height scaling
function getHeightScale(geographicWidth, geographicHeight, elevationRange, heightScaleMultiplier) {
  const SCENE_SCALE = 1000;
  const horizontalScale = Math.max(geographicWidth, geographicHeight) / SCENE_SCALE;
  const baseHeightScale = elevationRange > 0 ? (horizontalScale * 0.01) / elevationRange : 0.001;
  return baseHeightScale * heightScaleMultiplier;
}

// Helper function to sample DEM elevation at geographic coordinates
function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  const [west, south, east, north] = bbox;
  
  // Check if coordinate is within DEM bounds
  if (lon < west || lon > east || lat < south || lat > north) {
    return 0;
  }
  
  // Convert geographic coordinates to pixel coordinates (floating point)
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

function initThree(sceneResolutionScale, useAntialiasing) {
  if (scene) {
    // Clean up existing scene to prevent WebGL conflicts
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      }
    });
    scene.clear();
    
    // Ensure keyboard controls are initialized
    if (!keyboardControlsInitialized) {
      initKeyboardControls();
    }
    return;
  }

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);

  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 10000);
  camera.position.set(0, 100, 100);

  const canvas = document.getElementById('three-canvas');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: useAntialiasing
  });
  
  // Calculate actual render size based on resolution scale
  const renderWidth = Math.floor(window.innerWidth * sceneResolutionScale);
  const renderHeight = Math.floor(window.innerHeight * sceneResolutionScale);
  
  // Set renderer size to the scaled resolution
  renderer.setSize(renderWidth, renderHeight, false);
  
  // Scale canvas to full window size via CSS
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  
  // Adjust pixel ratio for performance
  const pixelRatio = Math.min(window.devicePixelRatio * sceneResolutionScale, 2);
  renderer.setPixelRatio(pixelRatio);
  
  console.log(`Scene resolution: ${renderWidth}x${renderHeight} (${(sceneResolutionScale * 100).toFixed(0)}% scale, antialiasing: ${useAntialiasing})`);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(100, 200, 100);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // Initialize keyboard controls
  initKeyboardControls();

  animate();
}

function initKeyboardControls() {
  keyboardControlsInitialized = true;
  // Initialize speed slider
  const speedSlider = document.getElementById('movementSpeed');
  const speedValue = document.getElementById('speedValue');
  
  if (speedSlider && speedValue) {
    // Update movement speed when slider changes
    speedSlider.addEventListener('input', (event) => {
      movementSpeed = parseFloat(event.target.value);
      speedValue.textContent = movementSpeed.toFixed(3);
    });
    
    // Set initial value
    movementSpeed = parseFloat(speedSlider.value);
    speedValue.textContent = movementSpeed.toFixed(3);
  }

  // Initialize rotation speed slider
  const rotationSpeedSlider = document.getElementById('rotationSpeed');
  const rotationSpeedValue = document.getElementById('rotationSpeedValue');
  
  if (rotationSpeedSlider && rotationSpeedValue) {
    // Update rotation speed when slider changes
    rotationSpeedSlider.addEventListener('input', (event) => {
      rotationSpeed = parseFloat(event.target.value);
      rotationSpeedValue.textContent = rotationSpeed.toFixed(3);
    });
    
    // Set initial value
    rotationSpeed = parseFloat(rotationSpeedSlider.value);
    rotationSpeedValue.textContent = rotationSpeed.toFixed(3);
  }

  // Keyboard event listeners
  document.addEventListener('keydown', (event) => {
    const key = event.code;
    keyStates[key] = true;
    
    // Check if any movement keys are pressed
    const movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyT', 'KeyG'];
    if (movementKeys.includes(key)) {
      isKeyboardControlActive = true;
      controls.enabled = false; // Disable OrbitControls when using keyboard
      event.preventDefault();
    }
  });

  document.addEventListener('keyup', (event) => {
    const key = event.code;
    keyStates[key] = false;
    event.preventDefault();
  });

  // Mouse click event to restore mouse controls
  renderer.domElement.addEventListener('mousedown', (event) => {
    // Don't interfere with hamburger button clicks
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn && (event.target === hamburgerBtn || hamburgerBtn.contains(event.target))) {
      return;
    }
    
    if (isKeyboardControlActive) {
      // Check if no movement keys are currently pressed
      const movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyT', 'KeyG'];
      const anyMovementKeyPressed = movementKeys.some(k => keyStates[k]);
      
      if (!anyMovementKeyPressed) {
        isKeyboardControlActive = false;
        controls.enabled = true; // Re-enable OrbitControls on mouse click
        controls.update();
      }
    }
  });

  // Handle window focus/blur to reset key states
  window.addEventListener('blur', () => {
    keyStates = {};
    isKeyboardControlActive = false;
    controls.enabled = true;
  });
}

function updateKeyboardControls() {
  if (!isKeyboardControlActive) return;

  // Level the camera (set roll to 0) before applying keyboard controls
  // levelCameraRoll(); // Temporarily disabled to fix upside-down issue

  // Reset velocity
  velocity.set(0, 0, 0);

  // Get camera direction vectors AFTER leveling
  camera.getWorldDirection(cameraDirection);
  
  // Calculate horizontal right vector for consistent pitch behavior
  const horizontalForward = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
  const horizontalRight = new THREE.Vector3().crossVectors(horizontalForward, new THREE.Vector3(0, 1, 0)).normalize();
  
  // Use the leveled camera's up vector for yaw
  cameraUp.copy(camera.up);

  // Movement controls (WASD)
  if (keyStates['KeyW']) { // Forward (horizontal movement only)
    // Use horizontal forward direction, ignoring camera pitch
    velocity.add(horizontalForward.clone().multiplyScalar(movementSpeed));
  }
  if (keyStates['KeyS']) { // Backward (horizontal movement only)
    // Use horizontal forward direction, ignoring camera pitch
    velocity.add(horizontalForward.clone().multiplyScalar(-movementSpeed));
  }
  if (keyStates['KeyA']) { // Strafe left
    velocity.add(horizontalRight.clone().multiplyScalar(-movementSpeed));
  }
  if (keyStates['KeyD']) { // Strafe right
    velocity.add(horizontalRight.clone().multiplyScalar(movementSpeed));
  }

  // Apply movement
  camera.position.add(velocity);

  // Hover controls (vertical movement)
  const hoverMovementScale = 0.5;
  if (keyStates['KeyT']) { // Hover up (climb)
    camera.position.y += hoverMovementScale * movementSpeed;
  }
  if (keyStates['KeyG']) { // Hover down (descent)
    camera.position.y -= hoverMovementScale * movementSpeed;
  }

  // Rotation controls using consistent vectors
  if (keyStates['KeyQ']) { // Yaw left (around world Y-axis)
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotationSpeed);
  }
  if (keyStates['KeyE']) { // Yaw right (around world Y-axis)
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -rotationSpeed);
  }
  if (keyStates['KeyR']) { // Pitch up (using horizontal right vector)
    camera.rotateOnWorldAxis(horizontalRight, rotationSpeed);
  }
  if (keyStates['KeyF']) { // Pitch down (using horizontal right vector)
    camera.rotateOnWorldAxis(horizontalRight, -rotationSpeed);
  }
}

function levelCameraRoll() {
  // Get the camera's current forward direction
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  
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
  camera.rotation.setFromRotationMatrix(matrix);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Update keyboard controls
  updateKeyboardControls();
  
  // Update OrbitControls only when keyboard is not active
  if (!isKeyboardControlActive) {
    controls.update();
  }
  
  // Update compass rotation based on camera azimuth
  updateCompassRotation();
  
  renderer.render(scene, camera);
}

/**
 * Update the 2D compass rotation to match the camera's azimuth angle
 */
function updateCompassRotation() {
  const compassElement = document.getElementById('north-arrow');
  if (!compassElement || !controls) return;
  
  // Calculate camera azimuth (horizontal rotation around Y axis)
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  
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
  const compassRose = compassElement.querySelector('.compass-rose');
  if (compassRose) {
    compassRose.style.transform = `rotate(${azimuthDegrees}deg)`;
  }
}

function imageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function downsampleImageData(imageData, factor) {
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
