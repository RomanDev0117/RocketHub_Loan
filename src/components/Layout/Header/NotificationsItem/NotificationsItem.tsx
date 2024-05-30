import { TNotification } from '@/types/notification.types';
import styles from './NotificationsItem.module.scss';
import { NOTIFICATIONS_CONFIG } from '@/constants';
import TimeAgo from 'react-timeago';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { memo } from 'react';
import { NotificationText } from '@/components/NotificationsController/components/NotificationText/NotificationText';

type TProps = {
  notification: TNotification;
};

export const NotificationsItem = memo(({ notification }: TProps) => {
  const config = NOTIFICATIONS_CONFIG[notification.type];
  const { Icon, title } = config || {};

  return (
    <div className={styles.container}>
      <span className={styles.iconContainer}>{Icon && <Icon />}</span>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <span className={styles.timeAgo}>
            <TimeAgo date={notification.created * 1000} formatter={formatter} />
          </span>
        </header>

        <div className={styles.description}>
          <NotificationText>{notification.message}</NotificationText>
        </div>
      </div>
    </div>
  );
});

const formatter = buildFormatter({
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: 'ago',
  suffixFromNow: 'from now',
  seconds: '%ds ',
  minute: '1m',
  minutes: '%dm',
  hour: '1h',
  hours: '%dh',
  day: '1d',
  days: '%dd',
  month: 'about a month',
  months: '%d months',
  year: 'about a year',
  years: '%d years',
  wordSeparator: ' ',
});
