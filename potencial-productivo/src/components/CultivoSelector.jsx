import React, { useState, useMemo } from 'react';
import { MapPin, Search, RotateCcw, Map as MapIcon, Sprout, Clock, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './CultivoSelector.module.css';
import MapaPotencial from './MapaPotencial';
import CuidadoCultivo from './CuidadoCultivo';
import DetailsIconLeft from './DetailsIconLeft';
import { useCultivos } from '../hooks/useCultivos';

const toDMS = (decimal, axis) => {
  const dir = axis === 'lat' ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'O');
  const abs = Math.abs(decimal);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = ((minFloat - min) * 60).toFixed(1);
  return `${deg}° ${min}' ${sec}" ${dir}`;
};

const CICLO_OPTIONS = ['Todos', 'Agrícola', 'Forrajero'];
const RIEGO_OPTIONS = ['Todos', 'Riego', 'Temporal'];
const POTENCIAL_COLORS = { alto: '#038310', medio: '#f0a716', bajo: '#a81d1d' };
const POTENCIAL_LABELS = { alto: 'Alto', medio: 'Medio', bajo: 'Bajo' };
const DEFAULT_POTENCIAL = { alto: true, medio: true, bajo: false };

const CultivoSelector = ({ onStationSelect }) => {
  const { cultivos, error: cultivosError } = useCultivos();
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cursorLocation, setCursorLocation] = useState(null);

  // Producción y Riego filtran la lista de inmediato. Potencial además controla
  // las capas del mapa, así que se queda en edición hasta pulsar "Actualizar mapa".
  const [ciclo, setCiclo] = useState('Todos');
  const [riego, setRiego] = useState('Todos');
  const [potencial, setPotencial] = useState(DEFAULT_POTENCIAL);

  const [appliedPotencial, setAppliedPotencial] = useState(DEFAULT_POTENCIAL);

  // Fuerza el remonte de MapaPotencial (recentra y aplica capas) al pulsar los botones de acción.
  const [mapKey, setMapKey] = useState(0);

  // Pestaña activa del panel derecho: 'mapa' o 'cuidados'.
  const [activeTab, setActiveTab] = useState('mapa');

  // Colapsa el panel de filtros/lista en móvil; en escritorio siempre se ve completo.
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const filteredStations = useMemo(() => {
    if (!cultivos) return [];
    return cultivos.filter((c) => {
      const matchesSearch =
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCiclo = ciclo === 'Todos' || c.tipoProduccion === ciclo;
      const matchesRiego = riego === 'Todos' || c.regimen === riego;
      const matchesPotencial = c.niveles.some((nivel) => appliedPotencial[nivel]);
      return matchesSearch && matchesCiclo && matchesRiego && matchesPotencial;
    });
  }, [cultivos, searchTerm, ciclo, riego, appliedPotencial]);

  const handleTogglePotencial = (key) => {
    setPotencial((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdateMap = () => {
    setAppliedPotencial(potencial);
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
            <h3 className={styles.selectedName} >Seleccionar Cultivo</h3>
            {selectedStation && (
              <div className={styles.selectedInfo}>
                <h3 >{selectedStation.name}</h3>
                <p className={styles.selectedScientific}>{selectedStation.fullName}</p>
              </div>
            )}
          </div>

          <div className={styles.updateBox}>
            <div className={styles.updateBoxTop}>
              <Clock size={24} color="#9ca3af" />
              <div>
                <p className={styles.updateLabel}>Última actualización:</p>
                <p className={styles.updateValue}>28 de Abril del 2026</p>
              </div>
            </div>

            {selectedStation && (
              <div className={styles.spaceY}>
                <DetailsIconLeft
                  IconDetail={ArrowUpRight}
                  TitleDetail="Longitud"
                  TextDetail={cursorLocation ? toDMS(cursorLocation.lng, 'lng') : 'Selecciona un punto en el mapa'}
                />
                <DetailsIconLeft
                  IconDetail={ArrowDownRight}
                  TitleDetail="Latitud"
                  TextDetail={cursorLocation ? toDMS(cursorLocation.lat, 'lat') : '—'}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>
          {/* Panel izquierdo */}
        <div className={styles.leftPanel}>
          <button
            type="button"
            className={styles.leftPanelHeader}
            onClick={() => setIsPanelOpen((open) => !open)}
            aria-expanded={isPanelOpen}
          >
            <h4 className={styles.filtersTitle}>Filtros</h4>
            {isPanelOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          <div className={`${styles.leftPanelContent} ${isPanelOpen ? '' : styles.leftPanelContentCollapsed}`}>
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
            {cultivosError && (
              <p className={styles.emptyText}>No se pudo cargar la información de cultivos.</p>
            )}

            {!cultivosError && !cultivos && (
              <p className={styles.emptyText}>Cargando cultivos…</p>
            )}

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
                    {station.niveles.map((nivel) => (
                      <span
                        key={nivel}
                        className={styles.potencialBadgeSmall}
                        style={{ backgroundColor: POTENCIAL_COLORS[nivel] }}
                      >
                        {POTENCIAL_LABELS[nivel]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {cultivos && filteredStations.length === 0 && (
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
                <MapaPotencial
                  key={mapKey}
                  height="100%"
                  geojsonKey={selectedStation?.geojsonKey}
                  visibleLevels={appliedPotencial}
                  selectedLocation={cursorLocation}
                  onLocationSelect={setCursorLocation}
                />
              )}
              {activeTab === 'cuidados' && (
                <div className={styles.cuidadosContent}>
                  <CuidadoCultivo cultivo={selectedStation?.metadata} nombre={selectedStation?.name} />
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
