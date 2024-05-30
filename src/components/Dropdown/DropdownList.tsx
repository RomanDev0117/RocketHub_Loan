import { CSSProperties, forwardRef } from 'react';
import { TOption } from './Dropdown';
import styles from './DropdownList.module.scss';
import { Portal } from '../Portal/Portal';
import clsx from 'clsx';

export type DropdownListProps = {
  title?: React.ReactNode;
  onSelect: (option: TOption<any>) => void;
  options: TOption<any>[];
  style: CSSProperties;
  dropdownStyle?: 'normal' | 'chat';
  variant?: 'default' | 'dark-bordered';
  className?: string;
};

export const DropdownList = forwardRef<HTMLDivElement, DropdownListProps>(
  ({ options, onSelect, style, dropdownStyle, className, variant }, ref) => {
    return (
      <Portal>
        <div ref={ref} className={clsx(styles.root, className, {
          [styles.chatStyle]: dropdownStyle === 'chat',
          [styles.darkBordered]: variant === 'dark-bordered',
        })} style={style}>
          {/* <header className="px-5 pt-2 pb-4 text-sm font-medium">
        {title && <h4>{title}</h4>}
      </header> */}
          <ul className={styles.list}>
            {options.map((o, idx) => {
              return (
                <li
                  key={idx}
                  className={styles.listItem}
                  onClick={() => onSelect(o)}
                >
                  {o.icon && (
                    <span className={styles.iconContainer}>{o.icon}</span>
                  )}
                  {o.label}
                </li>
              );
            })}
          </ul>
        </div>
      </Portal>
    );
  }
);
