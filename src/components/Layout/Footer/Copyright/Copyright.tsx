import clsx from 'clsx';
import styles from './Copyright.module.scss';

export const Copyright = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(styles.copyright, className)}>© Copyright 2023 rockethub</div>
  );
};