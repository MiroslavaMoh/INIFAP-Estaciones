import React, { useState } from 'react';
import styles from './App.module.css';
import StationSelectorModal from './components/StationSelectorModal';
import DetailsIconLeft from './components/DetailsIconLeft';
import Grafica from './components/Grafica';
import AlertItem from './components/AlertItem';
import MetricCard from './components/MetricCard';
import NumberData from './components/NumberData';

import {
  MapPin, Clock, Thermometer, Droplets, CloudRain,
  Sun, Wind, ArrowUpRight, ArrowDownRight, AlertTriangle, BarChart2
} from 'lucide-react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState({
    id: 1, name: 'Marianita', location: 'Mazapil'
  });

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* ── Estación ── */}
        <header className={styles.stationCard}>
          <div className={styles.stationRow}>

            {/* Columna izquierda */}
            <div>
              <div className={styles.timeTag}>
                <MapPin size={18} color="#9F2241" />
                <span>Tiempo real</span>
              </div>
              <h3 className={styles.stationName}>{selectedStation.name}</h3>
              <h2 className={styles.stationLocation}>{selectedStation.location}</h2>
              <span className={styles.stationDate}>Fecha de Instalación: 08 Julio 2004</span>
            </div>

            {/* Columna derecha */}
            <div className={styles.rightCol}>
              <div className={styles.updateBox}>
                <Clock size={24} color="#9ca3af" />
                <div>
                  <p className={styles.updateLabel}>Última actualización:</p>
                  <p className={styles.updateValue}>28 de Abril del 2026, 7:30 p.m.</p>
                </div>
              </div>
              <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#StationSelectorModal">
                Seleccionar estación
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
                Seleccionar estación
              </button>
            </div>
          </div>
        </header>


        {/* ── Fila 1: Métricas ── */}
        <div className={styles.grid4}>

          <MetricCard color="#9F2241" Icon={Thermometer} title="Temperatura">
            <NumberData Number="24.5" Value="°C" />
            <div className={styles.grid2}>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Máximo</p>
                <p className={styles.statValue}>36.4°C</p>
                <p className={styles.statTime}>16:15 pm</p>
              </div>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Mínimo</p>
                <p className={styles.statValue}>10.2°C</p>
                <p className={styles.statTime}>05:30 am</p>
              </div>
            </div>
          </MetricCard>

          <MetricCard color="#285C4D" Icon={Droplets} title="Humedad relativa">
            <NumberData Number="17.2" Value="%" />
            <div className={styles.grid2}>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Máximo</p>
                <p className={styles.statValue}>82%</p>
                <p className={styles.statTime}>06:00 am</p>
              </div>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>Mínimo</p>
                <p className={styles.statValue}>12%</p>
                <p className={styles.statTime}>15:00 pm</p>
              </div>
            </div>
          </MetricCard>

          <MetricCard color="#10312B" Icon={CloudRain} title="Precipitación">
            <NumberData Number="0.0" Value="mm" />
            <DetailsIconLeft IconDetail={ArrowUpRight} TitleDetail="Total acumulada" TextDetail="0.0 mm" />
          </MetricCard>

          <MetricCard color="#D4C19C" Icon={Sun} title="Radiación">
            <NumberData Number="0.0" Value="W/m²" />
            <DetailsIconLeft IconDetail={ArrowUpRight} TitleDetail="Total registrada" TextDetail="27,710 W/m²" />
          </MetricCard>

        </div>

        {/* ── Fila 2: Estado + Gráfica ── */}
        <div className={styles.grid3}>

          <MetricCard color="#9F2241" Icon={AlertTriangle} title="Estado">
            <AlertItem type="condiciones" message="Ventana favorable baja deriva y temperatura estable." />
            <AlertItem type="alerta"      message="Ráfagas de viento de 22.8 km/h registradas a las 01:30 PM." />
          </MetricCard>

          <div className={`${styles.colSpan2} ${styles.fullHeight}`}>
            <MetricCard color="#9F2241" Icon={BarChart2} title="Histórico de 24 hrs">
              <div className={styles.graficaHeaderRow}>
                <div className={styles.legendRow}>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: '#D4C19C' }} />
                    Temperatura
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: '#3b82f6' }} />
                    Humedad
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: '#0ea5e9' }} />
                    Precipitación
                  </span>
                </div>
                <button className="btn btn-primary btn-sm">Ver gráficas</button>
              </div>
              <div className={styles.graficaContainer}>
                <Grafica />
              </div>
            </MetricCard>
          </div>

        </div>

        {/* ── Fila 3: Ubicación + Viento ── */}
        <div className={styles.grid3}>

          <div className={styles.fullHeight}>
            <MetricCard color="#9F2241" Icon={MapPin} title="Ubicación">
              <div className={styles.spaceY}>
                <DetailsIconLeft IconDetail={ArrowUpRight}   TitleDetail="Longitud" TextDetail={`102° 9' 6.0"`} />
                <DetailsIconLeft IconDetail={ArrowDownRight} TitleDetail="Latitud"  TextDetail={`24° 11' 08.3"`} />
                <DetailsIconLeft IconDetail={ArrowDownRight} TitleDetail="Altitud"  TextDetail="1670 msnm." />
              </div>
            </MetricCard>
          </div>

          <div className={`${styles.colSpan2} ${styles.fullHeight}`}>
            <MetricCard color="#7e7e7e" Icon={Wind} title="Velocidad y dirección del viento">
              <NumberData Number="3.8" Value="Km/hr" />
              <div className={styles.spaceY}>

                <div className={styles.windRow}>
                  <div className={styles.windLeft}>
                    <ArrowUpRight color="#9ca3af" size={20} />
                    <div className={styles.windInfo}>
                      <p className={styles.windLabel}>Máximo</p>
                      <p className={styles.windValue}>14 Km/hr proveniente del NNO</p>
                    </div>
                  </div>
                  <span className={styles.windTime}><Clock size={14} /> 16:15 pm</span>
                </div>

                <div className={styles.windRow}>
                  <div className={styles.windLeft}>
                    <ArrowDownRight color="#9ca3af" size={20} />
                    <div className={styles.windInfo}>
                      <p className={styles.windLabel}>Mínimo</p>
                      <p className={styles.windValue}>0 Km/hr</p>
                    </div>
                  </div>
                  <span className={styles.windTime}><Clock size={14} /> 05:45 am</span>
                </div>

                <div className={styles.windRow}>
                  <div className={styles.windLeft}>
                    <ArrowDownRight color="#9ca3af" size={20} />
                    <div className={styles.windInfo}>
                      <p className={styles.windLabel}>Media</p>
                      <p className={styles.windValue}>3.6 Km/hr proveniente del SO</p>
                    </div>
                  </div>
                  <span className={styles.windTime} />
                </div>

              </div>
            </MetricCard>
          </div>

        </div>

      </div>

      <StationSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStationSelect={handleStationSelect}
      />
    </div>
  );
};

export default App;
