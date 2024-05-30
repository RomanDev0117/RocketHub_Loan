import { useDispatch, useSelector } from 'react-redux';
import useTranslation from '../../../../hooks/useTranslation';
import {
  WALLET_POPUP_TAB,
  selectSelectedPaymentMethod,
  selectWalletPopupTab,
  walletPopupActions,
} from '../../../../store/slices/walletPopupSlice';
import styles from './WalletPopupTabs.module.scss';
import { BackButton } from '../../../../components/BackButton/BackButton';
import { useWalletPopupActions } from '../useWalletPopupActions';
import { TTabsHeaderItem, TabsHeader } from '../../../../components/TabsHeader/TabsHeader';

export const WalletPopupTabs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tab = useSelector(selectWalletPopupTab);
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);
  const { resetSelectedPaymentMethod } = useWalletPopupActions();

  const setTab = (tab: WALLET_POPUP_TAB) => {
    dispatch(walletPopupActions.setTab(tab));
  };

  const tabs: TTabsHeaderItem<WALLET_POPUP_TAB>[] = [
    {
      label: t({ id: 'common.Deposit', defaultMessage: 'Deposit' }),
      value: WALLET_POPUP_TAB.DEPOSIT,
    },
    {
      label: t({ id: 'common.Withdraw', defaultMessage: 'Withdraw' }),
      value: WALLET_POPUP_TAB.WITHDRAW,
    },
    {
      label: t({ id: 'common.Coupons', defaultMessage: 'Coupons' }),
      value: WALLET_POPUP_TAB.COUPONS,
    },
    {
      label: t({ id: 'common.Referrals', defaultMessage: 'Referrals' }),
      value: WALLET_POPUP_TAB.REFERRALS,
    },
  ];

  return (
    <div className={styles.root}>
      {selectedPaymentMethod && (
        <BackButton
          onClick={() => resetSelectedPaymentMethod()}
        />
      )}
      <TabsHeader
        className={styles.container}
        items={tabs}
        tab={tab}
        onChange={(tab) => setTab(tab)}
      />
    </div>
  );
};
