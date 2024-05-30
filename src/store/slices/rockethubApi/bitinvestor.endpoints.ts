import { rockethubApi } from '.';
import {
  TBitInvestorResponse,
} from '@/types/api/api.types.ts';

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getBitInvestor: builder.query<TBitInvestorResponse, void>({
      query: () => ({
        url: '/bitinvestor',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBitInvestorQuery } = extendedApi;
