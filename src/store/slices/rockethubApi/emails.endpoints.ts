import { rockethubApi } from '.';
import {
  TErrorResponse,
  TSimpleSuccessResponse
} from '../../../types/api/api.types';

export const extendedEmailsApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    emailVerify: builder.mutation<
      TSimpleSuccessResponse | TErrorResponse,
      string
    >({
      query: (email) => ({
        url: '/emails/verify',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useEmailVerifyMutation,
} = extendedEmailsApi;
