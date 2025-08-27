// src/js/obstacles.js
import * as THREE from 'three';

/**
 * ObstaclesManager: render red cylinders (Ø 200 m) on terrain.
 * - Accepts plain obstacle objects: { lat, lon, heightMeters, props }
 * - Uses host-provided helpers from terrain.js:
 *    - latLonToModelXYZ(lat, lon) -> { x, y, z }
 *    - metersToModelUnits(meters) -> number
 *    - getHeightScaleMultiplier() -> number
 */
export class ObstaclesManager {
  /**
   * @param {Object} opts
   * @param {THREE.Scene} opts.scene
   * @param {(lat:number, lon:number)=>{x:number,y:number,z:number}} opts.latLonToModelXYZ
   * @param {(m:number)=>number} opts.metersToModelUnits
   * @param {()=>number} opts.getHeightScaleMultiplier
   */
  constructor({ scene, latLonToModelXYZ, metersToModelUnits, getHeightScaleMultiplier }) {
    this.scene = scene;
    this.latLonToModelXYZ = latLonToModelXYZ;
    this.metersToModelUnits = metersToModelUnits;
    this.getHeightScaleMultiplier = getHeightScaleMultiplier;

    this.group = null;
    this._material = null;
    this._unitGeometry = null; // Cylinder radius=1 height=1, scaled per instance
    this._radiusModelUnits = null; // metersToModelUnits(100)
  }

  /** Call once after scene exists. */
  init() {
    if (!this.scene) throw new Error('ObstaclesManager requires a scene');

    this.group = new THREE.Group();
    this.group.name = 'ObstaclesGroup';
    this.scene.add(this.group);

    this._material = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      roughness: 0.8,
      metalness: 0.1
    });

    this._unitGeometry = new THREE.CylinderGeometry(1, 1, 1, 16, 1, false);
    this._unitGeometry.computeBoundingBox();
    this._unitGeometry.computeBoundingSphere();

    this._radiusModelUnits = this.metersToModelUnits(25); // 200 m diameter → 100 m radius
  }

  /** Remove existing meshes (keeps group/material/geometry). */
  clear() {
    if (!this.group) return;
    for (let i = this.group.children.length - 1; i >= 0; i--) {
      const child = this.group.children[i];
      this.group.remove(child);
    }
  }

  /**
   * Render the given obstacles array (replaces previous).
   * @param {Array<{lat:number, lon:number, heightMeters:number, props:Object}>} obstacles
   */
  renderObstacles(obstacles) {
    if (!this.group) this.init();
    this.clear();

    if (!Array.isArray(obstacles) || obstacles.length === 0) return;

    const mul = Number(this.getHeightScaleMultiplier?.() ?? 1);

    for (const o of obstacles) {
      // Convert height to model units with current terrain exaggeration
      const hModel = this.metersToModelUnits(o.heightMeters) * mul;

      const p = this.latLonToModelXYZ(o.lat, o.lon);
      if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z)) continue;

      const mesh = new THREE.Mesh(this._unitGeometry, this._material);
      mesh.name = 'ObstacleCylinder';

      // X/Z radius fixed; Y equals height
      mesh.scale.set(this._radiusModelUnits, hModel, this._radiusModelUnits);

      // Base sits on terrain → raise by half
      mesh.position.set(p.x, p.y + hModel * 0.5, p.z);

      mesh.castShadow = true;
      mesh.receiveShadow = false;
      mesh.userData = { kind: 'obstacle', ...o, heightModelUnits: hModel };

      this.group.add(mesh);
    }
  }
}
