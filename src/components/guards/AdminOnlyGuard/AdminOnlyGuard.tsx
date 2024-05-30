import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectIsAdmin} from '../../../store/slices/userSlice.ts';
import {ROUTE} from '../../../types/routeTypes.ts';
import React from 'react';

type TProps = {
    fallback?: React.ReactNode;
    loadingFallback?: React.ReactNode;
}

const AdminOnlyGuard: React.FC = ({ fallback }: TProps) => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return fallback || <Navigate to={ROUTE.AUTH_GUARD_DEFAULT_FALLBACK} />;
  }

  return <Outlet />;
};

export default AdminOnlyGuard;