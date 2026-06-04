import styles from './DetailsIconLeft.module.css';

const DetailsIconLeft = ({ IconDetail, TitleDetail, TextDetail }) => {
  return (
    <div className={styles.container}>
      {IconDetail && <IconDetail className={styles.icon} size={20} />}
      <div>
        <p className={styles.label}>{TitleDetail}</p>
        <p className={styles.value}>{TextDetail}</p>
      </div>
    </div>
  );
};

export default DetailsIconLeft;
