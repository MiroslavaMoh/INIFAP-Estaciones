import React from 'react';
import styles from '../App.module.css';
import layoutStyles from './CuidadoCultivo.module.css';
import MetricCard from './MetricCard';
import { Info, Leaf, FlaskConical, ListChecks, Bug, Scissors, ShieldAlert } from 'lucide-react';

const CuidadoCultivo = ({ cultivo, nombre, onVerMas }) => {
  if (!cultivo) {
    return (
      <p className={styles.statInfo}>
        {nombre
          ? `Aún no hay información de manejo capturada para ${nombre}.`
          : 'Selecciona un cultivo de la lista para ver sus cuidados.'}
      </p>
    );
  }

  return (
    <>
      <div className={layoutStyles.grid2CardsAsym}>
        <MetricCard color="#9F2241" Icon={Info} title="Información general">
          <div className={styles.grid2}>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Ciclo</p>
              <p className={styles.statValue}>{cultivo.ciclo || '—'}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Época de siembra</p>
              <p className={styles.statValue}>{cultivo.epoca_plantacion || '—'}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Régimen de humedad</p>
              <p className={styles.statValue}>{cultivo.regimen_humedad || '—'}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Rendimiento potencial</p>
              <p className={styles.statValue}>{cultivo.rendimiento_potencial || '—'}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Tipo de siembra</p>
              <p className={styles.statValue}>{cultivo.plantacion_labranza || '—'}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Densidad de siembra</p>
              <p className={styles.statValue}>{cultivo.densidad_plantacion || '—'}</p>
            </div>
          </div>
        </MetricCard>

        <MetricCard color="#285C4D" Icon={Leaf} title="Variedad">
          <p className={styles.statInfo}>{cultivo.variedad || 'Sin información disponible.'}</p>
        </MetricCard>
      </div>

      <div className={layoutStyles.grid2Cards}>
        <MetricCard color="#285C4D" Icon={FlaskConical} title="Fertilización">
          <p className={styles.statInfo}>{cultivo.fertilizacion || 'Sin información disponible.'}</p>
        </MetricCard>

        <MetricCard color="#10312B" Icon={ListChecks} title="Otras actividades">
          <p className={styles.statInfo}>{cultivo.otras_actividades || 'Sin información disponible.'}</p>
        </MetricCard>
      </div>

      <div className={layoutStyles.grid1}>
        <MetricCard color="#9F2241" Icon={Bug} title="Control de Plagas">
          <p className={styles.statInfo}>{cultivo.control_plagas || 'Sin información disponible.'}</p>
        </MetricCard>

        <MetricCard color="#D4C19C" Icon={Scissors} title="Control de Malezas">
          <p className={styles.statInfo}>{cultivo.control_malezas || 'Sin información disponible.'}</p>
        </MetricCard>

        <MetricCard color="#7e7e7e" Icon={ShieldAlert} title="Control de Enfermedades">
          <p className={styles.statInfo}>{cultivo.control_enfermedades || 'Sin información disponible.'}</p>
          {onVerMas && (
            <>
              <br />
              <button className="btn btn-primary btn-sm" onClick={onVerMas}>
                ver más
              </button>
            </>
          )}
        </MetricCard>
      </div>
    </>
  );
};

export default CuidadoCultivo;
