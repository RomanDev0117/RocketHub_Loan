import { useDispatch } from 'react-redux';
import { walletPopupActions } from '../../../store/slices/walletPopupSlice';

export const useWalletPopupActions = () => {
  const dispatch = useDispatch();

  const resetSelectedPaymentMethod = () => {
    dispatch(walletPopupActions.setSelectedPaymentMethod(null));
  };

  return {
    resetSelectedPaymentMethod,
  };
};