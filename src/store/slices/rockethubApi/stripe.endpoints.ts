import { rockethubApi } from '.';

type CreateStripeCheckoutSessionResponse = {
  success: boolean;
  msg: string;
  sessionUrl: string;
};

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    createStripeCheckoutSession: builder.mutation<
      CreateStripeCheckoutSessionResponse,
      {
        usdAmount: number;
        email: string;
        policyAccepted: boolean;
      }
    >({
      query: ({ usdAmount, email, policyAccepted }) => ({
        url: '/stripe/create-checkout-session',
        body: {
          price: usdAmount,
          policyAccepted,
          email,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateStripeCheckoutSessionMutation } = extendedApi;
