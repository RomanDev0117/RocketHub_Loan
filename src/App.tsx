import { captureException } from '@sentry/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useMedia } from 'react-use';
import {
  NotificationsController,
} from './components/NotificationsController/NotificationsController.js';
import { ToastController } from './components/ToastController/ToastController.js';
import { useApplyReferralCodeAfterLogin } from './hooks/useApplyReferralCodeAfterLogin.js';
import { useIntercomUser } from './hooks/useIntercomUser.js';
import { useRefreshCurrentUser } from './hooks/useRefreshCurrentUser.js';
import { start as startInsolve, userApi } from './insolve-framework';
import { router } from './routes';
import { appActions, selecteSocketActive } from './store/slices/appSlice.js';
import { userActions } from './store/slices/userSlice.js';
import { TUser } from './types/userTypes.js';
import './utils/cookie.utils.js';
import { generateClientSeed } from './utils/user.utils.js';

export function App() {
  const dispatch = useDispatch();
  const isNoSidebar = useMedia('(max-width: 1400px)');
  useApplyReferralCodeAfterLogin();
  const socketActive = useSelector(selecteSocketActive);

  useEffect(() => {
    startInsolve('');
    dispatch(appActions.setSocketActive(true));

    // initially we want to show sidebar and chat on big screens
    if (!isNoSidebar) {
      dispatch(appActions.toggleChatOpen(true));
      dispatch(appActions.toggleSidebarExpanded(true));
    }
  }, []);

  useEffect(() => {
    // signed in event will be generated by socket
    userApi.on('signed in', (user: TUser) => {
      dispatch(userActions.setUser(user));

      if (!user?.seed) {
        const clientSeed = generateClientSeed();
        userApi
          .updateClientSeed(clientSeed)
          .then(() => {
            dispatch(userActions.updateUser({ seed: clientSeed }));
          })
          .catch((e) => {
            captureException(e);
          });
      }
    });

    userApi.on('balance', (balance: number) => {
      dispatch(userActions.setBalance(balance));
    });

    userApi.on('tickets', (tickets: number) => {
      dispatch(userActions.setTickets(tickets));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // wait for user gesture interaction to enable sounds
    const cb = () => {
      dispatch(appActions.setUserGestureDone());
    };

    window.addEventListener('click', cb);
    return () => {
      window.removeEventListener('click', cb);
    };
  }, []);

  // refresh user data
  useRefreshCurrentUser();

  useIntercomUser();

  if (!socketActive) {
    return null;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastController />
      <NotificationsController />
    </>
  );
}