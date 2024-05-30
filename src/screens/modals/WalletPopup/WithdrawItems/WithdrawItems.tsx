import { useSelector } from 'react-redux';
import { selectSelectedPaymentMethod } from '../../../../store/slices/walletPopupSlice';
import { PAYMENT_TYPE_GAME } from '../../../../types/payment.types';
import { WithdrawRust } from './WithdrawRust';
import { WithdrawCSGO } from './WithdrawCSGO';
import {
  Title1,
} from '../../../../components/Typography/Typography';

export const WithdrawItems = () => {
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);

  switch (selectedPaymentMethod) {
    case PAYMENT_TYPE_GAME.CS_GO:
      return <WithdrawCSGO />;
    case PAYMENT_TYPE_GAME.RUST:
      return <WithdrawRust />;
    default:
      return (
        <Title1
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Coming soon...
        </Title1>
      );
  }
};
