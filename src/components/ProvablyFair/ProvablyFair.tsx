import styles from './ProvablyFair.module.scss';

export const ProvablyFair = () => {
  return (
    <div className={styles.container}>
      <img
        src="/images/icons/provably-fair-shield.svg"
        alt="Provably Fair"
        className={styles.icon}
      />
      <div className={styles.content}>
        <span className={styles.title}>Provably Fair</span>
        <span className={styles.description}>Blockchain-powered</span>
      </div>
    </div>
  );
};
