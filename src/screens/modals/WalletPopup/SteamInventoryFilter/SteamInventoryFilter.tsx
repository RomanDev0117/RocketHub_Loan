import { BackButton } from '@/components/BackButton/BackButton';
import { DropdownOrderBy } from '@/components/DropdownOrderBy/DropdownOrderBy';
import { DropdownPriceRange } from '@/components/DropdownPriceRange/DropdownPriceRange';
import { MinMaxPriceField } from '@/components/Form/MinMaxPriceField/MinMaxPriceField';
import { TextField } from '@/components/Form/TextField/TextField';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SORT_BY } from '@/types/caseTypes';
import styles from './SteamInventoryFilter.module.scss';

type TProps = {
  onBackClick?: () => void;
  sort: SORT_BY;
  onSortChange: (sort: SORT_BY) => void;
  search: string;
  onSearchChange: (search: string) => void;
  priceFilter: {
    min: number;
    max: number;
  };
  onPriceFilterChange: (priceFilter: { min: number; max: number }) => void;
}

export const SteamInventoryFilter = ({
  sort,
  onSortChange,
  search,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  onBackClick,
}: TProps) => {

  return (
    <div className={styles.container}>
      {onBackClick && <BackButton onClick={onBackClick} className={styles.backButton} />}
      <TextField
        className={styles.searchField}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search item..."
        append={<SearchIcon />}
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
    </div>
  );
};