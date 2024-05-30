import { CoinIcon } from '@/components/icons/CoinIcon';
import { Fragment, memo } from 'react';
import styles from './NotificationText.module.scss';

type TProps = {
  children: string;
}

export const NotificationText = memo(({ children }: TProps) => {
  const arr = children.split('{coin}');

  return (
    <div className={styles.text}>
      {arr.map((text, idx) => {
        return (
          <Fragment key={idx}>
            {text}
            {idx !== arr.length - 1 && <CoinIcon className={styles.coin} />}
          </Fragment>
        );
      })}
    </div>
  );
});