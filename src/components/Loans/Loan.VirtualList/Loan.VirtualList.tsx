import clsx from "clsx";
import { isEmpty } from "lodash";
import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { LoanItem } from "../Loan.Item/Loan.Item";
import styles from "./Loan.VirtualList.module.scss";

type TProps = {
  className?: string;
  items: any[];
  isSelected: (item: any) => boolean;
  onItemClick?: (item: any) => void;
  getItemProps?: (item: any) => Record<string, any>;
  isOffered?: boolean;
};

export function LoanVirtualList({
  className,
  items,
  isSelected,
  onItemClick,
  getItemProps,
  isOffered = false,
}: TProps) {
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
              <LoanItem
                onClick={() => onItemClick?.(item)}
                selected={isSelected(item)}
                item={item}
                {...getItemProps?.(item)}
                isOffered={isOffered}
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
