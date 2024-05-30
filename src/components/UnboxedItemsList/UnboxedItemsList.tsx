import clsx from 'clsx';
import { TUnboxedItemProps, UnboxedItem } from '../UnboxedItem/UnboxedItem';
import styles from './UnboxedItemsList.module.scss';

type TProps = {
  caseItems: TUnboxedItemProps['item'][];
  itemProps?: Partial<TUnboxedItemProps>;
  className?: string;
};

export const UnboxedItemsList = ({ caseItems, itemProps, className }: TProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.grid}>
        {caseItems.map((item, idx) => {
          return (
            <UnboxedItem
              {...itemProps}
              key={idx}
              item={item}
              className={styles.gridItem}
            />
          );
        })}
      </div>
    </div>
  );
};
