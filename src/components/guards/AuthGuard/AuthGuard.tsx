import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { ROUTE } from '../../../types/routeTypes';
import React from 'react';

type TProps = {
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}


const AuthGuard = ({ fallback }: TProps) => {
  // TODO: work on auth guard
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return fallback || <Navigate to={ROUTE.AUTH_GUARD_DEFAULT_FALLBACK} />;
  }
};

export default AuthGuard;
