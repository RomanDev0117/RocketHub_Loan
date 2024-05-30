import { useFormContext } from 'react-hook-form';
import { CircleProgressBar } from '../../CircleProgressBar/CircleProgressBar';
import styles from './Upgrader.Controls.Circle.module.scss';
import { Spring, animated, config } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { selectUpgraderRollType } from '../../../store/slices/upgrader.slice';
import { RollType } from '../../../types/upgrader.types';
import { minMaxChance } from '../upgrader.utils';
import { memo } from 'react';
import { useSm } from '../../../hooks/useMediaHooks';

type TProps = {
  isModal?: boolean;
};

export const UpgraderControlsCircle = memo(({ isModal }: TProps) => {
  const { watch } = useFormContext();
  const chance = minMaxChance(watch('chance', 0));
  const rollType = useSelector(selectUpgraderRollType);
  const multiplier = rollType === RollType.Over ? 1 : -1;
  const win = watch('win', null);
  const gameEnded = typeof win === 'boolean';
  const isSm = useSm();

  const to = (gameEnded ? 100 : chance) * multiplier;

  const indicatorSize = isSm
    ? {
      width: 15,
      // gameEnded: 20,
      gameEnded: 15,
    }
    : isModal
      ? {
        width: 16,
        // gameEnded: 20,
        gameEnded: 16,
      }
      : {
        width: 20,
        // gameEnded: 28,
        gameEnded: 20,
      };

  return (
    <Spring
      from={{ progress: 0, indicatorWidth: indicatorSize.width }}
      to={{
        progress: to,
        indicatorWidth: gameEnded
          ? indicatorSize.gameEnded
          : indicatorSize.width,
      }}
      config={{
        ...config.molasses,
        round: 0.01,
        duration: gameEnded ? 150 : 300,
      }}
    >
      {({ progress, indicatorWidth }) => {
        return (
          <Circle
            progress={progress}
            indicatorWidth={indicatorWidth}
            isModal={isModal}
          />
        );
      }}
    </Spring>
  );
});

const Circle = animated(({ progress, indicatorWidth, isModal }) => {
  const isSm = useSm();
  const trackWidth = 15; // isSm ? 15 : isModal ? 16 : 20;
  const size = isSm ? 320 : isModal ? 326 : 400;
  return (
    <CircleProgressBar
      className={styles.container}
      size={size}
      trackWidth={trackWidth}
      indicatorWidth={indicatorWidth}
      progress={progress}
      trackColor="rgba(75, 85, 99, 0.5)"
      indicatorColor="var(--itemColor)"
      indicatorCap="butt"
      indicatorStyle={{
        filter: 'drop-shadow(2px 4px 6px black)',
      }}
    />
  );
});
