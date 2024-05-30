import clsx from 'clsx';
import styles from './RainProgressBar.module.scss';
import { TRain } from '@/types/rain.types';
import { memo, useMemo } from 'react';

type TProps = {
  rain: TRain;
};

export const RainProgressBar = memo(({ rain }: TProps) => {

  const { timeLeftMs, percentage } = useMemo(() => {
    const totalTime = (rain.endingAt - rain.createdAt) * 1000;
    const timeLeftMs = rain.endingAt * 1000 - Date.now();
    const percentage = (timeLeftMs / totalTime) * 100;
    return {
      totalTime,
      timeLeftMs,
      percentage,
    };
  }, [rain.endingAt]);



  return (
    <div
      className={clsx(styles.progressBar)}
      style={
        {
          '--progressDuration': timeLeftMs ? `${timeLeftMs}ms` : undefined,
          '--startFrom': percentage ? `${percentage}%` : undefined,
        } as any
      }
    />
  );
});
