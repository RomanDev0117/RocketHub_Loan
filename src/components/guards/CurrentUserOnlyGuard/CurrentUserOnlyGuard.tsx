import { Navigate, Outlet, useParams } from 'react-router-dom';
import { selectIsAdmin, selectIsModerator, selectUserSteamId } from '../../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { ROUTE } from '../../../types/routeTypes';

type TProps = {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  userIdQueryParamName?: string;
}


const CurrentUserOnlyGuard = ({ fallback, userIdQueryParamName }: TProps) => {
  const params = useParams();
  const steamId = useSelector(selectUserSteamId);
  const isAdmin = useSelector(selectIsAdmin);
  const isModerator = useSelector(selectIsModerator);

  if (isAdmin || isModerator) {
    return <Outlet />;
  }

  if (userIdQueryParamName && params[userIdQueryParamName] !== steamId) {
    return fallback || <Navigate to={ROUTE.CURRENT_USER_GUARD_DEFAULT_FALLBACK} />;
  }
  return <Outlet />;
};

export default CurrentUserOnlyGuard;
