// /api/v2/transactions/steam
// /api/v2/transactions/crypto
// /api/v2/transactions/waxpeer
// /api/v2/transactions/skinsback
// /api/v2/transactions/stripe

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../constants';
import { TPaginatedResponse } from '../../types/api/api.types';
import {
  TBitInvestoryTransaction,
  TCryptoTransaction,
  TNotAPaymentTransaction,
  TSkinsbackTransaction,
  TSteamTransaction,
  TStripeTransaction,
  TTipTransaction,
  TWaxpeerTransaction,
  TZenTransaction
} from '../../types/api/transactionApi.types';
import { TRANSACTION_TYPE } from '../../types/payment.types';

export const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query<
      TPaginatedResponse<
        | TCryptoTransaction
        | TSkinsbackTransaction
        | TBitInvestoryTransaction
        | TSteamTransaction
        | TStripeTransaction
        | TWaxpeerTransaction
        | TTipTransaction
        | TNotAPaymentTransaction
        | TZenTransaction
      >,
      {
        type: TRANSACTION_TYPE,
        page: number,
        perPage: number,
        steamId: string,
      }
    >({
      query: ({ type, page, perPage, steamId }) => ({
        url: `/api/v2/transactions/${type}?page=${page}&per_page=${perPage}&steamid=${steamId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useLazyGetTransactionsQuery } = transactionsApi;
