import clsx from 'clsx';
import styles from './GenericTableUIElements.module.scss';

export const Table = (props: React.HTMLAttributes<HTMLTableElement>) => {
  return <table {...props} className={clsx(styles.table, props.className)} />;
};

export const TableBody = (props: React.HTMLAttributes<HTMLElement>) => {
  return <tbody {...props} className={clsx(styles.tbody, props.className)} />;
};

export const TableCell = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td {...props} className={clsx(styles.td, props.className)} />;
};

export const TableHeadCell = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <th {...props} className={clsx(styles.th, props.className)} />;
};

export const TableHead = (props: React.HTMLAttributes<HTMLElement>) => {
  return <thead {...props} className={clsx(styles.thead, props.className)} />;
};

export const TableRow = (props: React.HTMLAttributes<HTMLElement>) => {
  return <tr {...props} className={clsx(styles.tr, props.className)} />;
};

