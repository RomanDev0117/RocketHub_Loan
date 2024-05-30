import { rockethubApi } from '.';
import { TCreateSuccessResponse, TErrorResponse, TGetUserCryptoAddressListResponse } from '../../../types/api/api.types';
import { CRYPTO_CURRENCY } from '../../../types/payment.types';

type GetCryptoExchangeResponse = {
  rocketBetsCoinAmount: string;
  success: boolean;
};

type GetCryptoAddressAndExchangeResponse = {
  success: true;
  address: string;
  price: number;
};

type GetCryptoAddressResponse = {
  address: string;
  success: true;
};

type TWithdrawCryptoRequestData = {
  amount: number;
  currency: CRYPTO_CURRENCY;
  address: string;
};

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getCryptoExchange: builder.query<
      GetCryptoExchangeResponse,
      { crypto: CRYPTO_CURRENCY }
    >({
      query: ({ crypto }) => ({
        url: '/crypto/exchange',
        method: 'POST',
        body: {
          currencyFrom: crypto.toUpperCase(),
          amount: 1,
          action: 'deposit',
        },
      }),
    }),
    getCryptoAddressAndExchange: builder.query<
      GetCryptoAddressAndExchangeResponse,
      { crypto: CRYPTO_CURRENCY, transactionType: 'deposit' | 'withdrawal' }
    >({
      query: ({ crypto, transactionType }) => ({
        url: `/crypto/address?currency=${crypto}&transactionType=${transactionType}`,
      }),
    }),

    getCryptoAddress: builder.query<
      GetCryptoAddressResponse,
      { crypto: CRYPTO_CURRENCY }
    >({
      query: ({ crypto }) => ({
        url: `/crypto/address?currency=${crypto}`,
      }),
    }),

    getCryptoPayAddressAndExchange: builder.query<
      GetCryptoAddressAndExchangeResponse,
      { crypto: CRYPTO_CURRENCY, transactionType: 'deposit' | 'withdrawal' }
    >({
      query: ({ crypto, transactionType }) => ({
        url: `/cryptopay/address?currency=${crypto}&transactionType=${transactionType}`,
      }),
    }),

    getCryptoPayAddress: builder.query<
      GetCryptoAddressResponse,
      { crypto: CRYPTO_CURRENCY }
    >({
      query: ({ crypto }) => ({
        url: `/cryptopay/address?currency=${crypto}`,
      }),
    }),
    
    withdrawCrypto: builder.mutation<any, TWithdrawCryptoRequestData>({
      query: (data) => ({
        url: '/crypto/withdraw',
        body: data,
      }),
    }),
    getUserCryptoAddressList: builder.query<TGetUserCryptoAddressListResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/crypto/withdrawalAddress',
      }),
      providesTags: ['UserCryptoAddressList'],
    }),
    addUserCryptoAddress: builder.mutation<
      any,
      { type: CRYPTO_CURRENCY; address: string; label: string }
    >({
      query: (data) => ({
        url: 'crypto/withdrawalAddress',
        method: 'POST',
        body: {
          ...data,
          type: data.type.toUpperCase(),
        },
      }),
      invalidatesTags: ['UserCryptoAddressList'],
    }),
    deleteUserCryptoAddress: builder.mutation<TCreateSuccessResponse | TErrorResponse, string>({
      query: (id) => ({
        url: '/crypto/withdrawalAddress',
        method: 'DELETE',
        body: {
          id,
        }
      }),
      invalidatesTags: ['UserCryptoAddressList'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCryptoExchangeQuery,
  useGetCryptoAddressQuery,
  useGetCryptoPayAddressQuery,
  useWithdrawCryptoMutation,
  useGetCryptoAddressAndExchangeQuery,
  useGetCryptoPayAddressAndExchangeQuery,

  // user crypto address
  useGetUserCryptoAddressListQuery,
  useAddUserCryptoAddressMutation,
  useDeleteUserCryptoAddressMutation,
} = extendedApi;
