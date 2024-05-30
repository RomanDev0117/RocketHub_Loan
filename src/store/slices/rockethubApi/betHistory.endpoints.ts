import { TGetBetHistoryByTypeResponse } from '@/types/api/api.types';
import { rockethubApi } from '.';
import { BetHistoryType, TBetHistoryItem } from '@/types/betHistory.types';

const upgraderApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getBetHistoryByType: builder.query<
      TGetBetHistoryByTypeResponse,
      {
        type: BetHistoryType;
        steamId: string;
        page: number;
        perPage: number;
      }
    >({
      query: ({ type, steamId, page, perPage }) => ({
        url: `/bets/${type}/${steamId}?page=${page}&per_page=${perPage}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: any, _, { type }) => {
        if (response.success) {
          return {
            ...response,
            data: response.data.map((item: any) => {
              return {
                ...item,
                itemType: type,
              } as TBetHistoryItem;
            }),
          } as TGetBetHistoryByTypeResponse;
        }

        return response as TGetBetHistoryByTypeResponse;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetBetHistoryByTypeQuery } = upgraderApi;
