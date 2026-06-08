import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { X, MapPin, Search } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './StationSelectorModal.module.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockStations = [
  { id: 1, name: 'Marianita',   location: 'Mazapil',     lat: 24.11, lng: -102.09, active: true  },
  { id: 2, name: 'Estación 2',  location: 'Fresnillo',   lat: 23.18, lng: -102.87, active: true  },
  { id: 3, name: 'Estación 3',  location: 'Jerez',       lat: 22.65, lng: -102.99, active: false },
  { id: 4, name: 'Estación 4',  location: 'Sombrerete',  lat: 23.63, lng: -103.64, active: true  },
  { id: 5, name: 'Estación 5',  location: 'Rio Grande',  lat: 23.83, lng: -103.03, active: true  },
];

const StationSelectorModal = ({ isOpen, onClose, onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStations, setFilteredStations] = useState(mockStations);

  useEffect(() => {
    const filtered = mockStations.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStations(filtered);
  }, [searchTerm]);

  const handleConfirmSelection = () => {
    if (selectedStation) {
      onStationSelect(selectedStation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* Encabezado */}
        <div className={styles.modalHeader}>
          <h3>Seleccionar Estación</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Panel izquierdo */}
          <div className={styles.leftPanel}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Buscar estación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.stationList}>
              {filteredStations.map((station) => (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`${styles.stationItem} ${selectedStation?.id === station.id ? styles.stationItemSelected : ''}`}
                >
                  <div className={styles.stationItemRow}>
                    <div>
                      <h6>{station.name}</h6>
                      <p className={styles.descriptiontext}>{station.location}</p>
                    </div>
                    <div className={styles.stationMeta}>
                      <div className={`${styles.statusDot} ${station.active ? styles.statusActive : styles.statusInactive}`} />
                      <MapPin size={16} color="#9ca3af" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirmSelection}
              disabled={!selectedStation}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Seleccionar Estación
            </button>
          </div>

          {/* Panel derecho — mapa */}
          <div className={styles.rightPanel}>
            <MapContainer
              center={[23.5, -102.5]}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredStations.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.lat, station.lng]}
                  eventHandlers={{ click: () => setSelectedStation(station) }}
                >
                  <Popup>
                    <div className={styles.popupContent}>
                      <p className={styles.popupName}>{station.name}</p>
                      <p className={styles.popupLocation}>{station.location}</p>
                      <span className={`${styles.popupBadge} ${station.active ? styles.popupBadgeActive : styles.popupBadgeInactive}`}>
                        <span className={`${styles.popupDot} ${station.active ? styles.statusActive : styles.statusInactive}`} />
                        {station.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationSelectorModal;
