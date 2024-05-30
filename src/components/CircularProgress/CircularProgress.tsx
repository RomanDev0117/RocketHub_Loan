import styles from './CircularProgress.module.scss';

type TProps = {
  size?: number;
  color?: string;
  thickness?: number;
}

const CircularProgress = ({
  size = 30,
  color = 'var(--primary-color)',
  thickness = 3,
}: TProps) => {
  const s = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={styles.root}
      style={{ color, width: s, height: s, borderWidth: thickness }}
    ></div>
  );
};

export default CircularProgress;
