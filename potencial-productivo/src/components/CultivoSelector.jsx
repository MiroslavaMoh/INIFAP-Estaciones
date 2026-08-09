import React, { useState, useMemo } from 'react';
import { MapPin, Search, RotateCcw, Map as MapIcon, Sprout, Clock } from 'lucide-react';
import styles from './CultivoSelector.module.css';
import MapaPotencial from './MapaPotencial';
import CuidadoCultivo from './CuidadoCultivo';

const mockCultivos = [
  { id: 1, name: 'Ajo',    fullName: 'Allium sativum, L.',              lat: 24.11, lng: -102.09, active: true,  ciclo: 'Otoño/Primavera', riego: 'Riego',    potencial: 'alto'  },
  { id: 2, name: 'Frijol', fullName: 'Phaseolus vulgaris, L.',          lat: 23.18, lng: -102.87, active: true,  ciclo: 'Primavera/Verano', riego: 'Temporal', potencial: 'medio' },
  { id: 3, name: 'Maiz',   fullName: 'Zea mays, L.',                    lat: 22.65, lng: -102.99, active: false, ciclo: 'Primavera/Verano', riego: 'Temporal', potencial: 'bajo'  },
  { id: 4, name: 'Sorgo',  fullName: 'Sorghum bicolor, (L.) Moench',    lat: 23.63, lng: -103.64, active: true,  ciclo: 'Primavera/Verano', riego: 'Riego',    potencial: 'medio' },
  { id: 5, name: 'Trigo',  fullName: 'Triticum aestivum, L.',           lat: 23.83, lng: -103.03, active: true,  ciclo: 'Otoño/Primavera', riego: 'Riego',    potencial: 'alto'  },
];

const CICLO_OPTIONS = ['Todos', 'Otoño/Primavera', 'Primavera/Verano'];
const RIEGO_OPTIONS = ['Todos', 'Riego', 'Temporal'];
const POTENCIAL_COLORS = { alto: '#038310', medio: '#f0a716', bajo: '#a81d1d' };
const POTENCIAL_LABELS = { alto: 'Alto', medio: 'Medio', bajo: 'Bajo' };
const DEFAULT_POTENCIAL = { alto: true, medio: true, bajo: false };

const CultivoSelector = ({ onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtros en edición (panel izquierdo) — se aplican al pulsar "Actualizar mapa".
  const [ciclo, setCiclo] = useState('Todos');
  const [riego, setRiego] = useState('Todos');
  const [potencial, setPotencial] = useState(DEFAULT_POTENCIAL);

  const [appliedFilters, setAppliedFilters] = useState({
    ciclo: 'Todos',
    riego: 'Todos',
    potencial: DEFAULT_POTENCIAL,
  });

  // Fuerza el remonte de MapaPotencial (recentra y aplica capas) al pulsar los botones de acción.
  const [mapKey, setMapKey] = useState(0);

  // Pestaña activa del panel derecho: 'mapa' o 'cuidados'.
  const [activeTab, setActiveTab] = useState('mapa');

  const filteredStations = useMemo(() => {
    return mockCultivos.filter((c) => {
      const matchesSearch =
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCiclo = appliedFilters.ciclo === 'Todos' || c.ciclo === appliedFilters.ciclo;
      const matchesRiego = appliedFilters.riego === 'Todos' || c.riego === appliedFilters.riego;
      const matchesPotencial = appliedFilters.potencial[c.potencial];
      return matchesSearch && matchesCiclo && matchesRiego && matchesPotencial;
    });
  }, [searchTerm, appliedFilters]);

  const handleTogglePotencial = (key) => {
    setPotencial((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdateMap = () => {
    setAppliedFilters({ ciclo, riego, potencial });
    setMapKey((k) => k + 1);
  };

  const handleCenterZacatecas = () => {
    setMapKey((k) => k + 1);
  };

  const handleConfirmSelection = () => {
    if (selectedStation) {
      onStationSelect(selectedStation);
    }
  };

  return (
    
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderRow}>
          <div>
            <div className={styles.timeTag}>
              <MapPin size={18} color="#9F2241" />
              <span>Estado Zacatecas</span>
            </div>
            <h3>Seleccionar Cultivo</h3>
            {selectedStation && (
              <div className={styles.selectedInfo}>
                <h2 className={styles.selectedName}>{selectedStation.name}</h2>
                <p className={styles.selectedScientific}>{selectedStation.fullName}</p>
              </div>
            )}
          </div>

          <div className={styles.updateBox}>
            <Clock size={24} color="#9ca3af" />
            <div>
              <p className={styles.updateLabel}>Última actualización:</p>
              <p className={styles.updateValue}>28 de Abril del 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Panel izquierdo */}
        <div className={styles.leftPanel}>
          <h4 className={styles.filtersTitle}>Filtros</h4>

          <div className={styles.filterGrid}>
            <div className={styles.filterField}>
              <label className={styles.filterLabel}>Producción</label>
              <select
                className={styles.filterSelect}
                value={ciclo}
                onChange={(e) => setCiclo(e.target.value)}
              >
                {CICLO_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterField}>
              <label className={styles.filterLabel}>Riego</label>
              <select
                className={styles.filterSelect}
                value={riego}
                onChange={(e) => setRiego(e.target.value)}
              >
                {RIEGO_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.filterField}>
            <label className={styles.filterLabel}>Cultivo</label>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Buscar cultivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.potencialBlock}>
            <p className={styles.filterLabel}>Filtro por potencial</p>
            <div className={styles.potencialList}>
              {['alto', 'medio', 'bajo'].map((key) => (
                <label key={key} className={styles.potencialOption}>
                  <input
                    type="checkbox"
                    checked={potencial[key]}
                    onChange={() => handleTogglePotencial(key)}
                    className={styles.potencialCheckbox}
                  />
                  <span
                    className={styles.potencialBadge}
                    style={{ backgroundColor: POTENCIAL_COLORS[key] }}
                  >
                    {POTENCIAL_LABELS[key]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" className={styles.updateMapBtn} onClick={handleUpdateMap}>
            Actualizar mapa <RotateCcw size={16} />
          </button>
          <button type="button" className={styles.centerBtn} onClick={handleCenterZacatecas}>
            Centrar Zacatecas <MapPin size={16} />
          </button>

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
                    <p className={styles.descriptiontext}>{station.fullName}</p>
                  </div>
                  <div className={styles.stationMeta}>
                    <span
                      className={styles.potencialBadgeSmall}
                      style={{ backgroundColor: POTENCIAL_COLORS[station.potencial] }}
                    >
                      {POTENCIAL_LABELS[station.potencial]}
                    </span>
                    <div className={`${styles.statusDot} ${station.active ? styles.statusActive : styles.statusInactive}`} />
                  </div>
                </div>
              </div>
            ))}

            {filteredStations.length === 0 && (
              <p className={styles.emptyText}>No se encontraron cultivos con estos filtros.</p>
            )}
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

        {/* Panel derecho — tabs: mapa de potencial / cuidados del cultivo */}
        <div className={styles.rightPanel}>
          <div className={styles.tabsWrapper}>
            <div className={styles.tabsHeader}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'mapa' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('mapa')}
              >
                <MapIcon size={16} /> Mapa
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === 'cuidados' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('cuidados')}
              >
                <Sprout size={16} /> Cuidados del cultivo
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'mapa' && (
                <MapaPotencial key={mapKey} visibleLevels={appliedFilters.potencial} />
              )}
              {activeTab === 'cuidados' && (
                <div className={styles.cuidadosContent}>
                  <CuidadoCultivo />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultivoSelector;
