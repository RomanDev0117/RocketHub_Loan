import { useDispatch } from 'react-redux';
import { appActions } from '../store/slices/appSlice';
import { TChatUser } from '../types/chatTypes';
import { TUser } from '../types/userTypes';
import { TDuelPlayer } from '../types/caseTypes';

export const useUserDetailsPopup = () => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(appActions.setUserDetailsPopupOpen(false));
  };
  const open = (user: TUser | TChatUser | TDuelPlayer) => {
    dispatch(appActions.setUserDetailsPopupOpen(true));
    dispatch(appActions.setUserDetailsPopupUser(user));
  };

  return {
    close,
    open,
  };
};
