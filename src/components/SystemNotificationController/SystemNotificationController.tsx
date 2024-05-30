import { useNotifications } from '@/hooks/useNotifications';
import { SystemNotification } from './components/SystemNotification';
import styles from './SystemNotificationController.module.scss';
import { useSessionStorage } from 'react-use';
import { SS_HIDDEN_SYSTEM_NOTIFICATIONS } from '@/constants';
import { useMemo } from 'react';

export const SystemNotificationController = () => {
  const { systemNotifications } = useNotifications();
  const [hiddenNotifications, setHiddenNotifications] = useSessionStorage<
    Record<string, boolean>
  >(SS_HIDDEN_SYSTEM_NOTIFICATIONS, {});

  // get ids from session storage
  const hiddenNotificationsIds = useMemo(() => {
    return Object.keys(hiddenNotifications);
  }, [hiddenNotifications]);

  // filter notifications 
  const filteredSystemNotifications = useMemo(() => {
    return systemNotifications.filter(
      (notification) => !hiddenNotificationsIds.includes(notification.id),
    );
  }, [systemNotifications, hiddenNotificationsIds]);

  return (
    <div className={styles.container}>
      {filteredSystemNotifications.map((notification) => {
        return (
          <SystemNotification
            notification={notification}
            key={notification.id}
            onClose={() => {
              setHiddenNotifications({
                ...hiddenNotifications,
                [notification.id]: true,
              });
            }}
          />
        );
      })}
    </div>
  );
};
