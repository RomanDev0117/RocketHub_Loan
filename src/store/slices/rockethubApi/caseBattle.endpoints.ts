import { TErrorResponse, TSimpleSuccessResponse } from '@/types/api/api.types';
import { rockethubApi } from '.';

type TJoinSpectatorLoungeResponse = TSimpleSuccessResponse | TErrorResponse;

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    joinSpectatorLounge: builder.mutation<
      TJoinSpectatorLoungeResponse,
      {
        'id': string,
        'guess': number
      }
    >({
      query: (data) => ({
        url: '/spectatorLounge/join',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useJoinSpectatorLoungeMutation } = extendedApi;
