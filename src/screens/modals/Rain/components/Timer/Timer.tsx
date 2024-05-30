import { useEffect, useMemo } from 'react';
import { useTimer } from 'react-timer-hook';
import { padStart } from 'lodash';
import styles from './Timer.module.scss';

type TProps = {
  timerEnd: number;
}

export const Timer = ({ timerEnd }: TProps) => {
  const expiryDate = useMemo(() => {
    return new Date(timerEnd);
  }, [timerEnd]);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: expiryDate,

  });

  useEffect(() => {
    restart(expiryDate);
  }, [expiryDate, restart]);

  return (
    <div className={styles.container}>
      <span className={styles.text}>
        {padStart(`${minutes}`, 2, '0')}
        :
        {padStart(`${seconds}`, 2, '0')}
      </span>
    </div>
  );
};