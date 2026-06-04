import { CheckCircle2, AlertTriangle, Info, Lightbulb } from 'lucide-react';
import styles from './AlertItem.module.css';

const config = {
  condiciones: { Icon: CheckCircle2, label: 'Condiciones', color: '#285C4D' },
  alerta:       { Icon: AlertTriangle, label: 'Alerta',       color: '#9F2241' },
  anuncio:      { Icon: Info,          label: 'Anuncio',      color: '#3b82f6' },
  recomendacion:{ Icon: Lightbulb,     label: 'Recomendación',color: '#B38E5D' },
};

const AlertItem = ({ type, message }) => {
  const { Icon, label, color } = config[type] ?? config.anuncio;
  const typeClass = styles[type] ?? styles.anuncio;

  return (
    <div className={`${styles.alert} ${typeClass}`}>
      <Icon className={styles.icon} style={{ color }} size={15} />
      <div>
        <p className={styles.label} style={{ color }}>{label}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default AlertItem;
