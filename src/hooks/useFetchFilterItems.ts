import { useEffect, useState } from 'react';
// import { ArrayElement } from '../types/utility.types';
import { useGetSkinsBackCsGoItemsQuery } from '@/store/slices/rockethubApi/skinsBack.endpoints';
import { SORT_BY } from '@/types/caseTypes';
import { SkinsBackGameType, TSkinsBackCsGoItem } from '../types/skinsback.types';
import { useDebounce } from 'react-use';

export function useFetchFilterItems() {
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Infinity,
  });
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<SORT_BY>(SORT_BY.PRICE_DESC);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [items, setItems] = useState<TSkinsBackCsGoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useDebounce(
    () => {
      setSearchTerm(search);
    },
    500,
    [search]
  );

  const fetchResult = useGetSkinsBackCsGoItemsQuery({
    type: SkinsBackGameType.CSGO,
    minPrice: priceFilter.min,
    maxPrice: priceFilter.max,
    sortOrder: sort.split("_")[1],
    searchTerm: searchTerm,
    page: page,
    per_page: perPage
  });

  const updateData = () => {
    if (!fetchResult.isFetching && !fetchResult.isError) {
      let updateItems = [];
      if (page == 1) updateItems = fetchResult.currentData;
      else updateItems = [...items, ...fetchResult.currentData];
      setItems(updateItems);
    }
    setIsLoading(fetchResult.isFetching);
    setFetchError(fetchResult.isError);
  }

  useEffect(() => {
    updateData();
  }, [fetchResult.currentData])

  return {
    items,
    isLoading,
    fetchError,
    search,
    setSearch,
    sort,
    setSort,
    page,
    setPage,
    perPage,
    setPerPage,
    priceFilter,
    setPriceFilter,
  };
}
