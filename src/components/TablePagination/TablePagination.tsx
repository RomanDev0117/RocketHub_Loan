import clsx from 'clsx';
import { T } from '../../i18n/translate';
import { Flex } from '../Flex/Flex';
import { TablePaginationArrowLeft } from '../icons/TablePaginationArrowLeft';
import styles from './TablePagination.module.scss';

type TProps = {
  className?: string;
  total: number;
  page: number;
  perPage: number;
  perPageOptions: number[];
  onPageChange?: (page: number) => void;
};

export const TablePagination = ({
  className,
  total,
  page,
  perPage,
  // perPageOptions,
  onPageChange,
}: TProps) => {
  let start = 0;
  let end = 0;

  if (total > 0) {
    start = (page - 1) * perPage + 1;
    end = Math.min(start + perPage - 1, total);
  }

  const handleNextClick = () => {
    if (end >= total) return;
    onPageChange?.(page + 1);
  };

  const handlePrevClick = () => {
    if (start <= 1) return;
    onPageChange?.(page - 1);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <span className={styles.rowsText}>
        <T id="table.rowsPerPage" defaultMessage="Rows per Page:" /> {perPage}
      </span>

      <span className={styles.startEndText}>
        <T
          id="table.startEndOfMax"
          defaultMessage="{start}-{end} of {total}"
          values={{ start, end, total }}
        />
      </span>

      <Flex container alignItems="center" justifyContent="center">
        <span
          className={clsx(styles.arrowLeft, page === 1 && styles.disabled)}
          onClick={handlePrevClick}
        >
          <TablePaginationArrowLeft />
        </span>
        <span
          className={clsx(styles.arrowRight, end === total && styles.disabled)}
          onClick={handleNextClick}
        >
          <TablePaginationArrowLeft />
        </span>
      </Flex>
    </div>
  );
};
