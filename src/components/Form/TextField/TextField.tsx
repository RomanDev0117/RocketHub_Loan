import clsx from "clsx";
import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLProps,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { useController } from "react-hook-form";
import { NumericFormatProps } from "react-number-format";
import styles from "./TextField.module.scss";

export type TTextFieldPropsBase = {
  label?: React.ReactNode;
  hasError?: boolean;
  value: string;
  name?: string;
  placeholder?: string;
  valuePrefix?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: { message?: string };
  helpText?: string;
  readOnly?: boolean;
  inputProps?: HTMLProps<HTMLInputElement>;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClassName?: string;
  type?: string;
  fullWidth?: boolean;
  height?: string | number;
  maxLength?: number;
  text500?: boolean;
  suffix?: React.ReactNode;
  variant?: "contained" | "outlined";
  labelContainerClassName?: string;
  appearance?: "light" | "lightGrey" | "darkGrey" | "default";
  fontStyle?: "light" | "default";
  className?: string;
  appendClassName?: string;
  format?: (value: string, prevValue: string) => string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
};

export type TNumberProps = {
  type: "number";
  inputProps: NumericFormatProps;
} & TTextFieldPropsBase;

export type TInputProps = {
  type?: string;
} & Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> &
  TTextFieldPropsBase;

export type TTextFieldProps = TNumberProps | TInputProps;

export const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    {
      label,
      hasError,
      value,
      name,
      placeholder,
      onChange,
      onBlur,
      format,
      error,
      helpText,
      readOnly,
      inputProps,
      append,
      prepend,
      prependClassName,
      type,
      text500,
      height,
      fullWidth,
      appearance = "default",
      fontStyle,
      suffix,
      maxLength,
      valuePrefix,
      appendClassName,
      variant = "outlined",
      labelContainerClassName,
      ...rest
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, ...args: []) => {
      if (valuePrefix) {
        let v = e.target.value;
        v = v.startsWith(valuePrefix) ? v.split(valuePrefix).join("") : "";
        e.target.value = v;
      }

      if (format) {
        const v = e.target.value;
        e.target.value = format(v, value);
      }

      onChange?.(e, ...args);
    };

    const _value = valuePrefix ? `${valuePrefix}${value}` : value;

    const commonInputProps = {
      onChange: handleChange,
      onBlur,
      name,
      placeholder,
      readOnly,
      maxLength,
      style: {
        ...inputProps?.style,
        height,
      },
      className: clsx(
        styles.input,
        inputProps?.className,
        append && styles.withAppend,
        styles[`${fontStyle}FontStyle`],
        text500 && styles.text500
      ),
    };

    return (
      <div
        {...rest}
        className={clsx(
          rest.className,
          fullWidth && styles.fullWidth,
          styles[`${appearance}Appearance`],
          {
            [styles.hasError]: hasError,
            [styles.containedVariant]: variant === "contained",
            [styles.outlinedVariant]: variant === "outlined",
          }
        )}
      >
        <div className={styles.inputContainer}>
          {prepend && (
            <div className={clsx(styles.prepend, prependClassName)}>
              {prepend}
            </div>
          )}
          <input
            ref={ref}
            value={_value}
            type={type}
            {...commonInputProps}
            {...inputProps}
            className={commonInputProps?.className}
            style={commonInputProps.style}
          />
        </div>
        {hasError && <span className={styles.error}>{error?.message}</span>}
      </div>
    );
  }
);

export type TControllerProps = {
  control: any;
  name: string;
  customOnChange?: boolean;
} & Omit<TTextFieldProps, "value">;

// react-hook-form wrapper for text field
export const TextFieldController = ({
  control,
  name,
  label,
  className,
  customOnChange,
  onChange: onChangeProp,
  ...rest
}: TControllerProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const hasError = Boolean(error?.message);

  return (
    <TextField
      hasError={hasError}
      label={label}
      name={name}
      onChange={(e) => {
        if (!customOnChange) {
          onChange(e);
        }
        onChangeProp?.(e);
      }}
      onBlur={onBlur}
      error={error}
      className={className}
      ref={ref}
      {...rest}
      value={value}
    />
  );
};
