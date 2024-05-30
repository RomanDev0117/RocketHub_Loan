import { useDispatch } from 'react-redux';
import { appActions } from '../store/slices/appSlice';

export const useVaultPopup = () => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(appActions.toggleVaultOpen(false));
  };
  const open = () => {
    dispatch(appActions.toggleVaultOpen(true));
  };

  return {
    close,
    open,
  };
};
