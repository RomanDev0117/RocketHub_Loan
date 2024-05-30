import { accountLockPopupActions } from '@/store/slices/accountLockPopup.slice';
import { useDispatch } from 'react-redux';

export const useAccountLockPopup = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(accountLockPopupActions.open());
  };

  const close = () => {
    dispatch(accountLockPopupActions.close());
  };

  return {
    open,
    close,
    openAccountLockPopup: open,
    closeAccountLockPopup: close,
  };
};