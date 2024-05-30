import { VirtuosoGrid } from 'react-virtuoso';
import { forwardRef } from 'react';
import { isEmpty } from 'lodash';
import clsx from 'clsx';
import styles from './Upgrader.VirtualList.module.scss';
import { TWaxpeerItem } from '../../../types/waxpeer.types';
import { TSteamItem } from '../../../types/steam.types';
import { UpgraderItem } from '../Upgrader.Item/Upgrader.Item';

type TProps<T> = {
  className?: string;
  items: T[];
  isSelected: (item: T) => boolean;
  onItemClick?: (item: T) => void;
  getItemProps?: (item: T) => Record<string, any>;
};

export function UpgraderVirtualList<T extends TWaxpeerItem | TSteamItem>({
  className,
  items,
  isSelected,
  onItemClick,
  getItemProps,
}: TProps<T>) {
  return (
    <>
      {!isEmpty(items) && (
        <VirtuosoGrid
          className={clsx(styles.container, className)}
          totalCount={items.length}
          components={{
            Item: ItemContainer as any,
            List: ListContainer as any,
          }}
          itemContent={(index) => {
            const item = items[index];

            return (
              <UpgraderItem
                onClick={() => onItemClick?.(item)}
                selected={isSelected(item)}
                item={item}
                {...getItemProps?.(item)}
              />
            );
          }}
        />
      )}
    </>
  );
}

export const ListContainer = forwardRef((props: any, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(props.className as string, styles.grid)}
      style={{
        ...props.style,
      }}
    />
  );
});

export const ItemContainer = forwardRef((props: any, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        ...props.style,
        // minWidth: '190px',
        // maxWidth: '270px',
        // padding: '0.35em',
      }}
    />
  );
});
