import { useDispatch } from 'react-redux';
import { Button } from '../../Button/Button';
import { RefreshIcon } from '../../icons/RefreshIcon';
import { UpgradeIcon } from '../../icons/UpgradeIcon';
import styles from './Upgrader.Controls.Footer.module.scss';
import { upgraderActions } from '../../../store/slices/upgrader.slice';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

type TProps = {
  onSubmit: () => void;
  isModal?: boolean;
};

export const UpgraderControlsFooter = ({ onSubmit, isModal }: TProps) => {
  const dispatch = useDispatch();
  const { formState } = useFormContext();

  return (
    <div
      className={clsx(styles.container, {
        [styles.isModal]: isModal,
      })}
    >
      <Button
        type="button"
        pressable
        size="huge"
        fullWidth
        prepend={<UpgradeIcon />}
        disabled={formState.isSubmitting}
        onClick={() => {
          if (formState.isSubmitting) return;
          onSubmit();
        }}
      >
        Upgrade
      </Button>

      <Button
        pressable
        color="secondary-v3"
        size="huge"
        fullWidth
        className={styles.refreshButton}
        onClick={() => dispatch(upgraderActions.toggleRollType())}
        disabled={formState.isSubmitting}
      >
        <RefreshIcon />
      </Button>
    </div>
  );
};
