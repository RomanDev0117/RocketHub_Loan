import { useDispatch } from 'react-redux';
import { appActions } from '../store/slices/appSlice';
import { selectIsLoggedIn } from '../store/slices/userSlice';
import { getAppState } from '../store';

export const useLoginPopup = () => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(appActions.setLoginPopupOpen(false));
  };
  const open = () => {
    dispatch(appActions.setLoginPopupOpen(true));
  };

  const openIfNeeded = (cb: any) => (...args: any) => {
    const isLoggedIn = selectIsLoggedIn(getAppState());

    if (!isLoggedIn) {
      open();
      return;
    }

    cb(...args);
  };

  return {
    close,
    open,
    openIfNeeded,
  };
};
