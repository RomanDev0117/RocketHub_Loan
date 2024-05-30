import {rockethubApi} from '.';
import {
  TGetFeatureFlagResponse,
  TUpdateFeatureFlagRequest,
  TUpdateFeatureFlagSuccessResponse
} from '../../../types/api/api.types';

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query<TGetFeatureFlagResponse, void>({
      query: () => ({
        url: '/featureFlags',
        method: 'GET',
      }),
    }),
    updateFeatureFlag: builder.mutation<
        TUpdateFeatureFlagSuccessResponse,
        { featureFlagType: string, body: TUpdateFeatureFlagRequest }
    >({
      query: ({featureFlagType, body}) => ({
        url: `/featureFlags/${featureFlagType}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFeatureFlagsQuery,
  useUpdateFeatureFlagMutation,
} = extendedApi;