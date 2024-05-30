import clsx from 'clsx';
import { BellIcon } from '@/components/icons/BellIcon';
import styles from './NotificationsBell.module.scss';
import { memo, useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationsDropdown } from '../NotificationsDropdown/NotificationsDropdown';
import { useIsMobileHeader } from '@/hooks/useMediaHooks';
import { useClickAway } from 'react-use';
import { useSelector } from 'react-redux';
import { selectNotificationsOpen } from '@/store/slices/appSlice';
import {
  closeNotifications,
  toggleNotifications,
} from '@/store/actions/appActions';
import { useLocation } from 'react-router-dom';
import { useReadAllNotificationsMutation } from '@/store/slices/rockethubApi/notification.endpoints';

type TProps = {
  className?: string;
  onToggle?: () => void;
};

export const NotificationsBell = memo(({ onToggle, className }: TProps) => {
  const { hasUnread } = useNotifications();
  const location = useLocation();
  const [readAllNotifications] =
    useReadAllNotificationsMutation();

  const isMobileHeadder = useIsMobileHeader();
  // const [showNotifications, setShowNotifications] = useState(false);
  const showNotifications = useSelector(selectNotificationsOpen);
  // click away for dropdown
  const containerRef = useRef(null);
  useClickAway(containerRef, () => {
    if (!showNotifications) return;
    if (isMobileHeadder) return;
    closeNotifications();
  });

  // TODO: move this logic to hook ?
  useEffect(() => {
    if (isMobileHeadder) {
      closeNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      <button
        className={styles.button}
        onClick={() => {
          toggleNotifications();
          onToggle?.();

          if (!showNotifications) {
            void readAllNotifications();
          }
        }}
      >
        <span
          className={clsx(styles.iconContainer, {
            [styles.hasUnreadNotifications]: hasUnread,
          })}
        >
          <BellIcon />
        </span>
      </button>

      <NotificationsDropdown
        open={showNotifications}
        onClose={closeNotifications}
      />
    </div>
  );
});
