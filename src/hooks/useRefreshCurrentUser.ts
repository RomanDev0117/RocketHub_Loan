import { useLazyGetCurrentUserQuery } from '@/store/slices/rockethubApi/user.endpoints';
import { selectIsLoggedIn, userActions } from '@/store/slices/userSlice';
import { getToken } from '@/utils/auth.utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useRefreshCurrentUser = () => {
  const dispatch = useDispatch();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const refreshUserData = async () => {
    const result = await getCurrentUser();

    if (result.data?.user) {
      dispatch(userActions.setUser(result.data?.user));
    }
  };
  useEffect(() => {
    // refetch user data when user opens the page
    if (isLoggedIn || getToken()) {
      void refreshUserData();
    }
  }, []);
};
