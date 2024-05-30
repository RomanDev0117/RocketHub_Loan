import { FormattedPlural } from 'react-intl';
import styles from './NotificationsDropdown.module.scss';
import { useNotifications } from '@/hooks/useNotifications';
import useTranslation from '@/hooks/useTranslation';
import clsx from 'clsx';
import {
  useDeleteAllNotificationsMutation,
} from '@/store/slices/rockethubApi/notification.endpoints';
import Loader from '@/components/Loader/Loader';
import { NotificationsItem } from '../NotificationsItem/NotificationsItem';
import { Button } from '@/components/Button/Button';
import { memo } from 'react';

type TProps = {
  open: boolean;
  onClose: () => void;
};

export const NotificationsDropdown = memo(({ open, onClose }: TProps) => {
  const { t } = useTranslation();
  const [dismissAllNotifications, { isLoading: notificationsBeingDismissed }] =
    useDeleteAllNotificationsMutation();

  const {
    notificationsCount,
    userNotifications,
    isFetching,
  } = useNotifications();

  const hasNotifications = notificationsCount > 0;

  return (
    <div
      className={clsx(styles.container, 'v2Variables', {
        [styles.open]: open,
      })}
    >
      {/* Header */}
      <header className={styles.header}>
        <span
          className={clsx(styles.title, {
            [styles.capitalize]: false,
          })}
        >
          {notificationsCount}{' '}
          <FormattedPlural
            one={t({
              id: 'notifications.title.notification',
              defaultMessage: 'notification',
            })}
            other={t({
              id: 'notifications.title.notifications',
              defaultMessage: 'notifications',
            })}
            value={notificationsCount}
          />
        </span>

        {hasNotifications && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={() => {
              void dismissAllNotifications();
            }}
          >
            Dismiss all
          </button>
        )}
      </header>

      {/* Content */}
      <div className={styles.content}>
        {notificationsBeingDismissed && (
          <div className={styles.noNotifications}>
            <Loader loading />
          </div>
        )}

        {!isFetching && !notificationsBeingDismissed && !hasNotifications && (
          <div className={styles.noNotifications}>
            {t({
              id: 'notifications.title.noNotifications',
              defaultMessage: 'No notifications',
            })}
          </div>
        )}

        {/* Notifications */}
        {!notificationsBeingDismissed && userNotifications.length > 0 && (
          <>
            {userNotifications.map((notification) => {
              return (
                <NotificationsItem
                  key={notification.id}
                  notification={notification}
                />
              );
            })}
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <Button color="secondary-v3" fullWidth pressable onClick={onClose}>
          Close
        </Button>
      </footer>
    </div>
  );
});
