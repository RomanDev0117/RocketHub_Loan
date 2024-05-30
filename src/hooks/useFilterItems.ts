import { useMemo, useRef, useState } from 'react';
// import { ArrayElement } from '../types/utility.types';
import { ASC } from '../constants';
import { isAdminCaseItem, isWaxpeerItem } from '../utils/app.utils';
import { TSteamItem } from '../types/steam.types';
import { TWaxpeerItem } from '../types/waxpeer.types';
import { getWaxpeerItemPrice } from '../utils/waxpeer.utils';
import { TSkinsBackCsGoItem } from '../types/skinsback.types';
import { TAdminCaseItem } from '../types/admin.types';

type TArgs<T> = {
  items: T[] | null | undefined;
  searchKey?: keyof T;
  sort?: any;
  priceFilterEnabled?: boolean;
};

export function useFilterItems<T extends TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem | TAdminCaseItem>({
  items,
  searchKey,
  sort: defaultSort = '',
  priceFilterEnabled,
}: TArgs<T>) {
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Infinity,
  });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(defaultSort);
  const arrRef = useRef<T[]>([]);

  const _items = useMemo(() => {
    if (!Array.isArray(items)) return arrRef.current;

    let filteredItems: T[] = [...items];

    if (searchKey && search) {
      filteredItems = filteredItems.filter((item) => {
        const value: string =
          typeof item[searchKey] === 'string'
            ? (item[searchKey] as string)
            : '';
        return value.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (sort) {
      const [_key, _sortDirection] = sort.split('_');
      let getSortValue = (item: T): any => item[_key as keyof T];
      const sortDirection: string = _sortDirection;

      if (items[0] && isWaxpeerItem(items[0])) {
        getSortValue = (item: T) => (item as TWaxpeerItem).min;
      } else if (items[0] && isAdminCaseItem(items[0])) {
        getSortValue = (item: T) => (item as TAdminCaseItem).prices.safe;
      }

      filteredItems = filteredItems.sort((a, b) => {
        const aValue = getSortValue(a) as number;
        const bValue = getSortValue(b) as number;

        if (sortDirection.toUpperCase() === ASC) {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    if (priceFilterEnabled) {
      filteredItems = filteredItems.filter((item) => {
        const price = isWaxpeerItem(item)
          ? getWaxpeerItemPrice(item)
          : isAdminCaseItem(item)
            ? item.prices.safe
            : item.price;
        return price >= priceFilter.min && price < priceFilter.max;
      });
    }

    filteredItems;

    return filteredItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, searchKey, search, sort, priceFilter, priceFilterEnabled]);

  return {
    items: _items,
    search,
    setSearch,
    sort,
    setSort,
    priceFilter,
    setPriceFilter,
  };
}
