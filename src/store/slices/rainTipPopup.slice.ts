import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';

export type TRainTipPopupState = {
  show: boolean;
};

const initialState: TRainTipPopupState = {
  show: false,
};

const rainTipPopup = createSlice({
  initialState,
  name: 'rainTipPopup',
  reducers: {
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    }
  },
});

export const rainTipPopupActions = rainTipPopup.actions;
export const rainTipPopupReducer = rainTipPopup.reducer;

export const selectRainTipPopupShow = (state: TAppState) => state.rainTipPopup.show;
