import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { TUser } from '../../types/userTypes';
import { PA } from '../../types/utility.types';
import { TChatUser } from '../../types/chatTypes';
import { TDuelPlayer } from '../../types/caseTypes';

export type TAppReducerState = {
  socketActive: boolean;
  sidebarExpanded: boolean;
  chatOpen: boolean;
  notificationsOpen: boolean;
  loginPopupOpen: boolean;
  userDetailsPopupOpen: boolean;
  soundEnabled: boolean;
  rainVisible: boolean;
  vaultPopupOpen: boolean;
  userDetailsPopupUser: TUser | TChatUser | TDuelPlayer | null;
  userGestureDone: boolean; // checks if user has interacted with the page
};

const initialState: TAppReducerState = {
  socketActive: false,
  sidebarExpanded: false,
  chatOpen: false,
  notificationsOpen: false,
  loginPopupOpen: false,
  userDetailsPopupOpen: false,
  userDetailsPopupUser: null,
  vaultPopupOpen: false,
  soundEnabled: true,
  rainVisible: false,
  userGestureDone: false,
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setSocketActive: (state, action: PA<boolean>) => {
      state.socketActive = action.payload;
    },
    collapseSidebar: (state) => {
      state.sidebarExpanded = false;
    },
    toggleSoundEnabled: (state) => {
      const newValue = !state.soundEnabled;
      state.soundEnabled = newValue;
    },
    setUserGestureDone: (state) => {
      state.userGestureDone = true;
    },
    toggleSidebarExpanded: (state, action: PA<boolean | undefined>) => {
      const nextExpanded =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.sidebarExpanded;
      state.sidebarExpanded = nextExpanded;
    },
    toggleChatOpen: (state, action: PA<boolean | undefined>) => {
      const nextState =
        typeof action.payload === 'boolean' ? action.payload : !state.chatOpen;
      state.chatOpen = nextState;
    },
    toggleVaultOpen: (state, action: PA<boolean | undefined>) => {
      const nextState =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.vaultPopupOpen;
      state.vaultPopupOpen = nextState;
    },
    toggleNotificationsOpen: (state, action: PA<boolean | undefined>) => {
      const nextState =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.notificationsOpen;
      state.notificationsOpen = nextState;
    },
    setLoginPopupOpen: (state, action: PA<boolean>) => {
      state.loginPopupOpen = action.payload;
    },
    setRainVisible: (state, action: PA<boolean>) => {
      state.rainVisible = action.payload;
    },
    setUserDetailsPopupOpen: (state, action: PA<boolean>) => {
      state.userDetailsPopupOpen = action.payload;
    },
    setUserDetailsPopupUser: (
      state,
      action: PA<TUser | TChatUser | TDuelPlayer | null>
    ) => {
      state.userDetailsPopupUser = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;

export const selectSidebarExpanded = (state: TAppState) =>
  state.app.sidebarExpanded;

export const selecteSocketActive = (state: TAppState) => state.app.socketActive;
export const selectChatOpen = (state: TAppState) => state.app.chatOpen;
export const selectNotificationsOpen = (state: TAppState) =>
  state.app.notificationsOpen;
export const selectLoginPopupOpen = (state: TAppState) =>
  state.app.loginPopupOpen;
export const selectUserDetailsPopupOpen = (state: TAppState) =>
  state.app.userDetailsPopupOpen;
export const selectUserDetailsPopupUser = (state: TAppState) =>
  state.app.userDetailsPopupUser;
export const selectSoundEnabled = (state: TAppState) => state.app.soundEnabled;
export const selectUserGestureDone = (state: TAppState) =>
  state.app.userGestureDone;
export const selectRainVisible = (state: TAppState) => state.app.rainVisible;
export const selectVaultPopupOpen = (state: TAppState) =>
  state.app.vaultPopupOpen;

export const selectIsPossibleToPlaySound = (state: TAppState) => {
  return state.app.userGestureDone;
};
