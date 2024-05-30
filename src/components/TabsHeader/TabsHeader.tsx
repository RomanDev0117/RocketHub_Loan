import clsx from 'clsx';
import styles from './TabsHeader.module.scss';

export type TProps<T> = {
  items: TTabsHeaderItem<T>[];
  className?: string;
  tab: T;
  onChange: (tab: T) => void;
}

export type TTabsHeaderItem<T> = {
  label: React.ReactNode
  value: T;
}

export const TabsHeader = <T,>({ items, className, tab, onChange }: TProps<T>) => {
  return (
    <div className={clsx(styles.container, className)}>
      {items.map((item, idx) => {
        return (
          <button
            key={idx}
            className={clsx(styles.item, {
              [styles.itemActive]: item.value === tab,
            })}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};