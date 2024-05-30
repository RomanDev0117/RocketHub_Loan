import { priceRangeOptions } from '@/constants';
import { Dropdown, TDropdownProps, TOption } from '../Dropdown/Dropdown';
import styles from './DropdownPriceRange.module.scss';
import { useMemo } from 'react';
import { CoinIcon } from '../icons/CoinIcon';

type TProps = Omit<TDropdownProps<string>, 'value' | 'onChange' | 'options'> & {
  value: {
    min: number;
    max: number;
  };
  onChange: (priceFilter: { min: number; max: number }) => void;
  filterOptions?: (options: TOption[]) => TOption[];
}

export const DropdownPriceRange = ({
  value,
  onChange,
  filterOptions,
  ...rest
}: TProps) => {

  const normalizedValue = `${value.min}-${value.max === Infinity ? '' : value.max}`;

  const options = useMemo(() => {
    const opt = priceRangeOptions.map((option) => ({
      ...option,
      icon: <CoinIcon shine />,
    }));

    return filterOptions ? filterOptions(opt) : opt;
  }, []);

  return (
    <Dropdown
      {...rest}
      prefix='Price Range:'
      options={options}
      value={normalizedValue}
      placeholderTextClassName={styles.placeholder}
      onChange={(v) => {
        const [min, max] = v.split('-');
        onChange({
          min: parseFloat(min),
          max: max ? parseFloat(max) : Infinity,
        });
      }}
    />
  );
};