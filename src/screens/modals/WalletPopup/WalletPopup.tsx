import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';
import styles from './WalletPopup.module.scss';
import {
  WALLET_POPUP_TAB,
  selectIsCryptoSelected,
  selectIsGameSelected,
  selectSelectedPaymentMethod,
  selectWalletPopupOpen,
  selectWalletPopupTab,
  walletPopupActions,
} from '../../../store/slices/walletPopupSlice';
import { WalletPopupTabs } from './WalletPopupTabs/WalletPopupTabs';
import { TabCoupons } from './TabCoupons/TabCoupons';
import { TabReferrals } from './TabReferrals/TabReferrals';
import clsx from 'clsx';
import { TabDeposit } from './TabDeposit/TabDeposit';
import { TabWithdrawal } from './TabWithdraw/TabWithdraw';
import { useWalletPopup } from '../../../hooks/useWalletPopup';
import { useEffect } from 'react';
import { WithdrawItems } from './WithdrawItems/WithdrawItems';
import { CARD_TYPE, PAYMENT_TYPE_GAME } from '../../../types/payment.types';
import { DepositRustItems } from './DepositRustItems/DepositRustItems';

export const WalletPopup = () => {
  const dispatch = useDispatch();
  const { close } = useWalletPopup();
  const isOpen = useSelector(selectWalletPopupOpen);
  const tab = useSelector(selectWalletPopupTab);
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);
  const isCryptoSelected = useSelector(selectIsCryptoSelected);
  const isGameSelected = useSelector(selectIsGameSelected);

  useEffect(() => {
    dispatch(walletPopupActions.toggleSelectedPaymentMethod(null));
  }, [isOpen, tab, dispatch]);

  const tabMap = {
    [WALLET_POPUP_TAB.DEPOSIT]: TabDeposit,
    [WALLET_POPUP_TAB.WITHDRAW]: TabWithdrawal,
    [WALLET_POPUP_TAB.COUPONS]: TabCoupons,
    [WALLET_POPUP_TAB.REFERRALS]: TabReferrals,
  };

  const TabComponent = tabMap[tab];

  const isSmallModal = () => {
    let check = false;

    if (!check) {
      check = [WALLET_POPUP_TAB.COUPONS, WALLET_POPUP_TAB.REFERRALS].includes(
        tab
      );
    }

    if (!check) {
      check =
        isCryptoSelected ||
        [CARD_TYPE.CREDIT_CARD, CARD_TYPE.GIFT_CARD].includes(
          selectedPaymentMethod as CARD_TYPE
        );
    }

    return check;
  };

  return (
    <Modal
      show={isOpen}
      onClose={() => close()}
      className={clsx(
        styles.modal,
        {
          [styles.smallModal]: isSmallModal(),
          [styles.gameSelectedModal]: isGameSelected,
          [styles.withMethodSelected]: Boolean(selectedPaymentMethod),
        }
      )}
      contentClassName={styles.modalContent}
    // renderFooter={() => <WalletPopupFooter />}
    >
      <div>
        {isGameSelected && tab === WALLET_POPUP_TAB.WITHDRAW && (
          <WithdrawItems />
        )}
        {selectedPaymentMethod === PAYMENT_TYPE_GAME.RUST &&
          tab === WALLET_POPUP_TAB.DEPOSIT && <DepositRustItems />}
        {!isGameSelected && (
          <>
            <WalletPopupTabs />
            <TabComponent />
          </>
        )}
      </div>
    </Modal>
  );
};
