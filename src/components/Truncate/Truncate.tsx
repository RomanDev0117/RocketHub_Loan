import clsx from 'clsx';
import styles from './Truncate.module.scss';

export const Truncate = ({ className, ...rest }: React.HtmlHTMLAttributes<HTMLElement>) => {
  return (
    <span className={clsx(styles.root, className)} {...rest} />
  );
};