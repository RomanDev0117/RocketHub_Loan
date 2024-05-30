import { useGetNotificationsQuery } from '@/store/slices/rockethubApi/notification.endpoints';

export const useNotifications = () => {
  const result = useGetNotificationsQuery();

  const unreadNotificationsCount = result.data?.success
    ? result.data?.userNotifications?.filter((n) => !n.read).length
    : 0;
  const hasUnread = unreadNotificationsCount > 0;
  const userNotifications = result.data?.success
    ? result.data?.userNotifications
    : [];
  const systemNotifications = result.data?.success
    ? result.data?.systemNotifications
    : [];

  const userUnreadNotifications = userNotifications.filter((n) => !n.read);

  return {
    ...result,
    userNotifications,
    notificationsCount: userNotifications.length,
    hasUnread,
    unreadNotificationsCount,
    userUnreadNotifications,
    systemNotifications,
  };
};
