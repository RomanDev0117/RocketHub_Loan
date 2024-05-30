import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Image, Modal, ModalTitle } from 'react-bootstrap';
import { CLOSE_ICON } from '../../constants/assetConstants';
import Button from '../Button/Button';
import { ButtonV2 } from '../ButtonV2/ButtonV2';
import Loader from '../Loader/Loader';
import styles from './InfoDialogUI.module.scss';

// export type TProps = {
//   icon: 'info' | 'success' | 'delete' | 'confirmation' | 'error';
//   title: React.ReactNode;
//   buttonText: React.ReactNode;
//   cancelButtonText?: React.ReactNode;
//   contentContainerProps?: any;
//   closeable?: boolean;
//   onClose?: () => void;
//   onButtonClick: () => Promise<any> | void;
//   onCancelClick?: () => void;
// } & Omit<Omit<DialogProps, 'title'>, 'onClose'>;

export const InfoDialogUI = ({
  title,
  content,
  buttonText,
  cancelButtonText,
  onButtonClick,
  okBtnColor,
  onCancelClick,
  cancelBtnColor,
  onClose,
  icon,
  description,
  maxWidth,
  contentContainerProps,
  closeable = true,
  children,
  contentClassName,
  dialogClassName,
  bodyClassName,
  size = 'md',
  preventClose,
  okBtnClassName,
  okButtonProps,
  loader,
  hideTitle,
  theme,
  fitContent,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const isV2 = theme === 'v2';
  okBtnColor = isV2 ? 'primary' : 'warning';
  cancelBtnColor = isV2 ? 'dark' : 'secondary';

  const handleButtonClick = async (e) => {
    setLoading(true);
    // TODO: work on this logic
    await onButtonClick?.(e);
    try {
      setLoading(false);
    } catch (e) {
      // it will fail only when component was unmounted, ignore this error
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [rest.open]);

  const showCancelButton = Boolean(onCancelClick);
  const showOkButton = Boolean(buttonText && onButtonClick);

  const handleClose = preventClose ? undefined : onClose;
  const showButtons = showCancelButton || showOkButton;
  return (
    <Modal
      onHide={handleClose}
      centered
      size={size}
      {...rest}
      backdropClassName={cx(rest.backdropClassName, styles.backdrop, isV2 && styles.v2Backdrop)}
      dialogClassName={cx(styles.modal, dialogClassName, theme && styles[`${theme}Theme`], fitContent && styles.fitContent)}
      contentClassName={cx(styles.content, contentClassName)}>
      <Modal.Body className={cx(styles.body, bodyClassName)}>
        <Loader position="absolute" loading={loading || loader} backdrop />
        {!hideTitle && (
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
            {description && <div className={styles.description}>{description}</div>}
            {closeable && onClose && (
              <button className={styles.close} onClick={handleClose}>
                <Image src={CLOSE_ICON} />
              </button>
            )}
          </div>
        )}

        {content}
        {children}

        {!isV2 && showButtons && (
          <div className="d-flex justify-content-center gap-3 mt-4">
            {showCancelButton && (
              <Button color={cancelBtnColor} onClick={onCancelClick} className="w-100" size="xlg">
                {cancelButtonText}
              </Button>
            )}
            {showOkButton && (
              <Button
                variant="secondary"
                color={okBtnColor}
                size="xlg"
                onClick={handleButtonClick}
                className={`w-100 ${okBtnClassName}`}
                {...okButtonProps}>
                {buttonText}
              </Button>
            )}
          </div>
        )}

        {isV2 && showButtons && (
          <div className="d-flex justify-content-center gap-2 mt-3">
            {showCancelButton && (
              <ButtonV2 color={cancelBtnColor} onClick={onCancelClick} size="sm">
                {cancelButtonText}
              </ButtonV2>
            )}
            {showOkButton && (
              <ButtonV2 color={okBtnColor} onClick={handleButtonClick} size="sm" {...okButtonProps}>
                {buttonText}
              </ButtonV2>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InfoDialogUI;
