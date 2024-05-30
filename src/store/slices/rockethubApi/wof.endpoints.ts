

import { rockethubApi } from '.';
import { WOFColor } from '../../../types/wheelOfFortune.types';

const wofApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    placeWOFBet: builder.mutation<void, { amount: number; color: WOFColor }>({
      query: ({ amount, color }) => ({
        url: '/wof/placebet',
        body: {
          amount,
          color,
        }
      }),
    }),
    getCurrentWOF: builder.query<void, void>({
      query: () => ({
        url: '/wof/getcurrentcof',
      })
    })
  }),
  overrideExisting: false,
});

export const { usePlaceWOFBetMutation, useGetCurrentWOFQuery } = wofApi;
