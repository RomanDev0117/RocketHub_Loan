import { useId } from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';
import styles from './Switch.module.scss';
import clsx from 'clsx';
import Loader from '@/components/Loader/Loader';

type TProps = {
  label?: React.ReactNode;
  containerClassName?: string;
  inline?: boolean;
  gap?: number | string;
  fullWidth?: boolean;
  loading?: boolean;
} & ReactSwitchProps;

export const Switch = ({
  label,
  containerClassName,
  gap,
  fullWidth,
  loading = false,
  disabled,
  ...rest
}: TProps) => {
  const id = useId();
  return (
    <div
      className={clsx(styles.container, containerClassName, {
        [styles.fullWidth]: fullWidth,
        [styles.active]: rest.checked,
      })}
      style={{
        gap,
      }}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <span className={clsx(styles.switchContainer, {
        [styles.loading]: loading,
      })}>
        <Loader loading={loading} position="absolute" size={20} thickness={2} />
        <ReactSwitch
          id={id}
          // onColor="linear-gradient(180deg, #475569 0%, #334155 100%)"
          // onHandleColor="#43C54B"
          handleDiameter={17}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          borderRadius={23}
          height={23}
          width={45}
          className={styles.switch}
          disabled={disabled || loading}
          {...rest}
        />
      </span>
    </div>
  );
};
