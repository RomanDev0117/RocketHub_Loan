import { useDispatch, useSelector } from "react-redux";
import { WITHDRAW_CRYPTO, WITHDRAW_GAMES } from "../../../../constants";
import {
  selectSelectedPaymentMethod,
  walletPopupActions,
} from "../../../../store/slices/walletPopupSlice";
import {
  CARD_TYPE,
  CRYPTO_CURRENCY,
  PAYMENT_METHOD,
} from "../../../../types/payment.types";
import { PaymentMethods } from "../PaymentMethods/PaymentMethods";
import { WithdrawCrypto } from "../WithdrawCrypto/WithdrawCrypto";
import { WithdrawNoPaymentCo } from "../WithdrawNoPaymentCo/WithdrawNoPaymentCo";

export const TabWithdrawal = () => {
  const dispatch = useDispatch();
  const selected = useSelector(selectSelectedPaymentMethod);

  const handleMethodSelect = (paymentMethod: PAYMENT_METHOD) => {
    dispatch(walletPopupActions.toggleSelectedPaymentMethod(paymentMethod));
  };
  return (
    <>
      <PaymentMethods
        selected={selected}
        onSelect={handleMethodSelect}
        type="withdrawal"
        games={WITHDRAW_GAMES}
        crypto={WITHDRAW_CRYPTO}
        // cards={WITHDRAW_CARDS}
      />

      {CARD_TYPE.BANK_REVOLUT === selected && <WithdrawNoPaymentCo />}

      {WITHDRAW_CRYPTO.includes(selected as CRYPTO_CURRENCY) && (
        <WithdrawCrypto onCryptoChange={handleMethodSelect} />
      )}
    </>
  );
};
