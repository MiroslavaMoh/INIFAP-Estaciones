import { MapContainer, TileLayer, Polygon, LayerGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapaPotencial.module.css';
import zacatecasOutline from '../data/zacatecasOutline.json';

// Zonas de potencial agrícola (datos ilustrativos, no un levantamiento real).
const potentialZones = {
  alto: [
    [[23.198, -102.764], [23.336, -102.804], [23.261, -102.964], [23.153, -103.031], [23.025, -102.941], [23.076, -102.781]],
    [[22.793, -102.439], [22.883, -102.521], [22.814, -102.675], [22.696, -102.633], [22.692, -102.498]],
    [[22.735, -102.223], [22.793, -102.286], [22.757, -102.395], [22.665, -102.361], [22.63, -102.259]],
    [[22.226, -101.949], [22.273, -102.01], [22.287, -102.115], [22.197, -102.194], [22.091, -102.092], [22.129, -101.977]],
    [[23.85, -102.925], [23.918, -103.005], [23.881, -103.111], [23.767, -103.091], [23.769, -102.985]],
  ],
  medio: [
    [[22.669, -102.854], [22.772, -102.942], [22.74, -103.087], [22.647, -103.128], [22.537, -103.034], [22.535, -102.891]],
    [[22.856, -103.019], [22.966, -103.082], [22.889, -103.165], [22.774, -103.175], [22.755, -103.046]],
    [[23.588, -103.126], [23.653, -103.212], [23.619, -103.316], [23.506, -103.332], [23.449, -103.171]],
    [[22.462, -101.95], [22.537, -102.035], [22.499, -102.135], [22.398, -102.102], [22.356, -101.98]],
    [[22.367, -101.641], [22.46, -101.729], [22.42, -101.856], [22.286, -101.813], [22.268, -101.715]],
    [[21.919, -103.042], [22.011, -103.112], [21.975, -103.209], [21.865, -103.281], [21.765, -103.225], [21.828, -103.088]],
    [[21.419, -102.847], [21.493, -102.934], [21.473, -103.068], [21.324, -103.047], [21.284, -102.898]],
  ],
  bajo: [
    [[24.639, -101.289], [24.749, -101.383], [24.764, -101.575], [24.584, -101.598], [24.459, -101.523], [24.504, -101.366]],
    [[24.32, -101.835], [24.401, -101.922], [24.374, -102.093], [24.207, -102.057], [24.221, -101.898]],
    [[22.773, -103.445], [22.88, -103.535], [22.823, -103.65], [22.662, -103.669], [22.693, -103.496]],
    [[22.312, -101.471], [22.372, -101.582], [22.334, -101.674], [22.239, -101.678], [22.209, -101.534]],
    [[23.49, -103.729], [23.576, -103.833], [23.509, -103.921], [23.406, -103.924], [23.394, -103.813]],
  ],
};

const zoneStyle = (color) => ({
  color,
  weight: 1,
  fillColor: color,
  fillOpacity: 0.55,
});

const MapaPotencial = ({ className, height = '560px', visibleLevels = { alto: true, medio: true, bajo: true } }) => {
  return (
    <div className={`${styles.mapWrapper} ${className || ''}`} style={{ height }}>
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

        <LayersControl position="topright">
          <LayersControl.Overlay name="Bajo" checked={visibleLevels.bajo}>
            <LayerGroup>
              {potentialZones.bajo.map((positions, i) => (
                <Polygon key={i} positions={positions} pathOptions={zoneStyle('#a81d1d')} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Medio" checked={visibleLevels.medio}>
            <LayerGroup>
              {potentialZones.medio.map((positions, i) => (
                <Polygon key={i} positions={positions} pathOptions={zoneStyle('#f0a716')} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Alto" checked={visibleLevels.alto}>
            <LayerGroup>
              {potentialZones.alto.map((positions, i) => (
                <Polygon key={i} positions={positions} pathOptions={zoneStyle('#038310')} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapaPotencial;
