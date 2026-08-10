// Links each potential-zone geojson (public/potencial-geojson/<geojson>.geojson)
// to its cultivo metadata file (src/data-cultivos/<metadata>.json), when one exists.
// `regimen` is set explicitly here because the metadata's own `regimen_humedad`
// text isn't a clean "Riego"/"Temporal" value (e.g. "Riego y medio riego").
export const CULTIVOS_CATALOG = [
  { id: 'ajo-riego', geojson: 'ajo-riego', metadata: 'AjoR', regimen: 'Riego' },
  { id: 'avena-temporal', geojson: 'avena-temporal', metadata: 'AvenaT', regimen: 'Temporal' },
  { id: 'cacahuate-temporal', geojson: 'cacahuate-temporal', metadata: 'CacahuateT', regimen: 'Temporal' },
  { id: 'canola-temporal', geojson: 'canola-temporal', metadata: 'CanolaT', regimen: 'Temporal' },
  { id: 'cebada-riego', geojson: 'cebada-riego', metadata: 'CebadaR', regimen: 'Riego' },
  { id: 'cebada-temporal', geojson: 'cebada-temporal', metadata: 'CebadaT', regimen: 'Temporal' },
  { id: 'cebolla-riego', geojson: 'cebolla-riego', metadata: 'CebollaR', regimen: 'Riego' },
  { id: 'chabacano-riego', geojson: 'chabacano-riego', metadata: 'ChabacanoR', regimen: 'Riego' },
  { id: 'chile-riego', geojson: 'chile-riego', metadata: 'ChileR', regimen: 'Riego' },
  { id: 'ciruelo-riego', geojson: 'ciruelo-riego', metadata: 'CirueloR', regimen: 'Riego' },
  { id: 'durazno-riego', geojson: 'durazno-riego', metadata: 'DuraznoR', regimen: 'Riego' },
  { id: 'durazno-temporal', geojson: 'durazno-temporal', metadata: 'DuraznoT', regimen: 'Temporal' },
  { id: 'frijol-riego', geojson: 'frijol-riego', metadata: 'FrijolR', regimen: 'Riego' },
  { id: 'frijol-temporal', geojson: 'frijol-temporal', metadata: 'FrijolT', regimen: 'Temporal' },
  { id: 'girasol-temporal', geojson: 'girasol-temporal', metadata: 'GirasolT', regimen: 'Temporal' },
  { id: 'guayabo-riego', geojson: 'guayabo-riego', metadata: 'GuayaboR', regimen: 'Riego' },
  { id: 'jitomate-riego', geojson: 'jitomate-riego', metadata: 'JitomateR', regimen: 'Riego' },
  { id: 'maiz-riego', geojson: 'maiz-riego', metadata: 'MaizR', regimen: 'Riego' },
  { id: 'maiz-temporal', geojson: 'maiz-temporal', metadata: 'MaizT', regimen: 'Temporal' },
  { id: 'nopal-tunero-riego', geojson: 'nopal-tunero-riego', metadata: 'NopalTuneroR', regimen: 'Riego' },
  { id: 'nopal-tunero-temporal', geojson: 'nopal-tunero-temporal', metadata: 'NopalTuneroT', regimen: 'Temporal' },
  { id: 'vid-region-1', geojson: 'vid-region-1', metadata: 'VidRI', regimen: 'Riego' },
  { id: 'vid-region-2', geojson: 'vid-region-2', metadata: 'VidRII', regimen: 'Riego' },
  { id: 'vid-region-3', geojson: 'vid-region-3', metadata: 'VidRIII', regimen: 'Riego' },

  // Only geojson zones were provided for these two — no cuidados metadata yet.
  { id: 'tomate-riego', geojson: 'tomate-riego', metadata: null, regimen: 'Riego', fallbackName: 'Tomate' },
  { id: 'zanahoria-riego', geojson: 'zanahoria-riego', metadata: null, regimen: 'Riego', fallbackName: 'Zanahoria' },
];
