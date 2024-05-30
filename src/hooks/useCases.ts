import { CASE_SORT_BY, GAME_TYPE, TCase } from '../types/caseTypes.js';
import { useGetCasesQuery } from '../store/slices/rockethubApi/case.endpoints.js';
import { useHandleApiError } from './useHandleApiError.js';
import { useMemo, useState } from 'react';
import { useGameType } from './useGameType.js';

type TArgs = {
  filter?: (cases: TCase[]) => TCase[];
  localStorage?: boolean;
  useApiHook?: typeof useGetCasesQuery;
};

const defaultFilter = (cases: TCase[]) => {
  return cases.filter((c) => !c.ticketCase && !c.dailyCase && !c.level);
};

export const useCases = ({
  filter = defaultFilter,
  localStorage = false,
  useApiHook = useGetCasesQuery,
}: TArgs = {}) => {
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Infinity,
  });
  const [sort, setSort] = useState(CASE_SORT_BY.PRICE_DESC);
  const [gameSpecific, setGameSpecific] = useState<string>('');
  const [search, setSearch] = useState('');


  const {
    currentData,
    isFetching: loading,
    isError,
    error,
  } = useApiHook();

  const { gameType, setGameType } = useGameType({ localStorage });

  useHandleApiError({
    data: currentData,
    isError,
    error,
  });

  // cases logic
  const cases = useMemo(() => {
    if (!currentData || !currentData.success) return [] as TCase[];
    return filter(currentData.data);
  }, [currentData, filter]);

  const filteredCases = useMemo(() => {
    let filteredCases = [...cases];

    if (search) {
      const normalizedSearch = search.trim().toLowerCase();
      filteredCases = filteredCases.filter((cd) =>
        cd.title.toLowerCase().includes(normalizedSearch)
      );
    }

    if (gameType !== GAME_TYPE.ALL) {
      filteredCases = filteredCases.filter(
        (caseData) => caseData.type === gameType
      );
    }

    const { min, max } = priceFilter;
    if (min !== 0 || max !== Infinity) {
      filteredCases = filteredCases.filter((item) => {
        const price = item.price;
        return price >= min && price <= max;
      });
    }

    filteredCases.sort((a, b) => {
      if (sort === CASE_SORT_BY.PRICE_ASC) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return filteredCases;
  }, [cases, sort, gameType, search, priceFilter]);

  return {
    cases: filteredCases,
    sort,
    gameType,
    setGameType,
    setSort,
    loading,
    search,
    setSearch,
    gameSpecific,
    setGameSpecific,
    allCases: cases,
    priceFilter,
    setPriceFilter,
  };
};
