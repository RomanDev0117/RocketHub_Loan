import { createPortal } from 'react-dom';
import styles from './TooltipBody.module.scss';
import clsx from 'clsx';

type TProps = {
  popperTooltip: any;
  children?: React.ReactNode;
  variant?: 'default' | 'minimal';
  bg?: string;
};

export const TooltipBody = ({ popperTooltip, children, variant, bg }: TProps) => {
  const { visible, getTooltipProps, setTooltipRef } = popperTooltip;
  if (!visible) return null;

  const tooltipProps = getTooltipProps({ className: 'tooltip-container' });
  return createPortal(
    <div
      ref={setTooltipRef}
      {...tooltipProps}
      className={clsx(styles.tooltip, {
        [styles.minimal]: variant === 'minimal',
      })}
      style={{
        background: bg,
        ...tooltipProps.style,
      }}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>,
    document.body
  );
};
