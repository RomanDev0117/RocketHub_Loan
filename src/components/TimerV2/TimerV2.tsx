import { memo, useMemo } from 'react';
import { useTimer } from 'react-timer-hook';

type TProps = {
  date: Date | number;
  onExpire?: () => void;
  children: ({
    seconds,
    minutes,
    hours,
    days
  }: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }) => React.ReactNode
}

export const TimerV2 = memo(({ date, children, onExpire }: TProps) => {

  const _date = useMemo(() => {
    return typeof date === 'number' ? new Date(date) : date;
  }, [date]);


  const {
    seconds,
    minutes,
    hours,
    days
  } = useTimer({ expiryTimestamp: _date, onExpire });

  return children({ seconds, minutes, hours, days });
});