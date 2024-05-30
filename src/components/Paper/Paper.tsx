import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './Paper.module.scss';

type TProps = HTMLAttributes<HTMLDivElement> & {
  column?: boolean;
}

export const Paper = ({ column, className, ...rest }: TProps) => {
  return (
    <div {...rest} className={clsx(styles.container, className)} style={{
      flexDirection: column ? 'column' : undefined,
    }} />
  );
};