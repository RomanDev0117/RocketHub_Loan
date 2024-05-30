import clsx from 'clsx';
import { Switch } from '../Form/Switch/Switch';
import { LockIconV2 } from '../icons/LockIconV2';
import { LockSlashIcon } from '../icons/LockSlashIcon';
import styles from './LockToggle.module.scss';

type TProps = {
  locked: boolean;
  onChange: (locked: boolean) => void;
};

export const LockToggle = ({ locked, onChange }: TProps) => {
  return (
    <div className={styles.container}>
      <LockSlashIcon
        className={clsx(styles.icon, {
          [styles.red]: !locked,
          [styles.disabled]: locked,
        })}
      />
      <Switch checked={locked} onChange={onChange} />
      <LockIconV2
        className={clsx(styles.icon, {
          [styles.green]: locked,
        })}
      />
    </div>
  );
};
