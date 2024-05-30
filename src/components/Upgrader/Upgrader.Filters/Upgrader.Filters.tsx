import clsx from 'clsx';
import { Dropdown } from '../../Dropdown/Dropdown';
import { TextField } from '../../Form/TextField/TextField';
import { SearchIcon } from '../../icons/SearchIcon';
import styles from './Upgrader.Filters.module.scss';
import { GAME_TYPE, SORT_BY } from '../../../types/caseTypes';
import { useCasesOptions } from '../../../hooks/useCasesOptions';
import { DropdownPriceRange } from '@/components/DropdownPriceRange/DropdownPriceRange';
import { MinMaxPriceField } from '@/components/Form/MinMaxPriceField/MinMaxPriceField';
import { DropdownOrderBy } from '@/components/DropdownOrderBy/DropdownOrderBy';

type TProps = {
  className?: string;
  gameType: GAME_TYPE;
  onGameTypeChange: (gameType: GAME_TYPE) => void;
  sort: SORT_BY;
  onSortChange: (sort: SORT_BY) => void;
  search: string;
  onSearchChange: (search: string) => void;
  dropdownZIndex?: number;
  priceFilter: {
    min: number;
    max: number;
  };
  onPriceFilterChange: (priceFilter: { min: number; max: number }) => void;
};

export const UpgraderFilters = ({
  className,
  gameType,
  onGameTypeChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
}: TProps) => {
  const { gameTypeOptions } = useCasesOptions();
  const filteredGameTypeOptiosn = gameTypeOptions.filter(
    (option) => option.value !== GAME_TYPE.ALL.toString()
  );

  return (
    <div className={clsx(styles.container, className)}>
      <Dropdown
        options={filteredGameTypeOptiosn}
        value={gameType}
        onChange={(t) => onGameTypeChange(t as GAME_TYPE)}
        placeholderProps={{ className: styles.dropdownPlaceholder }}
        zIndex={2000}
        className={styles.gameTypeDropdown}
      />

      <div className={styles.pricesContainer}>
        <MinMaxPriceField
          value={priceFilter}
          onChange={onPriceFilterChange}
          className={styles.priceFields}
        />

        <DropdownPriceRange
          value={priceFilter}
          onChange={onPriceFilterChange}
          zIndex={2000}
          className={styles.priceDropdown}
        />
      </div>
      <DropdownOrderBy
        value={sort}
        onChange={(s) => onSortChange(s as SORT_BY)}
        zIndex={2000}
        className={styles.orderByDropdown}
      />
      <TextField
        className={styles.searchField}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search item"
        append={<SearchIcon />}
      />
    </div>
  );
};
