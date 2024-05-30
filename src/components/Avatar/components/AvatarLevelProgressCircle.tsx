import { CircleProgressBar } from '@/components/CircleProgressBar/CircleProgressBar';
import styles from './AvatarLevelProgressCircle.module.scss';

type TProps = {
  size: string | number;
  progress: number;
};

export const AvatarLevelProgressCircle = ({ size, progress }: TProps) => {
  if (typeof size === 'string') {
    console.warn(
      'Use number size if you want to see avatar progress as circle'
    );
    return null;
  }

  const dotRotate = (360 * progress) / 100 + 180;

  return (
    <>
      <CircleProgressBar
        className={styles.container}
        size={size}
        trackWidth={2}
        indicatorWidth={2}
        progress={progress}
        trackColor="#4F4F54"
        indicatorColor="var(--avatar-color)"
        indicatorCap="butt"
      />
      <span
        className={styles.circleDot}
        style={{
          width: size,
          height: size,
          transform: `translate(-50%, -50%) rotate(${dotRotate}deg)`,
        }}
      />
    </>
  );
};
