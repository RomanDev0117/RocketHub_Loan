/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

type UseTableResult<T> = {
  items: T[];
  perPage: number;
  page: number;
  loading: boolean;
  itemToRemove: T | null;
  selectedItems: T[];
  selectedItemsIds: string[];
  enableBulkActions: boolean;
  selectedSomeItems: boolean;
  selectedAllItemsOnThePage: boolean;

  setPage: (page: number) => void;
  setPerPage: (limit: number) => void;
  setItemToRemove: (item: T) => void;
  handleSelectAllItems: (checked: boolean) => void;
  handleSelectOneItem: (item: T) => void;
  handleItemRemove: () => void;
};

type UseTableArgs<T> = {
  items: T[];
  initialLimit: number;
  stateStrategy: 'state' | 'url';
  onItemRemove?: (item: T) => Promise<void>;
  disablePagination?: boolean;
  dynamicDataConfig?: TDynamicDataConfig;
};

type TDynamicDataConfig = {
  fetchData: any; // TODO function
  requestData?: any; // TODO object with params
  total: number;
}

export const useTable = <T extends ({ id: string })>(
  args: UseTableArgs<T>
): UseTableResult<T> => {
  const INITIAL_PAGE = 1;
  const {
    items = [],
    initialLimit,
    disablePagination,
    stateStrategy = 'url',
    dynamicDataConfig,
    onItemRemove,
  } = args;

  const prevDynamicDataConfig = useRef<TDynamicDataConfig | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const [itemToRemove, setItemToRemove] = useState<T | null>(null);
  const [counter, setCounter] = useState(1); // it's only for force updating and refetching dynamic data

  // const { enqueueSnackbar } = useSnackbar();

  const [searchParams, setSearchParams] = useSearchParams({
    page: `${INITIAL_PAGE}`,
    per_page: `${initialLimit}`,
  });

  const [page, setPage] = useState(
    parseInt(searchParams.get('page') as string)
  );
  const [perPage, setPerPage] = useState(
    parseInt(searchParams.get('per_page') as string)
  );

  useEffect(() => {
    if (!dynamicDataConfig) return;

    dynamicDataConfig.fetchData({
      ...dynamicDataConfig.requestData,
      perPage,
      page: page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, counter]);

  // update pagination when someone changes search/filter parameters
  const fetchDataDeps = dynamicDataConfig
    ? Object.values(dynamicDataConfig.requestData || {})
    : [];
  useEffect(() => {
    if (prevDynamicDataConfig.current) {
      // disable run on the first render
      handlePageChange(INITIAL_PAGE);
      setCounter(counter + 1);
    }

    prevDynamicDataConfig.current = dynamicDataConfig;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...fetchDataDeps]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    if (stateStrategy === 'url') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: `${nextPage}`,
      });
    }
  };

  const handleLimitChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(INITIAL_PAGE);

    if (stateStrategy === 'url') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        perPage: `${newPerPage}`,
        page: `${INITIAL_PAGE}`,
      });
    }
  };

  const applyPagination = (elems: T[]): T[] => {
    if (disablePagination) {
      return elems;
    }

    const start = (page - 1) * perPage;
    const end = (page - 1) * perPage + perPage;
    return elems.slice(start, end);
  };

  const paginatedItems = dynamicDataConfig ? items : applyPagination(items);

  const handleSelectAllItems = (checked: boolean): void => {
    if (checked) {
      setSelectedItemsIds(paginatedItems.map((item) => item.id));
      setSelectedItems(paginatedItems.map((item) => item));
    } else {
      setSelectedItemsIds([]);
      setSelectedItems([]);
    }
  };

  const handleSelectOneItem = (item: T): void => {
    const itemId: T['id'] = item.id;

    if (selectedItemsIds.includes(itemId)) {
      setSelectedItemsIds((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem.id !== itemId)
      );
    } else {
      setSelectedItemsIds((prevSelected) => [...prevSelected, itemId]);
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const enableBulkActions = selectedItems.length > 0;
  const selectedSomeItems =
    selectedItems.length > 0 && selectedItems.length < paginatedItems.length;
  const selectedAllItemsOnThePage =
    selectedItems.length === paginatedItems.length;

  const handleItemRemove = async () => {
    const item = itemToRemove;

    setLoading(true);
    setItemToRemove(null);

    try {
      await onItemRemove?.(item!);
    } catch (error: any) {
      toast.error(error?.message as string);
    }
    setLoading(false);
  };

  return {
    items: paginatedItems,
    perPage,
    page,
    loading,
    itemToRemove,
    selectedItems,
    selectedItemsIds,
    enableBulkActions,
    selectedSomeItems,
    selectedAllItemsOnThePage,

    setPage: handlePageChange,
    setPerPage: handleLimitChange,
    setItemToRemove,
    handleSelectAllItems,
    handleSelectOneItem,
    handleItemRemove,
  };
};
