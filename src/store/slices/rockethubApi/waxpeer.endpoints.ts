import { rockethubApi } from '.';
import { TWaxpeerItem } from '../../../types/waxpeer.types';
import { getExterior } from '../../../utils/waxpeer.utils';

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getWaxpeerItems: builder.query<TWaxpeerItem[], void>({
      query: () => ({
        url: '/waxpeer',
      }),
      transformResponse: (data) => {

        if (Array.isArray(data)) {
          return (data as TWaxpeerItem[]).map(item => {

            const { name, exterior } = getExterior(item);
            item.name = name;
            item.exterior = exterior;
            return item;

          });
        }
        return data as TWaxpeerItem[]; // TODO: check if it's correct
      }
    }),
  }),
  overrideExisting: false,
});

export const { useGetWaxpeerItemsQuery } = extendedApi;
