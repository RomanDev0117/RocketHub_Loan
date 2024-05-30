import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsModerator } from '../store/slices/userSlice';
import { useUserDetailsPopup } from './useUserDetailsPopup';
import { useNavigate } from 'react-router-dom';
import { getProfilePath } from '../utils/url.utils';
import { TUser } from '../types/userTypes';
import { TChatUser } from '../types/chatTypes';
import { TDuelPlayer } from '../types/caseTypes';

export const useUserClick = ({ user }: { user: TUser | TChatUser | TDuelPlayer }) => {
  const userDetailsPopup = useUserDetailsPopup();
  const isAdmin = useSelector(selectIsAdmin);
  const isModerator = useSelector(selectIsModerator);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isAdmin || isModerator) {
      navigate(getProfilePath(user.steamid));
    } else {
      userDetailsPopup.open(user);
    }
  };

  return handleUserClick;
};