import clsx from 'clsx';
import { CircleOffIcon } from '../../../icons/CircleOffIcon';
import styles from './AgeRestriction.module.scss';

export const AgeRestriction = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(styles.ageRestriction, className)}>
      <CircleOffIcon />
      <div className={styles.text}>
        18+ Only
        <div className={styles.secondText}>Game responsibly</div>
      </div>
    </div>
  );
};