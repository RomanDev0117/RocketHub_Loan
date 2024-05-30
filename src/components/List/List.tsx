import { Link, To } from 'react-router-dom';
import styles from './List.module.scss';
import clsx from 'clsx';

type TProps = {
  items: (TItem | null)[];
  gap?: number | string;
  listItemClassName?: string;
  onlyIcons?: boolean;
  Component?: any;
  className?: string;
};

type TItem = {
  to?: To;
  label: React.ReactNode;
  icon?: React.ReactNode;
  Component?: any;
  className?: string;
};

export const List = ({
  className,
  items,
  gap,
  listItemClassName,
  onlyIcons,
  Component,
}: TProps) => {

  const openIntercom = () => {
    if (window.Intercom) {
      window.Intercom('show');
    }
  };

  return (
    <ul className={clsx(styles.list, className)} style={{ gap }}>
      {items.map((item, idx) => {
        if (!item) {
          return null;
        }

        const {
          to,
          label,
          icon,
          className,
          Component: ItemComponent,
          ...rest
        } = item;
        const _Component = ItemComponent || Component || Link;
        if (to == '')
          return (
            <li key={idx} onClick={openIntercom}>
              <div
                className={clsx(styles.listItem, listItemClassName, className)}
                {...rest}
              >
                <span className={styles.iconContainer}>{icon}</span>
                {!onlyIcons && <span>{label}</span>}
              </div>
            </li>
          )
        return (
          <li key={idx}>
            <_Component
              to={to!}
              className={clsx(styles.listItem, listItemClassName, className)}
              {...rest}
            >
              <span className={styles.iconContainer}>{icon}</span>
              {!onlyIcons && <span>{label}</span>}
            </_Component>
          </li>
        );
      })}
    </ul>
  );
};
