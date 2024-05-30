/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { logout } from '../utils/auth.utils';

/**
 * Log a warning and show a toast!
 */
export const authMiddleware: Middleware =
  () => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload?.status === 401) {
        logout({ type: 'soft'});
      }
    }

    return next(action);
  };