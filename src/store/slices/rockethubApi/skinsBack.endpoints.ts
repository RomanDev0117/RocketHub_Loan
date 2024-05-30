import { rockethubApi } from '.';
import {
  TSkinsBackCsGoItem,
  TSkinsBackCsGoResponse,
  TSkinsBackFilterOption
} from '../../../types/skinsback.types';

const skinsBackApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    buySkinsbackItem: builder.mutation<
      { msg: string; boughtItems: TSkinsBackCsGoItem[] },
      string[]
    >({
      query: (ids) => ({
        url: '/skinsback/buy',
        body: {
          itemIds: ids,
        },
      }),
    }),

    getSkinsBackItems: builder.query<TSkinsBackCsGoItem[], TSkinsBackFilterOption>({
      query: (filterOption) => ({
        method: 'GET',
        url: `/skinsback/${filterOption.type}`,
        params: {
          minPrice: filterOption.minPrice,
          maxPrice: filterOption.maxPrice == Infinity ? 100000 : filterOption.maxPrice,
          sortOrder: filterOption.sortOrder,
          searchTerm: filterOption.searchTerm,
          page: filterOption.page,
          per_page: filterOption.per_page
        }
      }),
      transformResponse: (data: TSkinsBackCsGoResponse) => {
        if (Array.isArray(data.data)) {
          return (data.data).map((item) => {
            if (item.extra.exterior) {
              item.extra.exterior = item.extra.exterior
                .toUpperCase()
                .split(/[-\s]+/)
                .map((word) => word[0])
                .join('');
            }

            return item;
          });
        }
        return data.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSkinsBackItemsQuery, useBuySkinsbackItemMutation } =
  skinsBackApi;

export const useGetSkinsBackCsGoItemsQuery = (filterOption: TSkinsBackFilterOption) => {
  const { currentData, ...rest } = useGetSkinsBackItemsQuery(
    filterOption
  );

  return {
    currentData: (currentData as TSkinsBackCsGoItem[]) || [],
    ...rest,
  };
};
