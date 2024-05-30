import clsx from 'clsx';
import styles from './Badge.module.scss';

type TProps = {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'danger' | 'success';
  height?: number;
  rounded?: string | number;
};

export const Badge = ({
  children,
  className,
  height,
  color = 'primary',
  rounded = 'var(--border-radius)',
}: TProps) => {
  return (
    <div
      className={clsx(styles.container, className, styles[`${color}Color`])}
      style={{ borderRadius: rounded, height }}
    >
      {children}
    </div>
  );
};
