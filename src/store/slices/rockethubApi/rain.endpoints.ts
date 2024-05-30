import {
  TCreateSuccessResponse,
  TErrorResponse,
  TGetRainSuccessResponse,
} from '@/types/api/api.types';
import { rockethubApi } from '.';

export const rainApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getRain: builder.query<TGetRainSuccessResponse, void>({
      query: () => ({
        url: '/rain',
        method: 'GET',
      }),
    }),
    joinRain: builder.mutation<
      TCreateSuccessResponse | TErrorResponse,
      { userLevel: number; steamid: string }
    >({
      query: () => ({
        url: '/rain/join',
        method: 'PUT',
      }),
      async onQueryStarted(
        { userLevel, steamid },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              rainApi.util.updateQueryData('getRain', undefined, (rainData) => {
                if (rainData.activeRain.players.some((p) => p.steamid === steamid)) {
                  return rainData;
                }


                return {
                  ...rainData,
                  activeRain: {
                    ...rainData.activeRain,
                    players: [
                      ...rainData.activeRain.players,
                      { steamid, level: userLevel },
                    ],
                  },
                };
              })
            );
          }
        } catch (error) {
          // no need to do an update
        }
      },
    }),

    // tip rain
    tipRain: builder.mutation<TCreateSuccessResponse | TErrorResponse, number>({
      query: (tipAmount) => {
        return {
          url: '/rain/tip',
          method: 'PUT',
          body: {
            test: '2423',
            tipAmount,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRainQuery,
  useLazyGetRainQuery,
  useJoinRainMutation,
  useTipRainMutation,
} = rainApi;
