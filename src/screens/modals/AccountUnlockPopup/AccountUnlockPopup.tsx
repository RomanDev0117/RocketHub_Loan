import { useAccountLockPopup } from '@/hooks/useAccountLockPopup';
import { selectAccountLockPopupShow } from '@/store/slices/accountLockPopup.slice';
import { useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';
import styles from './AccountUnlockPopup.module.scss';
import bomb from '../../../../public/images/unlock-account/bomb.png'
import glow from '../../../../public/images/unlock-account/glow.png'
import { Button } from '@/components/Button/Button';

export const AccountUnlockPopup = () => {
  const { close } = useAccountLockPopup();
  const show = useSelector(selectAccountLockPopupShow);

  const openIntercom = () => {
    if (window.Intercom) {
      window.Intercom('show');
    }
  };

  return (
    <>
      <Modal
        show={show}
        onClose={close}
        className={styles.modal}
      >
        <div className={styles.container}>
          <img src={bomb} alt="bomb_banner" />
          <h1 className={styles.title}>
            You’ve just robbed ANDY!
          </h1>
          <p className={styles.description}>
            You've reached the 1,000 coins limit<br />
            To ensure safe gaming, we've temporarily locked your account from placing more bets.<br />
            Please contact support to unlock your account
          </p>
          <Button
            pressable
            className={styles.button}
            height={66}
            onClick={openIntercom}
          >
            Unlock
          </Button>
          <p className={styles.description}>
            Your enjoyment and safety are our highest priority.
          </p>
          <img src={glow} className={styles.glow}  alt="bomb_banner" />
        </div>
      </Modal>
    </>
  );
};
