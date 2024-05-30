import clsx from 'clsx';
import { UpgraderArrowIcon } from '../icons/UpgraderArrowIcon';
import styles from './Upgrader.Arrow.module.scss';
import { useFormContext } from 'react-hook-form';

type TProps = {
  isModal?: boolean;
}

export const UpgraderArrow = ({ isModal }: TProps) => {
  const { watch } = useFormContext();
  const rotate = watch('rotate', 0);

  return (
    <div className={clsx(styles.arrowContainer, {
      [styles.inModal]: isModal,
    })}>
      <div
        className={styles.innerContainer}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <UpgraderArrowIcon />
      </div>
    </div>
  );
};
