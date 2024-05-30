import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../constants';
import { GetSteamItemsResponse } from '../../types/api/getSteamInventory.types';
import { getToken } from '../../utils/auth.utils';

export const steamItemsApi = createApi({
  reducerPath: 'steamItems',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getSteamItems: builder.query<
      GetSteamItemsResponse,
      {
        appId: string | number;
        forceNew?: boolean;
        isBot?: boolean;
      }
    >({
      query: ({ appId, forceNew = false, isBot = false }) => ({
        url: `/api/user/getSteamInventory/${appId}/${forceNew ? 1 : 0}/${isBot ? 1 : 0
          }`,
        method: 'POST',
        body: {
          token: getToken(),
        },
      }),
    }),
  }),
});

export const { useGetSteamItemsQuery } = steamItemsApi;
