import { TNotification } from '@/types/notification.types';
import styles from './SystemNotification.module.scss';
import { NOTIFICATIONS_CONFIG } from '@/constants';
import { CrossIcon } from '@/components/icons/CrossIcon';
import clsx from 'clsx';
import { useState } from 'react';

type TProps = {
  notification: TNotification;
  onClose: () => void;
}

export const SystemNotification = ({ notification, onClose }: TProps) => {
  const [hidden, setHidden] = useState(false);
  const config = NOTIFICATIONS_CONFIG[notification.type];

  const handleClose = () => {
    setHidden(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className={clsx(styles.container, styles.animateIn, {
      [styles.hidden]: hidden,
    })}>
      <span className={styles.iconContainer}>
        <config.Icon />
      </span>
      {notification.message}

      <button type="button" className={styles.closeButton} onClick={handleClose}>
        <CrossIcon />
      </button>
    </div>
  );
};