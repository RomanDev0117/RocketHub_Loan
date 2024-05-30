import { useEffect, useRef, useState } from 'react';
import { TextField } from '../TextField/TextField';
import styles from './MinMaxPriceField.module.scss';
import { parseNumber } from '@/utils/validation.utils';
import clsx from 'clsx';

type TProps = {
  className?: string;
  value: {
    min: number;
    max: number;
  };
  onChange: (priceFilter: { min: number; max: number }) => void;
};

export const MinMaxPriceField = ({ value, onChange, className }: TProps) => {
  //Todo; implement local value state
  const [localValue, setLocalValue] = useState({
    min: getValue(value.min),
    max: getValue(value.max),
  });
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (
      value.min !== lastValueRef.current.min ||
      value.max !== lastValueRef.current.max
    ) {
      lastValueRef.current = value;

      setLocalValue({
        min: getValue(value.min),
        max: getValue(value.max),
      });
    }
  }, [value]);



  return (
    <div className={clsx(styles.container, className)}>
      <TextField
        value={localValue.min}
        placeholder="Min price"
        onChange={(e) => {
          const min = parseNumber(e.target.value, localValue.min, { decimals: 2 });

          setLocalValue({ ...localValue, min });

          const minNumber = min === '' ? 0 : Number(min);
          const newValue = { max: lastValueRef.current.max, min: minNumber };

          lastValueRef.current = newValue;
          onChange(newValue);
        }}
      />

      <TextField
        value={localValue.max}
        placeholder="Max price"
        onChange={(e) => {
          const max = parseNumber(e.target.value, localValue.max, { decimals: 2 });

          setLocalValue({ ...localValue, max });

          const maxNumber = max === '' ? Infinity : Number(max);
          const newValue = { min: lastValueRef.current.min, max: maxNumber };

          lastValueRef.current = newValue;
          onChange(newValue);
        }}
      />
    </div>
  );
};

const getValue = (value: number | string) => {
  if (value === 0) {
    return '';
  }
  if (value === Infinity) {
    return '';
  }

  return `${value}`;
};