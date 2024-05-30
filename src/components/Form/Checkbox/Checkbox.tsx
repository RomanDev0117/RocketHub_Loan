import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

import { CheckIcon } from '../../icons/CheckIcon';
import styles from './Checkbox.module.scss';
import { CheckIconShiny } from '../../icons/CheckIconShiny';
import { FieldError, useController } from 'react-hook-form';

type TCheckboxProps = {
  className?: string;
  checked: boolean;
  label?: React.ReactNode;
  block?: boolean;
  size?: 'medium' | 'xlarge';
  style?: 'default' | 'shiny';
  error?: FieldError | undefined
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'>;

export const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>(({
  className,
  checked,
  label,
  block,
  size,
  style = 'default',
  error,
  ...props
}, ref) => {
  const rootClassName = clsx(styles.root, className, styles[`${size}Size`], {
    [styles.block]: block,
    [styles.checked]: checked,
    [styles.noLabel]: !label,
    [styles.noBg]: style === 'shiny',
  });

  const Icon = style === 'shiny' ? CheckIconShiny : CheckIcon;

  return (
    <label className={rootClassName}>
      <span className={styles.inputContainer}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.hidden}
          checked={checked}
          {...props}
        />
        <div className={clsx(styles.checkbox, { [styles.checked]: checked })}>
          <Icon className={styles.icon} />
        </div>
        <span className={styles.label}>{label}</span>
      </span>
      {Boolean(error?.message) && <span className={styles.error}>{error?.message}</span>}
    </label>
  );
});

export type TCheckboxControllerProps = {
  control: any;
  name: string;
} & Omit<TCheckboxProps, 'value' | 'checked'>;

// react-hook-form wrapper
export const CheckboxController = ({
  control,
  name,
  ...rest
}: TCheckboxControllerProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Checkbox
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      // onChange={(e) => setPolicyAccepted(e.target.checked)}
      name={name}
      {...rest}
      checked={value}
    />
  );
};
