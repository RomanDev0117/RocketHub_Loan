import clsx from 'clsx';
import ReactModal, {
  ModalProps,
  RenderModalBackdropProps,
} from 'react-overlays/Modal';
import styles from './Modal.module.scss';
import { CrossIcon } from '../icons/CrossIcon';
import { Fade } from './ModalAnimation';

export type TModalProps = Omit<ModalProps, 'children'> & {
  children: React.ReactNode;
  onClose: () => void;
  contentClassName?: string;
  renderFooter?: () => React.ReactNode;
  closeButtonClassName?: string;
  className?: string;
  stickyCloseButton?: 'sm' | 'md';
};

export const Modal = ({
  className,
  children,
  onClose,
  onBackdropClick,
  contentClassName,
  renderFooter,
  closeButtonClassName,
  stickyCloseButton,
  ...rest
}: TModalProps) => {
  const renderBackdrop = (p: RenderModalBackdropProps) => (
    <div {...p} className={clsx(styles.backdrop)} />
  );

  return (
    <ReactModal
      {...rest}
      transition={Fade as any}
      backdropTransition={Fade as any}
      renderBackdrop={renderBackdrop}
      className={clsx(styles.modal, className)}
      onBackdropClick={onBackdropClick || onClose}
    >
      <>
        <div className={clsx(styles.content, contentClassName)}>
          <button
            className={clsx(
              styles.closeButton,
              closeButtonClassName,
              styles[`${stickyCloseButton}Sticky`]
            )}
            onClick={() => onClose()}
          >
            <CrossIcon />
          </button>

          {children}
        </div>
        {renderFooter?.()}
      </>
    </ReactModal>
  );
};

export const ModalFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={clsx(props.className, styles.footer)} />;
};
