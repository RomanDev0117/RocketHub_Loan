import { useDispatch } from 'react-redux';
import { tipPopupActions } from '../store/slices/tipPopup.slice';
import { TUser } from '../types/userTypes';
import { TChatUser } from '../types/chatTypes';
import { TDuelPlayer } from '../types/caseTypes';

export const useTipPopup = () => {
  const dispatch = useDispatch();

  const open = (data: { user?: TUser | TChatUser | TDuelPlayer } | null | void) => {
    dispatch(tipPopupActions.open(data || null));
  };

  const close = () => {
    dispatch(tipPopupActions.close());
  };

  return {
    open,
    close,
    openTipPopup: open,
    closeTipPopup: close,
  };
};