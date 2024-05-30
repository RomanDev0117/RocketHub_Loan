import clsx from 'clsx';
import styles from './Button.module.scss';
import Loader from '../Loader/Loader';
import { MouseEvent, forwardRef, useState } from 'react';
import { isPromise } from '../../utils/app.utils';

// type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never

export type TButtonProps = {
  children?: React.ReactNode;
  className?: string;
  Component?: any;
  color?:
  | 'primary'
  | 'yellow'
  | 'secondary'
  | 'secondary-v2'
  | 'secondary-v3'
  | 'secondary-v4'
  | 'secondary-v5'
  | 'danger'
  | 'danger-v2'
  | 'purple';
  size?: 'xs' | 's' | 'm' | 'l' | 'huge';
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  rounded?: boolean | number;
  gap?: string | number;
  px?: string | number;
  pressable?: boolean;
  buttonStyle?: 'solid' | 'outlined' | 'flat';
  href?: string;
  loading?: boolean;
  fullWidth?: boolean;
  height?: number;
  end?: boolean;
  icon?: boolean;
  target?: string;
} & React.ButtonHTMLAttributes<any>; // & GetComponentProps<T>;
// TODO: work on this type

export const Button = forwardRef(
  (
    {
      Component,
      className,
      children,
      color = 'primary',
      buttonStyle = 'solid',
      pressable,
      size = 'm',
      append,
      prepend,
      rounded,
      gap,
      px,
      loading,
      fullWidth,
      icon,
      height,
      onClick,
      ...rest
    }: TButtonProps,
    ref
  ) => {
    const _Component = Component ?? ('button' as any);
    const [internalLoading, setInternalLoading] = useState(false);
    const _loading = loading || internalLoading;

    const cls = clsx(
      styles.button,
      className,
      styles[`${color}Color`],
      styles[`${size}Size`],
      styles[`${buttonStyle}Style`],
      {
        [styles.rounded]: typeof rounded === 'boolean' && rounded,
        [styles.pressable]: pressable,
        [styles.loading]: _loading,
        [styles.fullWidth]: fullWidth,
        [styles.iconOnly]: icon,
      }
    );

    const borderRadius = typeof rounded === 'number' ? rounded : undefined;

    // const loaderColor =
    //   color === 'primary' ? 'var(--grey-900)' : 'currentColor';

    return (
      <_Component
        ref={ref}
        type="button"
        className={cls}
        style={{
          gap,
          borderRadius,
          paddingLeft: px,
          paddingRight: px,
          ...(height && { '--height': `${height}px` }),
        }}
        to={rest.href}
        {...rest}
        onClick={async (e: MouseEvent<any>) => {
          if (_loading) {
            return;
          }

          const result = onClick?.(e);

          if (isPromise(result)) {
            setInternalLoading(true);
            await (result as any);
            setInternalLoading(false);
          }
        }}
      >
        {_loading && (
          <Loader
            position="absolute"
            size={20}
            thickness={2}
            color={'var(--loader-color)'}
          />
        )}
        <>
          {prepend && <span className={styles.prepend}>{prepend}</span>}
          {children}
          {append && <span className={styles.append}>{append}</span>}
        </>
      </_Component>
    );
  }
);
