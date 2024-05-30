import { TGetDepositRewardsResponse } from '@/types/api/api.types';
import { rockethubApi } from '.';

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepositRewards: builder.query<TGetDepositRewardsResponse, void>({
      query: () => ({
        url: '/deposit/rewards',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDepositRewardsQuery,
} = extendedApi;
