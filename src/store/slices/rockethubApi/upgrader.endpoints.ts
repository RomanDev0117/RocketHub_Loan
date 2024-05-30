import { rockethubApi } from '.';
import { TUpgraderResponse } from '../../../types/api/api.types';
import { RollType } from '../../../types/upgrader.types';

type TUpgradeItem = {
  price: number;
};

type TUpgradeRequestData = {
  roll: RollType;
  betAmount: number;
  items: TUpgradeItem[];
};

const upgraderApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    upgrade: builder.mutation<TUpgraderResponse, TUpgradeRequestData>({
      query: (data) => ({
        url: '/upgrader',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpgradeMutation } = upgraderApi;
