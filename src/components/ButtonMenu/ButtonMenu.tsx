import clsx from 'clsx';
import { Button, TButtonProps } from '../Button/Button';
import styles from './ButtonMenu.module.scss';

export type TButtonMenuProps = {
  items: TButtonProps[];
  gap?: string | number;
  inline?: boolean;
  color?: TButtonProps['color'];
  buttonStyle?: TButtonProps['buttonStyle'];
  size?: TButtonProps['size'];
  buttonGap?: TButtonProps['gap'];
  pressable?: TButtonProps['pressable'];
  buttonClassName?: string;
  className?: string;
};

export const ButtonMenu = ({
  items,
  inline,
  gap = 10,
  className,
  buttonClassName,
  buttonGap,
  ...rest
}: TButtonMenuProps) => {
  return (
    <div
      className={clsx(styles.menu, inline && styles.inline, className)}
      style={{ gap }}
    >
      {items.map((buttonProps, idx) => {
        return (
          <Button
            key={idx}
            gap={buttonGap}
            {...rest}
            {...buttonProps}
            className={clsx(
              styles.button,
              buttonClassName,
              buttonProps.className
            )}
          />
        );
      })}
    </div>
  );
};
