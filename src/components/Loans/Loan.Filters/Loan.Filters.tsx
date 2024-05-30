import { DropdownOrderBy } from "@/components/DropdownOrderBy/DropdownOrderBy";
import { useCasesOptions } from "../../../hooks/useCasesOptions";
import { GAME_TYPE, SORT_BY } from "../../../types/caseTypes";
import { Dropdown } from "../../Dropdown/Dropdown";
import { TextField } from "../../Form/TextField/TextField";
import { SearchIcon } from "../../icons/SearchIcon";
import styles from "./Loan.Filters.module.scss";

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

export const LoanFilters = ({
  gameType,
  onGameTypeChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
}: TProps) => {
  const { gameTypeOptions } = useCasesOptions();
  const filteredGameTypeOptions = gameTypeOptions.filter(
    (option) => option.value !== GAME_TYPE.ALL.toString()
  );

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <DropdownOrderBy
          value={sort}
          onChange={(s) => onSortChange(s as SORT_BY)}
          zIndex={2000}
          className={styles.orderByDropdown}
        />
        <div className={styles.refreshBox}>
          <img src="/images/loans/refresh.png" alt="loan logo" />
        </div>
        <Dropdown
          options={filteredGameTypeOptions}
          value={gameType}
          onChange={(t) => onGameTypeChange(t as GAME_TYPE)}
          placeholderProps={{ className: styles.dropdownPlaceholder }}
          zIndex={2000}
          className={styles.gameTypeDropdown}
        />
      </div>
      <TextField
        className={styles.searchField}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search item"
        prepend={<SearchIcon />}
      />
    </div>
  );
};
