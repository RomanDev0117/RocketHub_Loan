import clsx from 'clsx';
import { useCasesOptions } from '../../hooks/useCasesOptions';
import useTranslation from '../../hooks/useTranslation';
import { CASE_SORT_BY, GAME_TYPE } from '../../types/caseTypes';
import { Dropdown } from '../Dropdown/Dropdown';
import { TextField } from '../Form/TextField/TextField';
import { SearchIcon } from '../icons/SearchIcon';
import styles from './CaseFilters.module.scss';
import { DropdownPriceRange } from '../DropdownPriceRange/DropdownPriceRange';
import { DropdownOrderBy } from '../DropdownOrderBy/DropdownOrderBy';

type TProps = {
  className?: string;
  gameType: GAME_TYPE;
  onGameTypeChange: (gameType: GAME_TYPE) => void;
  sort: CASE_SORT_BY;
  onSortChange: (sort: CASE_SORT_BY) => void;
  search: string;
  onSearchChange: (search: string) => void;
  gameSpecific: string;
  dropdownZIndex?: number;
  setGameSpecific: (s: string) => void;
  priceFilter: {
    min: number;
    max: number;
  };
  onPriceFilterChange: (priceFilter: { min: number; max: number }) => void;
};

export const CaseFilters = ({
  className,
  gameType,
  onGameTypeChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  dropdownZIndex,
  priceFilter,
  onPriceFilterChange,
}: TProps) => {
  const { t } = useTranslation();
  const { gameTypeOptions, } = useCasesOptions();


  return (
    <div className={clsx(styles.container, className)}>

      <Dropdown
        options={gameTypeOptions}
        value={gameType}
        onChange={(t) => onGameTypeChange(t as GAME_TYPE)}
        placeholderProps={{ className: styles.dropdownPlaceholder }}
        zIndex={dropdownZIndex}
        className={clsx(styles.dropdown, styles.gameTypeDropdown)}
      />

      <DropdownPriceRange
        value={priceFilter}
        onChange={onPriceFilterChange}
        zIndex={2000}
        className={clsx(styles.dropdown, styles.priceDropdown)}
      />



      <DropdownOrderBy
        value={sort}
        onChange={(s) => onSortChange(s as CASE_SORT_BY)}
        placeholderProps={{ className: styles.dropdownPlaceholder }}
        zIndex={dropdownZIndex}
        className={clsx(styles.dropdown, styles.orderByDropdown)}
      />


      <TextField
        className={styles.searchField}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t({ id: 'common.SearchCase', defaultMessage: 'Search case...' })}
        append={<SearchIcon />}
      />
    </div>
  );
};
