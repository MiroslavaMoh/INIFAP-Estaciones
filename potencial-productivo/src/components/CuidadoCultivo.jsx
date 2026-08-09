import React from 'react';
import styles from '../App.module.css';
import layoutStyles from './CuidadoCultivo.module.css';
import MetricCard from './MetricCard';
import DetailsIconLeft from './DetailsIconLeft';
import { Thermometer, Droplets, CloudRain, Sun, Wind, MapPin, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CuidadoCultivo = ({ onVerMas }) => {
  return (
    <>
      <div className={layoutStyles.grid2Cards}>
        <MetricCard color="#9F2241" Icon={MapPin} title="Ubicación">
          <div className={styles.spaceY}>
            <DetailsIconLeft IconDetail={ArrowUpRight}   TitleDetail="Longitud" TextDetail={`102° 9' 6.0"`} />
            <DetailsIconLeft IconDetail={ArrowDownRight} TitleDetail="Latitud"  TextDetail={`24° 11' 08.3"`} />
            <DetailsIconLeft IconDetail={ArrowDownRight} TitleDetail="Altitud"  TextDetail="1670 msnm." />
          </div>
        </MetricCard>

        <MetricCard color="#9F2241" Icon={Thermometer} title="Información general">
          <div className={styles.grid2}>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Ciclo</p>
              <p className={styles.statValue}>Otoño/Primavera</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Regimen de humedad</p>
              <p className={styles.statValue}>Riego</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Potencial de producción</p>
              <p className={styles.statValue}>Alto y mediano</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.statLabel}>Tipo de siembra</p>
              <p className={styles.statValue}>Manual y mecánica</p>
            </div>
          </div>
        </MetricCard>
      </div>

      <div className={styles.grid3}>
        <MetricCard color="#285C4D" Icon={Droplets} title="Fertilización">
          <p className={styles.statInfo}> Se determinó la dosis generalizada: 150-130-150, fraccionada en dos partes, 75-130-75 al rayar y 75-00-75 a los 60 días. Si puede
hacer más fracciones, la distribución durante el ciclo será mejor. No aplicar después de iniciada la diferenciación de dientes.</p>
        </MetricCard>

        <MetricCard color="#10312B" Icon={CloudRain} title="Riegos">
          <p className={styles.statInfo}>Se recomienda, si es necesario, un riego alrededor de un mes antes de la siembra para eliminar la primera generación
de malezas. Los riegos de auxilio se deben aplicar cuidando tres aspectos fundamentales: el suelo, el clima y el desarrollo de la planta. En
Zacatecas, se aplican cada 15 días en invierno y se van acortando los intervalos a medida que crece el cultivo y aumentan los vientos y las
temperaturas.</p>
        </MetricCard>

        <MetricCard color="#D4C19C" Icon={Sun} title="Control de Plagas">
          <p className={styles.statInfo}>Para controlar los trips se debe aplicar 1.0 L/ha de azinfos metílico 20 E ó diazinon 25 E, ó 1.5 L/ha de malation 1000 E. Para
el control del minador de la hoja aplicar cualquiera de los siguientes insecticidas: 0.5 kg/ha de metomilo, ó 1.5 L/ha de diazinon 25 E, ó 1.5 L/ha de
azinfos metílico, 2.0 L/ha de malation 1000 E ó abameotina 0.5 L/ha. </p>
        </MetricCard>
      </div>

      <div className={layoutStyles.grid2Cards}>
        <MetricCard color="#D4C19C" Icon={Sun} title="Control de Malezas">
          <p className={styles.statInfo}>La estación en que se desarrolla este cultivo, presenta una incidencia baja de maleza, sin embargo, es susceptible a ellas
por ser de arquitectura baja y de ciclo largo. La aplicación de herbicidas es recomendable para eliminar la maleza del hilo de siembra con prometrinas,
(2-3 L/ha) en preemergencia o fluazifop-butil (1 a 2 L/ha), bromoxynil, (1.5 a 2 L/ha) o oxadiazon (3 a 4 L/ha) en post emergencia. Se deben hacer uno o
dos deshierbes entre enero y marzo, así como otra aplicación de herbicida en abril, para evitar las malezas de primavera. El paso de la cultivadora se
hará antes de los riegos, para subir el surco y eliminar las hierbas del caño del surco. </p>
        </MetricCard>

        <MetricCard color="#7e7e7e" Icon={Wind} title="Control de Enfermedades">
          <p className={styles.statInfo}>El combate de las enfermedades provocadas por hongos del suelo exige que las medidas sugeridas sean
aplicadas consistentemente por periodos largos y que se hagan en forma integral ya que la aplicación de una sola de ellas no garantiza un control
eficiente.
Pudrición blanca (Sclerotium cepivorum) Berk. Como medidas preventivas se sugiere incorporar materiales orgánicos para promover las
poblaciones benéficas en el suelo, utilizar sólo semilla sana en los lotes comerciales, cuando sea de origen desconocido, analizar la semilla en
laboratorio antes de su siembra o cuando haya dudas sobre el sitio de siembra, producir la semilla en lotes apartados y libres de esclerosios,</p>
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
