import { VirtuosoGrid } from 'react-virtuoso';
import { TUnboxedItemProps, UnboxedItem } from '../UnboxedItem/UnboxedItem';
import { forwardRef } from 'react';
import { isEmpty } from 'lodash';
import { TSteamItem } from '../../types/steam.types';
import { TWaxpeerItem } from '../../types/waxpeer.types';
import clsx from 'clsx';
import styles from './UboxedItemsVirtualList.module.scss';
import { TSkinsBackCsGoItem } from '../../types/skinsback.types';
import { TAdminCaseItem } from '../../types/admin.types';

type TProps<T> = {
  className?: string;
  items: T[];
  isSelected: (item: T) => boolean;
  // type: 'waxpeer' | 'steam';
  onItemClick?: (item: T) => void;
  getItemProps?: (item: T) => Partial<TUnboxedItemProps>;
  scrollEnded?: () => void;
};

export function UboxedItemsVirtualList<
  T extends TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem | TAdminCaseItem
>({ className, items, isSelected, onItemClick, getItemProps, scrollEnded }: TProps<T>) {

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      scrollEnded?.();
    }
  };

  return (
    <>
      {!isEmpty(items) && (
        <VirtuosoGrid
          className={clsx(styles.container, className)}
          totalCount={items.length}
          onScroll={handleScroll}
          components={{
            Item: ItemContainer as any,
            List: ListContainer as any,
          }}
          itemContent={(index) => {
            const item = items[index];

            return (
              <UnboxedItem
                onClick={() => onItemClick?.(item)}
                selected={isSelected(item)}
                item={item}
                selectedStyle="checkbox"
                {...getItemProps?.(item)}
              />
            );
          }}
        />
      )}
    </>
  );
}

const ListContainer = forwardRef((props: any, ref) => {
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

const ItemContainer = forwardRef((props: any, ref) => {
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
