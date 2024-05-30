import clsx from 'clsx';
import styles from './ProgressBar.module.scss';

export type TProgressBarProps = {
  value: number;
  maxValue?: number;
  className?: string;
  height?: number;
  rootBg?: string;
  color?: string;
};

export const ProgressBar = ({
  value,
  maxValue = 100,
  height = 6,
  className,
  rootBg,
  color,
  ...rest
}: TProgressBarProps) => {
  const progress = (value / maxValue) * 100;
  const width = Math.min(progress, 100);
  const style = { height, borderRadius: height };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{
        ...style,
        background: rootBg ? rootBg : undefined,
      }}
      {...rest}
    >
      <div
        style={{ width: `${width}%`, ...style, background: color }}
        className={styles.inner}
      />
    </div>
  );
};
