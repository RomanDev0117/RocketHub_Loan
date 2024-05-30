import { useDispatch } from 'react-redux';
import { walletPopupActions } from '../store/slices/walletPopupSlice';

export const useWalletPopup = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(walletPopupActions.setOpen(true));
  };

  const close = () => {
    dispatch(walletPopupActions.setOpen(false));
  };

  return {
    open,
    close,
    openWallet: open,
    closeWallet: close,
  };
};