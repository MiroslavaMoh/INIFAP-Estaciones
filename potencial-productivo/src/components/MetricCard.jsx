import styles from './MetricCard.module.css';

const MetricCard = ({ color = '#9F2241', Icon, title, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.accent} style={{ backgroundColor: color }} />
      <div className={styles.body}>
        <div className={styles.header}>
          <h6>{title}</h6>
          {Icon && <Icon style={{ color }} size={25} />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default MetricCard;
