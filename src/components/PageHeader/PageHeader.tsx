import clsx from 'clsx';
import { BackButton } from '../BackButton/BackButton';
import styles from './PageHeader.module.scss';

type TProps = {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  withBackButton?: boolean | string;
  gap?: number;
  mobileRow?: boolean;
}

export const PageHeader = ({ title, icon, children, withBackButton, mobileRow, gap }: TProps) => {
  return (
    <header className={clsx(styles.root, {
      [styles.mobileRow]: mobileRow,
    })}>
      <div className={styles.left}>
        {withBackButton && <BackButton>{withBackButton}</BackButton>}
        <h1 className={styles.title}>
          {icon && <span className={styles.iconContainer}>{icon}</span>}
          {title}
        </h1>
      </div>
      <div className={styles.childrenContainer} style={{ gap }}>
        {children}
      </div>
    </header>
  );
};