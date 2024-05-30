import { useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './NotificationsController.module.scss';
import { CloseIcon } from './components/CloseIcon';
import { NotificationType, TNotification } from '@/types/notification.types';
import { NOTIFICATIONS_CONFIG } from '@/constants';
import { userApi } from '@/insolve-framework';
import { notificationApi } from '@/store/slices/rockethubApi/notification.endpoints';
import { useDispatch } from 'react-redux';
import StarsIcon from './components/StarsIcon';
import { NotificationProgressBar } from './components/NotificationProgressBar/NotificationProgressBar';
import { NotificationText } from './components/NotificationText/NotificationText';
import { openAccountLockPopup } from '@/store/actions/appActions';

export const NotificationsController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // uncomment for debugging
    // const notification: TNotification = {
    //   created: 1699909917,
    //   id: '69a2c79b-2b67-41af-89b1-e056bc7dcfbd',
    //   message: 'You have just received 1 meteorite reward case!',
    //   read: true,
    //   steamid: '76561198143289169',
    //   type: NotificationType.CryptoDeposit,
    // };

    // showNotification(notification);
    // showNotification({
    //   ...notification,
    //   type: NotificationType.Tip,
    // });
    // showNotification({
    //   ...notification,
    //   type: NotificationType.LevelUp,
    // });
    // showNotification({
    //   ...notification,
    //   type: NotificationType.CryptoWithdraw,
    // });
    // showNotification({ ...notification, type: NotificationType.Reward });
    // showNotification({
    //   ...notification,
    //   type: NotificationType.SkinsbackDeposit,
    // });
    // showNotification({
    //   ...notification,
    //   type: NotificationType.SkinsbackWithdraw,
    // });
    // showNotification({ ...notification, type: NotificationType.SteamDeposit });
    // showNotification({ ...notification, type: NotificationType.System });
    // showNotification({
    //   ...notification,
    //   type: NotificationType.WaxpeerWithdraw,
    // });

    userApi.on('notification', (data: { content: TNotification, display: boolean }) => {
      dispatch(notificationApi.util.invalidateTags(['Notifications']));
      // system notifiations are handled by SystemNotificationController
      const shouldShowNotification =
        data.content.type !== NotificationType.System &&
        data.display !== false;
      if (shouldShowNotification) {
        showNotification(data.content);
        if(data.content.type == NotificationType.AccountLock)
          openAccountLockPopup();
      }
    });
  }, []);

  return null;
};

const showNotification = (notification: TNotification) => {
  const config = NOTIFICATIONS_CONFIG[notification.type];
  const { Icon, title, glowImageName, borderColor } = config || {};

  toast(
    (t) => {
      return (
        <>
          <span className={styles.iconContainer}>{Icon && <Icon />}</span>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>
              <NotificationText>{notification.message}</NotificationText>
            </div>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>

          <img
            src={`/images/notifications/${glowImageName}`}
            alt=""
            className={styles.glow}
          />

          <StarsIcon className={styles.stars} />

          <NotificationProgressBar
            duration={t.duration}
            type={notification.type}
          />
        </>
      );
    },
    {
      className: styles.notificationToast,
      style: { borderColor: `${borderColor}` },
      duration: 7000,
      position: 'bottom-right',
    }
  );
};
