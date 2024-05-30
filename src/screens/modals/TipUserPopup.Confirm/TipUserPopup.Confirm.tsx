import { Modal } from '../../../components/Modal/Modal';
import { TextTitle1 } from '../../../components/Typography/Typography';
import { CoinIcon } from '../../../components/icons/CoinIcon';
import { TGlobalUser } from '../../../types/userTypes';
import { UserDetailsLine } from '../../../components/UserDetails.Line/UserDetails.Line';

import styles from './TipUserPopup.Confirm.module.scss';
import { Button } from '../../../components/Button/Button';
import { useTipUserMutation } from '../../../store/slices/rockethubApi/user.endpoints';
import toast from 'react-hot-toast';
import { captureException } from '@sentry/react';

type TProps = {
  show: boolean;
  amount: number;
  user: TGlobalUser;
  doNotShowTipInChat: boolean | undefined;
  onClose: () => void;
};

export const TipUserPopupConfirm = ({
  show,
  onClose,
  amount,
  user,
  doNotShowTipInChat,
}: TProps) => {
  const [tipUser, { isLoading }] = useTipUserMutation();

  const handleConfirm = async () => {
    if (isLoading) {
      return;
    }

    try {
      const result = await tipUser({
        steamid: user.steamid,
        amount: parseFloat(amount as unknown as string),
        displayInChat: !doNotShowTipInChat,
      }).unwrap();
      if (!result.success) {
        toast.error(result.msg);
        return;
      }

      toast.success(result.msg);
      onClose();
    } catch (e: any) {
      if (e?.status && parseInt(e.status as string) > 499) {
        captureException(e);
      }
      const message: string =
        e?.data?.msg || 'Unexpected error happened, please try again';
      toast.error(message);
    }
  };

  return (
    <Modal show={show} onClose={onClose} className={styles.modal}>
      <div className={styles.container}>
        <TextTitle1 className={styles.title}>Confirm Tip</TextTitle1>

        <div className={styles.sendingText}>
          You’re sending
          <span className={styles.coinContainer}>
            <CoinIcon shine />
            {amount}
          </span>
          to user
        </div>

        <UserDetailsLine user={user} center className={styles.userDetails} />
      </div>

      <div className={styles.buttons}>
        <Button
          pressable
          fullWidth
          size="huge"
          color="secondary-v3"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          pressable
          fullWidth
          size="huge"
          loading={isLoading}
          onClick={() => handleConfirm()}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
