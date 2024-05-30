// import { toast } from 'react-hot-toast';
import { dispatcher, getAppState } from '../store';
import { appActions } from '../store/slices/appSlice';
import { selectIsLoggedIn, userActions } from '../store/slices/userSlice';
import { deleteCookie } from './cookie.utils';

export const logout = ({ type }: { type?: 'soft' } = {}) => {
  const func = () => {
    dispatcher(userActions.setUser(null));
    localStorage.removeItem('token');
    deleteCookie('token');
    window.location.reload();
  };

  if (type === 'soft') {
    // toast.error('Unable to authenticate user. Please refresh page and login again. Page will be refreshed in 5 seconds', { id: 'LOGOUT_MESSAGE' });
    // setTimeout(func, 5000);
    func();
  } else {
    func();
  }
};

window.logout = logout;

export const getToken = () => {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (const element of cookieArray) {
    let cookie = element;
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  // localStorage.getItem('token')

  return null;
};

// it will open log in popup if user calls this popup and is not logged in
export const onlyLoggedIn = <T>(cb: T): T => {
  const isLoggedIn = selectIsLoggedIn(getAppState());

  return ((...args: any[]) => {
    if (!isLoggedIn) {
      dispatcher(appActions.setLoginPopupOpen(true));
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
    return cb(...args);
  }) as unknown as T;
};
