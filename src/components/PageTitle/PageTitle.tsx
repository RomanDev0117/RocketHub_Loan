import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './PageTitle.module.scss';

export const PageTitle = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <h1 {...props} className={clsx(styles.title, props.className)} />
  );
};