import { rockethubApi } from '.';

type CreateZenCheckoutResponse = string;

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    createZenCheckout: builder.mutation<
      CreateZenCheckoutResponse,
      {
        usdAmount: number;
        email: string;
        policyAccepted: boolean;
      }
    >({
      query: ({ usdAmount, email, policyAccepted }) => ({
        url: '/zen/checkout',
        body: {
          amount: usdAmount,
          policyAccepted,
          email,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateZenCheckoutMutation } = extendedApi;
