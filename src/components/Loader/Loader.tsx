import { forwardRef } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import styles from './Loader.module.scss';
import clsx from 'clsx';
import { Portal } from '../Portal/Portal';

type TProps = {
  loading?: boolean;
  color?: string;
  thickness?: number;
  position?: 'absolute' | 'fixed' | 'relative' | 'sticky';
  as?: any;
  size?: number;
  children?: React.ReactNode;
  className?: string;
  backdrop?: boolean;
  backdropColor?: string;
  backdropClassName?: string;
  progressContainerClassName?: string;
  renderProgress?: () => React.ReactNode;
  portal?: boolean;
  zIndex?: number;
} & React.HTMLAttributes<HTMLDivElement>

export const Loader = forwardRef(
  (
    {
      loading,
      color,
      thickness,
      position,
      as,
      size,
      children,
      className,
      style,
      backdrop,
      backdropColor,
      backdropClassName,
      progressContainerClassName,
      renderProgress,
      portal,
      zIndex,
      ...rest
    }: TProps,
    ref
  ) => {
    if (typeof loading === 'undefined') {
      loading = true;
    }

    if (!loading && !children) return null;

    const Component = as || 'div';
    const isColor = backdropColor !== 'dark' && Boolean(backdropColor);

    const render = (
      <Component
        {...rest}
        ref={ref}
        className={clsx(
          styles.loaderV2,
          //   !children && backdrop && styles.backdrop,
          className,
          backdropColor === 'dark' && styles.backdropDark
        )}
        style={{
          position,
          zIndex,
          ...style,
        }}>
        {backdrop && loading && (
          <div
            className={clsx(styles.backdrop, backdropClassName)}
            style={{ background: isColor ? backdropColor : undefined }}></div>
        )}
        {loading && (
          <div className={clsx(styles.progressContainer, progressContainerClassName)}>
            {typeof renderProgress === 'function' ? (
              renderProgress()
            ) : (
              <CircularProgress size={size} color={color} thickness={thickness} />
            )}
          </div>
        )}
        {children}
      </Component>
    );

    if (portal) {
      return <Portal>{render}</Portal>;
    }

    return render;
  }
);

export default Loader;
