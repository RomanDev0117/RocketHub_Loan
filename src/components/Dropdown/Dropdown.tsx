import { useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import styles from './Dropdown.module.scss';
import clsx from 'clsx';
import { DropdownList } from './DropdownList';
import { Truncate } from '../Truncate/Truncate';
import { Manager, Reference, Popper } from 'react-popper';

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
  variant?: 'default' | 'dark-bordered';
} & Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'>;

export type TOption<T = string> = {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
};

export function Dropdown<T>({
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const openRef = useRef(open);
  openRef.current = open;

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const handleClick = (event: any) => {
      if (openRef.current && !rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = (option: TOption<T>) => {
    onChange?.(option.value, option);
    setOpen(false);
  };

  const handlePlaceholderClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <Manager>

      <div
        {...rest}
        className={clsx(
          rest.className,
          styles.root,
          {
            [styles.open]: open,
            [styles.inline]: inline,
            [styles.darkBordered]: variant === 'dark-bordered',
            [styles.text500]: text500,
          }
        )}
        ref={rootRef}
        style={{
          '--dropdown-height': height ? `${height}px` : undefined,
        } as any}
      >
        {label && (
          <div className={clsx(styles.labelContainer, labelContainerClassName)}>
            <label className="">
              {label}
              {/* {infoTooltip && (
                <InfoTooltip text={infoTooltip} className="ml-3" />
              )} */}
            </label>

            {helpText && <div className={styles.helperText}>{helpText}</div>}
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
                <span className={styles.iconContainer}>{selectedOption.icon}</span>
              )}

              {/* <input 
            value={selectedOption?.label || ''}
            placeholder={placeholder}
            className={styles.placeholderInput}
            readOnly
          /> */}
              <div className={clsx(styles.placeholderInput, placeholderTextClassName)}>
                <Truncate>
                  {placeholderLabel
                    ? placeholderLabel(selectedOption)
                    : selectedOption?.label || ''}
                </Truncate>
              </div>

              <FontAwesomeIcon icon={faChevronDown} className={styles.arrow} />


            </div>
          )}
        </Reference>
      </div>

      {open && (
        <Popper placement="bottom-start" strategy="fixed" modifiers={[
          { name: 'preventOverflow', enabled: false },
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom'],
            },
          },
          {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            effect: ({ state }) => {
              state.elements.popper.style.width = `${(state.elements.reference as any).offsetWidth
                }px`;
            }
          },
        ]}>
          {({ ref, style }) => {
            return (
              <DropdownList
                title={dropdownTitle}
                options={options}
                onSelect={handleSelect}
                ref={ref}
                variant={variant}
                style={{
                  ...style,
                  zIndex,
                  minWidth: 'fit-content',
                }}
              />
            );
          }}
        </Popper>
      )}
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
