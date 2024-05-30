import { ReactNode } from 'react';
import { InfoCircleIconV2 } from '../icons/InfoCircleIconV2';
import styles from './DataLoadingError.module.scss';
import clsx from 'clsx';

export const DataLoadingError = ({
  children,
  placement,
}: {
  children: ReactNode;
  placement?: 'center';
}) => {
  return (
    <div className={clsx(styles.root, {
      [styles.center]: placement === 'center',
    })}>
      <InfoCircleIconV2 />
      {children}
    </div>
  );
};
