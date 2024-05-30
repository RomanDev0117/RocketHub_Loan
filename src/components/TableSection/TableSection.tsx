import clsx from 'clsx';
import GenericTable, { GenericTableProps } from '../GenericTable/GenericTable';
import { NoDataMessage } from '../Typography/Typography';
import styles from './TableSection.module.scss';

type TProps<T, A> = {
  title?: React.ReactNode;
  className?: string;
  additionalInfo?: React.ReactNode;
  rightSlot?: React.ReactNode;
} & GenericTableProps<T, A>;

export const TableSection = <
  T extends { id: string },
  A extends Record<string, string>
>({
  title,
  additionalInfo,
  noData,
  className,
  rightSlot,
  ...tableProps
}: TProps<T, A>) => {
  return (
    <div className={clsx(styles.tableContainer, className)}>
      <header className={styles.tableHeader}>
        <h2 className={styles.title}>{title}</h2>
        {additionalInfo && <div className={styles.headerTimeNotice}>{additionalInfo}</div>}
        {rightSlot}
      </header>
      <GenericTable
        {...tableProps}
        noData={
          <NoDataMessage className={styles.noData}>{noData}</NoDataMessage>
        }
      />
    </div>
  );
};
