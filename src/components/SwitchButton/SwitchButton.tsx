import clsx from "clsx";
import { useRef } from "react";
import { Manager, Reference } from "react-popper";
import { Truncate } from "../Truncate/Truncate";
import styles from "./Dropdown.module.scss";

// TODO: check if we want to use react select instead
export type TDropdownProps<T> = {
  label?: React.ReactNode;
  hasError?: boolean;
  value?: T;
  name?: string;
  placeholder?: string;
  text500?: boolean;
  onChange?: (value: T, option: TOption<T>) => void;
  onBlur?: (e: any) => void;
  error?: {
    message: string;
  };
  // infoTooltip: string;
  placeholderLabel?: (option?: TOption<T>) => React.ReactNode;
  placeholderTextClassName?: string;
  helpText?: React.ReactNode;
  readOnly?: boolean;
  inputProps?: React.InputHTMLAttributes<any>;
  dropdownTitle?: React.ReactNode;
  options: TOption<T>[];
  inline?: boolean;
  height?: number;
  labelContainerClassName?: string;
  zIndex?: number;
  placeholderProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
  variant?: "default" | "dark-bordered";
} & Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "onChange">;

export type TOption<T = string> = {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
};

export function SwitchButton<T>({
  label,
  // hasError,
  value,
  // name,
  // placeholder,
  onChange,
  labelContainerClassName,
  // onBlur,
  // error,
  // infoTooltip,
  helpText,
  height,
  // readOnly,
  text500,
  // inputProps,
  dropdownTitle,
  options,
  inline,
  placeholderLabel,
  placeholderProps,
  placeholderTextClassName,
  zIndex,
  prefix,
  variant,
  ...rest
}: TDropdownProps<T>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((o) => o.value === value);

  const handlePlaceholderClick = () => {
    const unSelectedOption = options.find((o) => o.value !== value);
    if (unSelectedOption) onChange?.(unSelectedOption.value, unSelectedOption);
  };

  return (
    <Manager>
      <div
        {...rest}
        className={clsx(rest.className, styles.root, {
          [styles.open]: false,
          [styles.inline]: inline,
          [styles.darkBordered]: variant === "dark-bordered",
          [styles.text500]: text500,
        })}
        ref={rootRef}
        style={
          {
            "--dropdown-height": height ? `${height}px` : undefined,
          } as any
        }
      >
        {label && (
          <div className={clsx(styles.labelContainer, labelContainerClassName)}>
            {/* <label className={styles.labelText}>{label}</label> */}
          </div>
        )}

        <Reference>
          {({ ref }) => (
            <div
              ref={ref}
              {...placeholderProps}
              className={clsx(
                styles.placeholderContainer,
                placeholderProps?.className
              )}
              onClick={handlePlaceholderClick}
            >
              {prefix && <span className={styles.prefix}>{prefix}</span>}
              {selectedOption?.icon && (
                <span className={styles.iconContainer}>
                  {selectedOption.icon}
                </span>
              )}

              <div
                className={clsx(
                  styles.placeholderInput,
                  placeholderTextClassName
                )}
              >
                <Truncate>
                  {placeholderLabel
                    ? placeholderLabel(selectedOption)
                    : selectedOption?.label || ""}
                </Truncate>
              </div>
            </div>
          )}
        </Reference>
      </div>
    </Manager>
  );
}

// react-hook-form wrapper for text field
// export const DropdownFieldController = ({
//   control,
//   name,
//   label,
//   className,
//   ...rest
// }) => {
//   const {
//     field: { onChange, onBlur, value, ref },
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//   });

//   const hasError = Boolean(error?.message);

//   return (
//     <DropdownField
//       hasError={hasError}
//       label={label}
//       value={value}
//       name={name}
//       onChange={onChange}
//       onBlur={onBlur}
//       error={error}
//       className={className}
//       ref={ref}
//       {...rest}
//     />
//   );
// };
