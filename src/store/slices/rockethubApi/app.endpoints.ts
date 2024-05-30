import { TNotAPaymentResponse } from '@/types/api/api.types';
import { rockethubApi } from '.';
import { TLevelDetails } from '../../../types/app.types';

const appApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getLevels: builder.query<TLevelDetails[], void>({
      query: () => ({
        url: '/levels',
        method: 'GET',
      }),
      keepUnusedDataFor: 60 * 60 * 24, // 24 hours
    }),
    getNotapaymentData: builder.query<
      TNotAPaymentResponse,
      void
    >({
      query: () => ({
        url: '/notapayment',
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const { useGetLevelsQuery, useGetNotapaymentDataQuery } = appApi;
