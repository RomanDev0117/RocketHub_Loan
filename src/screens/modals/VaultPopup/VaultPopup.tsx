import { useVaultPopup } from '@/hooks/useVaultPopup';
import { useSelector } from 'react-redux';
import { selectVaultPopupOpen } from '@/store/slices/appSlice';
import { Modal } from '@/components/Modal/Modal';
import styles from './VaultPopup.module.scss';
import { Vault } from '@/screens/sections/Vault/Vault';

export const VaultPopup = () => {
  const { close } = useVaultPopup();

  const open = useSelector(selectVaultPopupOpen);


  return (
    <Modal
      show={open}
      onClose={close}
      className={styles.modal}
      contentClassName={styles.modalContent}
    >

      <Vault />


      <img src="/images/vault/modal-bg.png" className={styles.bgImage} />
      <img src="/images/vault/stars.svg" className={styles.stars} />
    </Modal>
  );
};
