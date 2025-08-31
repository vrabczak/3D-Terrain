// src/js/obstacles-loader.js
import shp from 'shpjs';

/**
 * Read a zipped Shapefile (File or ArrayBuffer) and return a simple obstacles array.
 * Each obstacle: { lat, lon, heightMeters, props }
 *
 * - Expects Point or MultiPoint geometries in WGS84 (EPSG:4326).
 * - PREVYSENI is the primary height field (meters). A few fallbacks included.
 *
 * @param {File|ArrayBuffer|Uint8Array} zipInput
 * @returns {Promise<Array<{lat:number, lon:number, heightMeters:number, props:Object}>>}
 */
export async function loadObstaclesFromZip(zipInput) {
  const arrayBuffer = zipInput instanceof ArrayBuffer
    ? zipInput
    : (zipInput?.arrayBuffer ? await zipInput.arrayBuffer() : zipInput);

  const geo = await shp(arrayBuffer); // FeatureCollection or {layer: FC, ...} or Array<FC>
  const features = collectFeatures(geo);

  const out = [];
  for (const f of features) {
    if (!f || !f.geometry) continue;
    const props = f.properties || {};
    const h = readHeightMeters(props);
    if (!(h > 0)) continue;

    const g = f.geometry;
    if (g.type === 'Point') {
      const [lon, lat] = g.coordinates;
      pushIfValid(out, lat, lon, h, props);
    } else if (g.type === 'MultiPoint') {
      for (const c of g.coordinates) {
        const [lon, lat] = c;
        pushIfValid(out, lat, lon, h, props);
      }
    }
  }
  return out;
}

// ---- helpers ----
function collectFeatures(geo) {
  const out = [];
  const pushFC = (fc) => {
    if (fc && fc.type === 'FeatureCollection' && Array.isArray(fc.features)) {
      out.push(...fc.features);
    }
  };
  if (!geo) return out;

  if (Array.isArray(geo)) geo.forEach(pushFC);
  else if (geo.type === 'FeatureCollection') pushFC(geo);
  else if (typeof geo === 'object') Object.values(geo).forEach(pushFC);

  return out;
}

function readHeightMeters(props) {
  const keys = Object.keys(props || {});
  const wanted = ['PREVYSENI'];
  for (const label of wanted) {
    const k = keys.find(x => x.toLowerCase() === label.toLowerCase());
    if (k) {
      const v = Number(props[k]);
      if (Number.isFinite(v)) return v;
    }
  }
  return undefined;
}

function pushIfValid(arr, lat, lon, heightMeters, props) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  arr.push({ lat, lon, heightMeters, props });
}
