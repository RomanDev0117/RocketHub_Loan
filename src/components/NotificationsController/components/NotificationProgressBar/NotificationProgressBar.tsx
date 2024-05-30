import clsx from 'clsx';
import styles from './NotificationProgressBar.module.scss';
import { NotificationType } from '@/types/notification.types';
import { NOTIFICATIONS_CONFIG } from '@/constants';

type TProps = {
  duration?: number;
  type: NotificationType;
};

export const NotificationProgressBar = ({ duration, type }: TProps) => {
  const color = NOTIFICATIONS_CONFIG[type].progressColor;

  return (
    <div
      className={clsx(styles.progressBar)}
      style={
        {
          '--progressDuration': duration ? `${duration}ms` : undefined,
          backgroundColor: color,
        } as any
      }
    />
  );
};
