import { CRYPTO_CURRENCY } from '../payment.types';

export type TSteamTransaction = {
  method: 'Rust Skins';
  id: string;
  time: number;
  value: number;
};

export type TCryptoTransaction = {
  method: CRYPTO_CURRENCY;
  id: string;
  time: number;
  value: number;
  valueCrypto: number;
};

export type TWaxpeerTransaction = {
  method: 'Waxpeer';
  id: number;
  time: number;
  value: number;
};
export type TSkinsbackTransaction = {
  method: 'Skinsback';
  id: string;
  time: number;
  value: string;
};
export type TStripeTransaction = {
  method: 'Stripe';
  id: string;
  value: number;
};

export type TBitInvestoryTransaction = {
  method: 'Bitinvestor';
  id: string;
  time: number;
  type: 'deposit';
  value: number;
};

export type TNotAPaymentTransaction = {
  method: 'NotAPayment';
  id: string;
  time: number;
  type: 'deposit';
  value: number;
};

export type TTipTransaction = {
  method: 'Tipping';
  id: string;
  time: string;
  value: number;
  recipientSteamid: string;
  tipperSteamid: string;
};

export type TZenTransaction = {
  method: 'Zen';
  id: string;
  time: number;
  type: 'deposit';
  value: number;
};
