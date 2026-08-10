import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, GeoJSON, LayerGroup, LayersControl, CircleMarker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapaPotencial.module.css';
import zacatecasOutline from '../data/zacatecasOutline.json';

const POTENCIAL_COLORS = { ALTO: '#038310', MEDIO: '#f0a716', BAJO: '#a81d1d' };

const zoneStyle = (color) => ({
  color,
  weight: 1,
  fillColor: color,
  fillOpacity: 0.55,
});

const featuresByLevel = (geojsonData, level) => ({
  type: 'FeatureCollection',
  features: (geojsonData?.features ?? []).filter((f) => f.properties?.POTENCIAL === level),
});

const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect?.({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const MapaPotencial = ({ className, height = '560px', visibleLevels = { alto: true, medio: true, bajo: true }, onLocationSelect, selectedLocation, geojsonKey }) => {
  const [fetchState, setFetchState] = useState({ key: null, status: 'idle', data: null });

  useEffect(() => {
    if (!geojsonKey) return;

    const controller = new AbortController();
    setFetchState({ key: geojsonKey, status: 'loading', data: null });

    fetch(`/potencial-geojson/${geojsonKey}.geojson`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFetchState({ key: geojsonKey, status: 'ready', data });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setFetchState({ key: geojsonKey, status: 'error', data: null });
      });

    return () => controller.abort();
  }, [geojsonKey]);

  // Derived from geojsonKey rather than stored, so switching back to "no cultivo
  // selected" (or to a different one, before its fetch resolves) never needs a
  // synchronous setState-on-mount just to reset local state.
  const status = !geojsonKey ? 'idle' : fetchState.key === geojsonKey ? fetchState.status : 'loading';
  const geojsonData = fetchState.key === geojsonKey ? fetchState.data : null;

  return (
    <div className={`${styles.mapWrapper} ${className || ''}`} style={{ height, position: 'relative' }}>
      {status !== 'ready' && (
        <div className={styles.mapOverlayMessage}>
          {status === 'idle' && 'Selecciona un cultivo de la lista para ver sus zonas de potencial.'}
          {status === 'loading' && 'Cargando zonas de potencial…'}
          {status === 'error' && 'No se pudieron cargar las zonas de potencial de este cultivo.'}
        </div>
      )}

      <MapContainer
        bounds={zacatecasOutline}
        boundsOptions={{ padding: [4, 4] }}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Polygon
          positions={zacatecasOutline}
          pathOptions={{ color: '#374151', weight: 2, fillOpacity: 0 }}
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />

        {selectedLocation && (
          <CircleMarker
            center={[selectedLocation.lat, selectedLocation.lng]}
            radius={8}
            pathOptions={{ color: '#9F2241', weight: 2, fillColor: '#9F2241', fillOpacity: 0.6 }}
          />
        )}

        {geojsonData && (
          <LayersControl position="topright">
            <LayersControl.Overlay name="Bajo" checked={visibleLevels.bajo}>
              <LayerGroup>
                <GeoJSON data={featuresByLevel(geojsonData, 'BAJO')} style={() => zoneStyle(POTENCIAL_COLORS.BAJO)} />
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Medio" checked={visibleLevels.medio}>
              <LayerGroup>
                <GeoJSON data={featuresByLevel(geojsonData, 'MEDIO')} style={() => zoneStyle(POTENCIAL_COLORS.MEDIO)} />
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Alto" checked={visibleLevels.alto}>
              <LayerGroup>
                <GeoJSON data={featuresByLevel(geojsonData, 'ALTO')} style={() => zoneStyle(POTENCIAL_COLORS.ALTO)} />
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        )}
      </MapContainer>
    </div>
  );
};

export default MapaPotencial;
