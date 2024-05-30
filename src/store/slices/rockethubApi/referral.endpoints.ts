import { rockethubApi } from '.';
import {
  TCollectEarningsResponse,
  TErrorResponse,
  TGetAffiliateDataResponse,
  TGetUserReferralsResponse,
} from '../../../types/api/api.types';

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getAffiliateData: builder.query<TGetAffiliateDataResponse, void>({
      query: () => ({
        url: '/user/affdata',
      }),
      providesTags: ['AffiliateData'],
    }),
    useReferralCode: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `/user/useCode/${code}`,
      }),
    }),
    collectEarnings: builder.mutation<
      TCollectEarningsResponse | TErrorResponse,
      void
    >({
      query: () => ({
        url: '/user/collectEarnings',
      }),
      invalidatesTags: ['AffiliateData'],
    }),

    getReferralList: builder.query<
      TGetUserReferralsResponse,
      { page: number; perPage: number }
    >({
      query: ({ page, perPage }) => ({
        method: 'GET',
        url: `/users/referrals?page=${page}&per_page=${perPage}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAffiliateDataQuery,
  useUseReferralCodeMutation,
  useCollectEarningsMutation,
  useGetReferralListQuery,
} = extendedApi;
