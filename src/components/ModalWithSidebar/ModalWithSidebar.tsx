import clsx from 'clsx';

import styles from './ModalWithSidebar.module.scss';
import { Modal, TModalProps } from '../Modal/Modal';

type TProps = TModalProps & {
  sidebarContent: React.ReactNode;
  variant?: 'mobile-sidebar-top'
};

export const ModalWithSidebar = ({
  children,
  className,
  sidebarContent,
  variant = 'mobile-sidebar-top',
  ...rest
}: TProps) => {
  return (
    <Modal
      {...rest}
      className={clsx(styles.modal, className, {
        [styles.mobileSidebarTop]: variant === 'mobile-sidebar-top',
      })}
      contentClassName={styles.modalContent}
    >
      <div className={styles.mainContent}>{children}</div>
      <div className={styles.sidebar}>{sidebarContent}</div>
    </Modal>
  );
};
