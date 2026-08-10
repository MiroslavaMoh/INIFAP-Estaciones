// One-off data pipeline: converts the raw INEGI/INIFAP potential-zone geojson files
// (UTM13N, up to ~95MB each) into small WGS84 files the browser can fetch on demand.
//
// Usage: node scripts/prepare-potencial-geojson.mjs
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'data');
const OUT_DIR = path.join(ROOT, 'public', 'potencial-geojson');

// id -> source .geojson filename in src/data
const PAIRS = [
  ['ajo-riego', 'ZacAjoOIRiego.geojson'],
  ['avena-temporal', 'ZacAvenaPVTemp.geojson'],
  ['cacahuate-temporal', 'ZacCacahuatePVTemp.geojson'],
  ['canola-temporal', 'ZacCanolaPVTemp.geojson'],
  ['cebada-riego', 'ZacCebadaOIRiego.geojson'],
  ['cebada-temporal', 'ZacCebadaPVTemp.geojson'],
  ['cebolla-riego', 'ZacCebollaOIRiego.geojson'],
  ['chabacano-riego', 'ZacChabacanoRiego.geojson'],
  ['chile-riego', 'ZacChilePVRiego.geojson'],
  ['ciruelo-riego', 'ZacCirueloRiego.geojson'],
  ['durazno-riego', 'ZacDuraznoRiego.geojson'],
  ['durazno-temporal', 'ZacDuraznoTemp.geojson'],
  ['frijol-riego', 'ZacFrijolPVRiego.geojson'],
  ['frijol-temporal', 'ZacFrijolPVTemp.geojson'],
  ['girasol-temporal', 'ZacGirasolPVTemp.geojson'],
  ['guayabo-riego', 'ZacGuayaboRiego.geojson'],
  ['jitomate-riego', 'ZacJitomatePVRiego.geojson'],
  ['maiz-riego', 'ZacMaizPVRiego.geojson'],
  ['maiz-temporal', 'ZacMaizPVTemp.geojson'],
  ['nopal-tunero-riego', 'ZacNopalitoRiego.geojson'],
  ['nopal-tunero-temporal', 'ZacTunaTemp.geojson'],
  ['tomate-riego', 'ZacTomatePVRiego.geojson'],
  ['vid-region-1', 'ZacVidRiegoReg.geojson'],
  ['vid-region-2', 'ZacVidRiegoReg2.geojson'],
  ['vid-region-3', 'ZacVidRiegoReg3.geojson'],
  ['zanahoria-riego', 'ZacZanahoriaPVRiego.geojson'],
];

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const manifest = {};

for (const [id, filename] of PAIRS) {
  const inputPath = path.join(SRC_DIR, filename);
  if (!existsSync(inputPath)) {
    console.warn(`SKIP ${id}: missing ${filename}`);
    continue;
  }
  const outputPath = path.join(OUT_DIR, `${id}.geojson`);
  const inputSizeMb = (statSync(inputPath).size / 1024 / 1024).toFixed(1);
  process.stdout.write(`${id} (${inputSizeMb}MB) ... `);

  const args = [
    `"${inputPath}"`,
    '-proj', 'init=EPSG:32613', 'wgs84',
    '-filter', '"POTENCIAL != null"',
    '-filter-fields', 'POTENCIAL',
    '-dissolve', 'POTENCIAL',
    '-simplify', 'visvalingam', '8%', 'keep-shapes',
    '-clean',
    '-o', 'format=geojson', 'precision=0.00001', 'force', `"${outputPath}"`,
  ];
  const mapshaperBin = path.join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'mapshaper.cmd' : 'mapshaper');
  const result = spawnSync(mapshaperBin, args, { cwd: ROOT, encoding: 'utf-8', shell: true, maxBuffer: 1024 * 1024 * 50 });
  if (result.status !== 0) {
    console.error(`FAILED\n${result.stdout}\n${result.stderr}\n${result.error}`);
    process.exitCode = 1;
    continue;
  }

  const geojson = JSON.parse(readFileSync(outputPath, 'utf-8'));
  const levels = geojson.features.map((f) => f.properties.POTENCIAL).sort();
  const outputSizeKb = Math.round(statSync(outputPath).size / 1024);
  manifest[id] = { levels, sizeKb: outputSizeKb };
  console.log(`${outputSizeKb}KB, levels=${levels.join(',')}`);
}

writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nWrote manifest.json with ${Object.keys(manifest).length} entries`);
