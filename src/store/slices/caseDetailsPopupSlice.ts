import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { TCase } from '../../types/caseTypes';
import { PA } from '../../types/utility.types';

export type TCaseDetailsPopupState = {
  caseData: TCase | null;
  /*
    'open' - means that user will be able to open case inside a popup
    'details' - displays only details without possibility to open case
  */
  type: 'open' | 'details';
  cssVariablesVersion?: 2; // remove it when we migrate to new varibables
  hideItemRollChance?: boolean;
};

const initialState: TCaseDetailsPopupState = {
  caseData: null,
  type: 'details',
  cssVariablesVersion: undefined,
  hideItemRollChance: false,
};

const caseDetailsPopupSlice = createSlice({
  initialState,
  name: 'caseDetailsPopup',
  reducers: {
    setCaseData: (
      state,
      action: PA<{
        caseData: TCase;
        type: 'open' | 'details';
        cssVariablesVersion?: 2;
        hideItemRollChance?: boolean;
      } | null>
    ) => {
      state.caseData = action.payload?.caseData || null;
      state.type = action.payload?.type || 'details';
      state.cssVariablesVersion = action.payload?.cssVariablesVersion || undefined;
      state.hideItemRollChance = action.payload?.hideItemRollChance || false;
    },
  },
});

export const caseDetailsPopupActions = caseDetailsPopupSlice.actions;
export const caseDetailsPopupReducer = caseDetailsPopupSlice.reducer;

export const selectCaseData = (state: TAppState) =>
  state.caseDetailsPopup.caseData;
export const selectCaseDetailsPopupType = (state: TAppState) =>
  state.caseDetailsPopup.type;
export const selectCaseDetailsPopupCssVariablesVersion = (state: TAppState) =>
  state.caseDetailsPopup.cssVariablesVersion;

export const selectCaseDetailsPopupHideItemRollChance = (state: TAppState) => state.caseDetailsPopup.hideItemRollChance;