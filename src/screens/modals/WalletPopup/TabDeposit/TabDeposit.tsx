import { useDispatch, useSelector } from 'react-redux';
import {
  CARD_TYPE,
  CRYPTO_CURRENCY,
  PAYMENT_METHOD,
  PAYMENT_TYPE_GAME,
} from '../../../../types/payment.types';
import { PaymentMethods } from '../PaymentMethods/PaymentMethods';
import {
  selectSelectedPaymentMethod,
  walletPopupActions,
} from '../../../../store/slices/walletPopupSlice';
import {
  DEPOSIT_CARDS,
  DEPOSIT_CRYPTO,
  DEPOSIT_GAMES,
  SKINS_BACK_GAMES,
} from '../../../../constants';
import { DepositCrypto } from '../DepositCrypto/DepositCrypto';
import Loader from '../../../../components/Loader/Loader';
import { useState } from 'react';
import { userApi } from '../../../../insolve-framework';
import { toast } from 'react-hot-toast';
import { SkinsBackModal } from '../SkinsBackModal/SkinsBackModal';
import { DepositCreditCard } from '../DepositCreditCard/DepositCreditCard';
import { DepositGiftCard } from '../DepositGiftCard/DepositGiftCard';
import { DepositBitInvestor } from '@/screens/modals/WalletPopup/DepositBitInvestor/DepositBitInvestor.tsx';
import { DepositNotAPaymentCo } from '../DepositNotAPaymentCo/DepositNotAPaymentCo';

export const TabDeposit = () => {
  const dispatch = useDispatch();
  const selected = useSelector(selectSelectedPaymentMethod);
  const [loading, setLoading] = useState(false);
  const [skinsBackUrl, setSkinsBackUrl] = useState('');

  const handleMethodSelect = (paymentMethod: PAYMENT_METHOD) => {
    if (SKINS_BACK_GAMES.includes(paymentMethod as PAYMENT_TYPE_GAME)) {
      void openSkinsBack();
      return;
    }

    dispatch(walletPopupActions.toggleSelectedPaymentMethod(paymentMethod));
  };

  const openSkinsBack = async () => {
    setLoading(true);

    try {
      const url: string = await userApi.getSkinsBackLink();
      setSkinsBackUrl(url);
    } catch (e: any) {
      const msg: string =
        typeof e === 'string'
          ? e
          : e?.error?.toString?.() ||
          e?.toString?.() ||
          'Unexpected error... Please try again';
      toast.error(msg);
    }

    setLoading(false);
  };

  return (
    <>
      <Loader
        loading={loading}
        backdrop
        backdropColor="rgba(0, 0, 0, 0.5)"
        zIndex={100}
        position="absolute"
      />
      <PaymentMethods
        type="deposit"
        onSelect={handleMethodSelect}
        selected={selected}
        games={DEPOSIT_GAMES}
        cards={DEPOSIT_CARDS}
        crypto={DEPOSIT_CRYPTO}
      />
      {DEPOSIT_CRYPTO.includes(selected as CRYPTO_CURRENCY) && (
        <DepositCrypto onCryptoChange={handleMethodSelect} />
      )}
      {CARD_TYPE.CREDIT_CARD === selected && <DepositCreditCard />}
      {CARD_TYPE.GIFT_CARD === selected && <DepositGiftCard />}
      {CARD_TYPE.BIT_INVESTOR === selected && <DepositBitInvestor />}
      {CARD_TYPE.NOTAPAYMENT === selected && <DepositNotAPaymentCo />}

      <SkinsBackModal
        show={Boolean(skinsBackUrl)}
        onClose={() => setSkinsBackUrl('')}
        url={skinsBackUrl}
      />
    </>
  );
};
