import { createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import {
  CRYPTO_CURRENCY,
  PAYMENT_METHOD,
  PAYMENT_TYPE_GAME,
} from '../../types/payment.types';
import { createSetter } from '../../utils/redux.utils';
import { PAYMENT_CRYPTO, PAYMENT_GAMES } from '../../constants';
import { PA } from '../../types/utility.types';

export enum WALLET_POPUP_TAB {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  COUPONS = 'COUPONS',
  REFERRALS = 'REFERRALS',
}

export type TWalletPopupState = {
  open: boolean;
  tab: WALLET_POPUP_TAB;
  selectedPaymentMethod: PAYMENT_METHOD | null;
};

const initialState: TWalletPopupState = {
  open: false,
  tab: WALLET_POPUP_TAB.DEPOSIT,
  selectedPaymentMethod: null,
};

const walletPopupSlice = createSlice({
  initialState,
  name: 'walletPopup',
  reducers: {
    setOpen: createSetter('open'),
    setTab: createSetter('tab'),
    setSelectedPaymentMethod: createSetter('selectedPaymentMethod'),
    toggleSelectedPaymentMethod: (
      state: TWalletPopupState,
      action: PA<PAYMENT_METHOD | null>
    ) => {
      state.selectedPaymentMethod =
        state.selectedPaymentMethod === action.payload ? null : action.payload;
    },
  },
});

export const walletPopupActions = walletPopupSlice.actions;
export const walletPopupReducer = walletPopupSlice.reducer;

export const selectWalletPopupTab = (state: TAppState) => state.walletPopup.tab;

export const selectWalletPopupOpen = (state: TAppState) =>
  state.walletPopup.open;
export const selectSelectedPaymentMethod = (state: TAppState) =>
  state.walletPopup.selectedPaymentMethod;
export const selectIsCryptoSelected = (state: TAppState) =>
  PAYMENT_CRYPTO.includes(
    state.walletPopup.selectedPaymentMethod as CRYPTO_CURRENCY
  );
export const selectIsGameSelected = (state: TAppState) =>
  PAYMENT_GAMES.includes(
    state.walletPopup.selectedPaymentMethod as PAYMENT_TYPE_GAME
  );
