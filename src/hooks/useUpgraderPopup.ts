import { useDispatch } from 'react-redux';
import { upgraderActions } from '../store/slices/upgrader.slice';

export const useUpgraderPopup = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(upgraderActions.openUpgraderPopup());
  };

  const close = () => {
    dispatch(upgraderActions.closeUpgraderPopup());
    dispatch(upgraderActions.clearItemsSelection());
  };

  return {
    open,
    close,
    openUpgraderPopup: open,
    closeUpgraderPopup: close,
  };
};