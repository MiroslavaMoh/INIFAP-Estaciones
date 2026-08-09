import styles from './NumberData.module.css';

const NumberData = ({ Number, Value }) => {
  return (
    <div className={styles.container}>
      <span className={styles.number}>{Number}</span>
      <span className={styles.unit}>{Value}</span>
    </div>
  );
};

export default NumberData;
