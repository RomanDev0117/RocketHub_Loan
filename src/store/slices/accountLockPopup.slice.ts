import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';

export type TAccountLockPopupState = {
  show: boolean;
};

const initialState: TAccountLockPopupState = {
  show: false,
};

const accountLockPopup = createSlice({
  initialState,
  name: 'accountLockPopup',
  reducers: {
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    }
  },
});

export const accountLockPopupActions = accountLockPopup.actions;
export const accountLockPopupReducer = accountLockPopup.reducer;

export const selectAccountLockPopupShow = (state: TAppState) => state.accountLockPopup.show;
