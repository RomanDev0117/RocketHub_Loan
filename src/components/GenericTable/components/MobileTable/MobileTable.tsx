import clsx from 'clsx';
import { Columns } from '../../genericTable.types';
import styles from './MobileTable.module.scss';

type TProps<T> = {
  items: T[];
  columnNames: string[];
  columns: Columns<T>;
  onItemClick?: (item: T, index: number) => void;
};

export const MobileTable = <T,>({
  items,
  columnNames,
  columns,
  onItemClick,
}: TProps<T>) => {
  const columnsArray = Object.entries(columns);

  return (
    <div className={styles.container}>
      {items.map((item, idx) => {
        const content = columnsArray.map(([key, column], idx) => {
          let content = null;

          if (typeof column === 'string' || typeof column === 'undefined') {
            content = item[key as keyof T];
          } else if (typeof column === 'function') {
            content = column(item, { isSmallDevice: true, idx });
          } else {
            throw new Error(`unsupported column type ${key}`);
          }

          const cellProps: any = {};

          // if (index === columnsArray.length - 1 && !actions) {
          //   cellProps.align = 'right';
          // }

          return (
            <div
              key={key}
              {...cellProps}
              className={clsx(styles.row, {
                [styles.clickable]: Boolean(onItemClick),
              })}
              onClick={() => onItemClick?.(item, idx)}
            >
              <div className={styles.name}>{columnNames[idx]}</div>
              <div className={styles.content}>{content as any}</div>
            </div>
          );
        });

        return (
          <div key={idx} className={styles.item}>
            {content}
          </div>
        );
      })}
    </div>
  );
};
