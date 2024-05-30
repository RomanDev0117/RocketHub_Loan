import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import { PA } from '../../types/utility.types';

export type TWOFState = {
  betAmount: string; // input value
};

const initialState: TWOFState = {
  betAmount: '',
};

const wheelOfFortune = createSlice({
  initialState,
  name: 'wof',
  reducers: {
    setBetAmount: (state, action: PA<string>) => {
      state.betAmount = action.payload;
    }
  },
});

export const wofActions = wheelOfFortune.actions;
export const wofReducer = wheelOfFortune.reducer;

export const selectWOFBetAmount = (state: TAppState) => state.wheelOfFortune.betAmount;
