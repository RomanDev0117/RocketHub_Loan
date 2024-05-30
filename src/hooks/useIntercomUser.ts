import { INTERCOM_APP_ID } from '@/constants';
import { selectCurrentUser, selectIsLoggedIn, selectUserEmail, selectUserId } from '@/store/slices/userSlice';
import { Intercom } from '@/utils/intercom.utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useIntercomUser = () => {
  const userId = useSelector(selectUserId);
  const email = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (userId) {
      Intercom('update', {
        user_id: userId
      });
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoggedIn) {
      Intercom('shutdown');
    } else {
      Intercom('boot', {
        app_id: INTERCOM_APP_ID,
        email: email || undefined,
        name: currentUser?.name,
        user_id: userId,
        created_at: new Date(),
      });
    }
  }, [isLoggedIn, email]);
};
