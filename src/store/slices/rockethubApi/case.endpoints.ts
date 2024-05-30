import { rockethubApi } from '.';
import {
  TErrorResponse,
  TOpenCasesResponse,
  TSuccessResponse,
} from '../../../types/api/api.types';
import { TCase } from '../../../types/caseTypes';

type TGetCaseSuccessResponse = TSuccessResponse<{
  case: TCase;
  publicServerSeed: string;
}>;

type TGetCasesSuccessResponse = TSuccessResponse<TCase[]>;

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getCase: builder.query<TGetCaseSuccessResponse | TErrorResponse, string>({
      query: (caseId) => ({
        url: `/cases/getCase/${caseId}`,
      }),
    }),
    getCases: builder.query<TGetCasesSuccessResponse | TErrorResponse, void>({
      query: () => ({
        url: '/cases/getCases',
      }),
      providesTags: ['Cases'],
    }),
    openCases: builder.mutation<
      TOpenCasesResponse | TErrorResponse,
      { id: string; amount: number; fastOpen: boolean }
    >({
      query: ({ id, amount, fastOpen }) => ({
        url: `/cases/openSingleCase/${id}`,
        body: {
          caseAmount: amount,
          fastOpen,
        },
      }),
      invalidatesTags: ['UserRewards'],
    }),
    getRewardCases: builder.query<TSuccessResponse<TCase[]> | TErrorResponse, void>({
      query: () => ({
        url: '/cases/getCases/reward',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCaseQuery, useGetCasesQuery, useOpenCasesMutation, useGetRewardCasesQuery } =
  extendedApi;
