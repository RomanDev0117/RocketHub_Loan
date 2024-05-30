import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { PA } from '../../types/utility.types';
import { TSteamItem } from '../../types/steam.types';
import { TWaxpeerItem } from '../../types/waxpeer.types';
import { RollType } from '../../types/upgrader.types';

export type TUpgraderState = {
  selectedItems: (TSteamItem | TWaxpeerItem)[];
  rollType: RollType;
  popupOpened: boolean;
  isRotating: boolean;
};

const initialState: TUpgraderState = {
  selectedItems: [],
  rollType: RollType.Over,
  popupOpened: false,
  isRotating: false,
};

const upgrader = createSlice({
  initialState,
  name: 'upgrader',
  reducers: {
    selectItem: (state, action: PA<TSteamItem | TWaxpeerItem>) => {
      const ids = state.selectedItems.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    clearItemsSelection: (state) => {
      state.selectedItems = [];
    },
    setRollType: (state, action: PA<RollType>) => {
      state.rollType = action.payload;
    },
    toggleRollType: (state) => {
      state.rollType =
        state.rollType === RollType.Over ? RollType.Under : RollType.Over;
    },
    setIsRotating: (state, action: PA<boolean>) => {
      state.isRotating = action.payload;
    },
    openUpgraderPopup: (state) => {
      state.popupOpened = true;
    },
    closeUpgraderPopup: (state) => {
      state.popupOpened = false;
    },
  },
});

export const upgraderActions = upgrader.actions;
export const upgraderReducer = upgrader.reducer;

export const selectUpgraderSelectedItems = (state: TAppState) =>
  state.upgrader.selectedItems;
export const selectUpgraderRollType = (state: TAppState) =>
  state.upgrader.rollType;

export const selectUpgraderPopupOpened = (state: TAppState) => state.upgrader.popupOpened;
export const selectUpgraderIsRotating = (state: TAppState) => state.upgrader.isRotating;