import { memo } from 'react';
import Loader from '../../../../../../components/Loader/Loader';
import { UboxedItemsVirtualList } from '../../../../../../components/UboxedItemsVirtualList/UboxedItemsVirtualList';
import { useGetAllItemsQuery } from '../../../../../../store/slices/rockethubApi/admin.endpoints';
import styles from './ItemsList.module.scss';
import { TAdminCaseItem } from '../../../../../../types/admin.types';
import { CASE_SORT_BY, GAME_TYPE } from '../../../../../../types/caseTypes';
import { useFilterItems } from '../../../../../../hooks/useFilterItems';
import { TextField } from '../../../../../../components/Form/TextField/TextField';
import { SearchIcon } from '../../../../../../components/icons/SearchIcon';
import useTranslation from '../../../../../../hooks/useTranslation';
import { Dropdown } from '../../../../../../components/Dropdown/Dropdown';
import { priceRangeOptions } from '../../../../../../constants';
import { useCasesOptions } from '../../../../../../hooks/useCasesOptions';
import { Flex } from '../../../../../../components/Flex/Flex';

type TProps = {
  selectedNames: string[];
  type: GAME_TYPE | null;
  onSelect: (item: TAdminCaseItem) => void;
}

export const ItemsList = memo(({ selectedNames, onSelect, type }: TProps) => {
  const { t } = useTranslation();
  const { sortOptions } = useCasesOptions();
  // const [gameType, setGameType] = useState<GAME_TYPE>(type || GAME_TYPE.CSGO);
  const apiGameType = type === GAME_TYPE.RUST ? 'getRustItems' : 'getCsgoItems';
  const { currentData, isFetching } = useGetAllItemsQuery(apiGameType);




  const items = currentData?.success
    ? currentData.items : [];



  // no value item 
  // noValue: {
  //   border_color: '#dddddd',
  //   image: '/images/poo.png',
  //   market_hash_name: 'Poo Poo',
  //   prices: {
  //     safe: 0.01,
  //   },
  // },

  const {
    items: filteredItems,
    search,
    setSearch,
    sort,
    setSort,
    priceFilter,
    setPriceFilter,

  } = useFilterItems({
    items: items,
    searchKey: 'market_hash_name',
    sort: CASE_SORT_BY.PRICE_ASC,
    priceFilterEnabled: true,
  });

  const minMaxValue = `${priceFilter.min}-${priceFilter.max === Infinity ? '' : priceFilter.max
    }`;

  return (
    <div className={styles.container}>
      <Loader loading={isFetching} />
      <Flex container gap={12}>
        <TextField
          className={styles.searchField}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t({ id: 'common.Search', defaultMessage: 'Search' })}
          append={<SearchIcon />}
        />

        {/* <Dropdown
          options={gameTypeOptionsOnly}
          value={gameType}
          onChange={(t) => setGameType(t)}
          placeholderProps={{ className: styles.dropdownPlaceholder }}
        /> */}

        <Dropdown
          options={priceRangeOptions}
          value={minMaxValue}
          onChange={(v) => {
            const [min, max] = v.split('-');
            setPriceFilter({
              min: parseFloat(min),
              max: max ? parseFloat(max) : Infinity,
            });
          }}
          zIndex={2000}
          className={styles.dropdown}
        />
        <Dropdown
          options={sortOptions}
          value={sort}
          onChange={(s) => setSort(s as CASE_SORT_BY)}
          className={styles.dropdown}
          zIndex={2000}
        />
      </Flex>
      <UboxedItemsVirtualList
        className={styles.itemsGrid}
        items={filteredItems}
        isSelected={(item) => {
          return selectedNames.includes(item.market_hash_name.toLowerCase());
        }}
        onItemClick={(item) => onSelect(item)}
      />
    </div>
  );
});