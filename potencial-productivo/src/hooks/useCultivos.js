import { useEffect, useState } from 'react';
import { CULTIVOS_CATALOG } from '../data/cultivosCatalog';

const metadataModules = import.meta.glob('../data-cultivos/*.json', { eager: true });

const metadataByKey = {};
for (const modulePath in metadataModules) {
  const key = modulePath.match(/([^/]+)\.json$/)[1];
  metadataByKey[key] = metadataModules[modulePath].default ?? metadataModules[modulePath];
}

const POTENCIAL_KEY_MAP = { ALTO: 'alto', MEDIO: 'medio', BAJO: 'bajo' };

// Combines the hand-written catalog, the small cuidados-del-cultivo metadata
// (bundled from src/data-cultivos), and the potential-zone manifest (fetched
// from public/, since the geojson files behind it are too large to bundle).
export function useCultivos() {
  const [cultivos, setCultivos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/potencial-geojson/manifest.json')
      .then((res) => res.json())
      .then((manifest) => {
        if (cancelled) return;

        const list = CULTIVOS_CATALOG.map((entry) => {
          const metadata = entry.metadata ? metadataByKey[entry.metadata] ?? null : null;
          const manifestEntry = manifest[entry.geojson];
          const niveles = (manifestEntry?.levels ?? [])
            .map((level) => POTENCIAL_KEY_MAP[level])
            .filter(Boolean);

          return {
            id: entry.id,
            geojsonKey: entry.geojson,
            name: metadata?.cultivo ?? entry.fallbackName ?? entry.id,
            fullName: metadata?.nombre_cientifico ?? '',
            tipoProduccion: metadata?.tipo_produccion ?? 'Agrícola',
            regimen: entry.regimen,
            niveles,
            metadata,
          };
        });

        setCultivos(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cultivos, error };
}
