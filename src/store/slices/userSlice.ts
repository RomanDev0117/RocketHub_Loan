import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { TUser } from '../../types/userTypes';
import { DEFAULT_USER_AVATAR, MIN_USER_LEVEL } from '../../constants';
import { PA } from '../../types/utility.types';
import { getUserRank } from '../../utils/rank.utils';
import {
  getLevelColor,
  getLevelIcon,
  getNextLevelIcon,
} from '@utils/level.utils';
import { isAdmin, isModerator } from '@/utils/user.utils';

export type TUserState = {
  loading: boolean;
  user: TUser | null;
};

const initialState: TUserState = {
  loading: true,
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUserLoading: (state, action: PA<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state: TUserState, action: PA<TUserState['user']>) => {
      // if (window.location.hostname === 'localhost') {
      //   state.user = action.payload
      //     ? {
      //       ...action.payload,
      //       rank: UserType.Normal,
      //     }
      //     : null;
      //   return;
      // }

      state.user = action.payload;
    },
    updateUser: (state: TUserState, action: PA<Partial<TUser>>) => {
      state.user = {
        ...state.user,
        ...(action.payload as TUser),
      };
    },
    setBalance: (state: TUserState, action: PA<TUser['balance']>) => {
      if (!state.user) return;
      state.user.balance = action.payload;
    },
    setTickets: (state: TUserState, action: PA<TUser['tickets']>) => {
      if (!state.user) return;
      state.user.tickets = action.payload;
    },
    setEmailVerified: (state: TUserState, action: PA<TUser['emailVerified']>) => {
      if (!state.user) return;
      state.user.emailVerified = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUser = (state: TAppState) => state.user.user;
export const selectCurrentUser = selectUser;
export const selectIsLoggedIn = (state: TAppState) => {
  return Boolean(state.user?.user?.join_date);
};
export const selectUserBalance = (state: TAppState) =>
  state.user.user?.balance || 0;
export const selectUserTickets = (state: TAppState) =>
  state.user.user?.tickets || 0;
export const selectUserSeed = (state: TAppState) => state.user.user?.seed || '';
export const selectUserName = (state: TAppState) => state.user.user?.name || '';
export const selectUserLevel = (state: TAppState) =>
  state.user.user?.level || MIN_USER_LEVEL;
export const selectLevelColor = (state: TAppState) =>
  getLevelColor(selectUserLevel(state));
export const selectLevelIcon = (state: TAppState) =>
  getLevelIcon(selectUserLevel(state));
export const selectNextLevelIcon = (state: TAppState) =>
  getNextLevelIcon(selectUserLevel(state));
export const selectUserExperience = (state: TAppState) =>
  state.user.user?.exp || 0;
export const selectUserWagered = (state: TAppState) =>
  state.user.user?.wagered || 0;
export const selectUserId = (state: TAppState) => state.user.user?.id;
export const selectUserEmailVerified = (state: TAppState) => state.user.user?.emailVerified;
export const selectUserAvatar = (state: TAppState) =>
  state.user.user?.avatar || DEFAULT_USER_AVATAR;
export const selectUserSteamId = (state: TAppState) => state.user.user?.steamid;
export const selectUserTradeLink = (state: TAppState) =>
  state.user.user?.tradelink;
export const selectUserReferralCode = (state: TAppState) =>
  state.user.user?.code || '';
export const selectUserReferredBy = (state: TAppState) =>
  state.user.user?.referredBy || '';

export const selectUserRankConfig = (state: TAppState) =>
  getUserRank(state.user.user);

export const selectIsAdmin = (state: TAppState) => isAdmin(state.user.user);
export const selectIsModerator = (state: TAppState) =>
  isModerator(state.user.user);
// export const selectIsAdmin = (state: TAppState) => true;

export const selectUserEmail = (state: TAppState) => state.user.user?.email;
