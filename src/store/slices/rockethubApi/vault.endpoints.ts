import {
  TSimpleSuccessResponse,
  TErrorResponse,
  TGetVaultResponse,
  TUpdateVaultRequestData,
} from '@/types/api/api.types';
import { rockethubApi } from '.';
import { TVault } from '@/types/vault.types';
import { toFixed } from '@/utils/number.utils';

export const vaultApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getVault: builder.query<TGetVaultResponse, void>({
      query: () => ({
        url: '/vault',
        method: 'GET',
      }),
      providesTags: ['Vault'],
    }),
    updateVault: builder.mutation<
      TSimpleSuccessResponse | TErrorResponse,
      TUpdateVaultRequestData
    >({
      query: (data) => ({
        url: '/vault',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(requestData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!data.success) {
            return;
          }

          dispatch(
            vaultApi.util.updateQueryData(
              'getVault',
              undefined,
              (vaultResponse) => {
                vaultResponse = vaultResponse || {};
                if (!vaultResponse.vault) {
                  const vault = {
                    amount: 0,
                    locked: false,
                  } as TVault;

                  vaultResponse.vault = vault;
                }

                let newAmount =
                  requestData.action === 'deposit'
                    ? vaultResponse.vault.amount + requestData.amount
                    : vaultResponse.vault.amount - requestData.amount;

                newAmount = Math.max(toFixed(newAmount), 0);

                return {
                  ...vaultResponse,
                  vault: {
                    ...vaultResponse.vault,
                    amount: newAmount,
                    locked: requestData.lock ?? vaultResponse.vault.locked,
                    // TODO: implement locked date
                  },
                };
              }
            )
          );
        } catch (e) {
          // not needed as wee will invalidate tags
        }
        setTimeout(() => {
          dispatch(vaultApi.util.invalidateTags(['Vault']));
        });
      },
    }),

    // get stake
    getStake: builder.query<TGetVaultResponse, string>({
      query: (steamId) => ({
        url: `/vault/${steamId}/stake`,
        method: 'GET',
      }),
      providesTags: ['Stake'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVaultQuery,
  useLazyGetVaultQuery,
  useUpdateVaultMutation,
  useGetStakeQuery,
} = vaultApi;
