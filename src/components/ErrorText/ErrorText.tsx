import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './ErrorTest.module.scss';

export const ErrorText = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={clsx(props.className, styles.container)} />;
};