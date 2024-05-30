import { rockethubApi } from '.';
import {
  TGetGGRResponse,
  TPayoutsResponse,
  TPostStatisticsGGRRequest,
  TDailyRaceResponse
} from '../../../types/api/api.types';

const statisticsApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getDailyRace: builder.query<TDailyRaceResponse, void>({
      query: () => ({
        url: '/statistics/race',
      }),
    }),
    getStatisticsGGR: builder.query<TGetGGRResponse, TPostStatisticsGGRRequest>({
      query: (body) => ({
        url: '/statistics/ggr',
        method: 'POST',
        body: body,
      }),
    }),
    getPayoutsStats: builder.query<TPayoutsResponse, string>({
      query: (steamid) => ({
        url: `/statistics/payouts?steamid=${steamid}`,
        method: 'GET',
      }),
    })
  }),
  overrideExisting: false,
});

export const {
  useGetDailyRaceQuery,
  useGetStatisticsGGRQuery,
  useLazyGetStatisticsGGRQuery,
  useGetPayoutsStatsQuery
} = statisticsApi;
