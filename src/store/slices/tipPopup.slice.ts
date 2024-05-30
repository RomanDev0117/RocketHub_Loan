import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { TDuelPlayer } from '../../types/caseTypes';
import { PA } from '../../types/utility.types';
import { TUser } from '../../types/userTypes';
import { TChatUser } from '../../types/chatTypes';

export type TTipPopupState = {
  show: boolean;
  user?: TUser | TChatUser | TDuelPlayer | null;
};

const initialState: TTipPopupState = {
  show: false,
  user: null,
};

const tipPopup = createSlice({
  initialState,
  name: 'tipPopup',
  reducers: {
    open: (state, action: PA<{ user?: TUser | TChatUser | TDuelPlayer } | null>) => {
      state.user = action.payload?.user || null;
      state.show = true;
    },
    close: (state) => {
      state.user = null;
      state.show = false;
    }
  },
});

export const tipPopupActions = tipPopup.actions;
export const tipPopupReducer = tipPopup.reducer;

export const selectTipPopupShow = (state: TAppState) => state.tipPopup.show;
export const selectTipPopupUser = (state: TAppState) => state.tipPopup.user;
