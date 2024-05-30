import clsx from 'clsx';
import { Button } from '../Button/Button';
import styles from './AmountSelector.module.scss';
import { MouseEventHandler } from 'react';

type TProps = {
  className?: string;
  selectedAmount: number;
  max?: number;
  min?: number;
  onChange: (newAmount: number) => void;
}

export const AmountSelector = ({ className, selectedAmount, min = 0, max = Infinity, onChange }: TProps) => {

  const onAdd: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newAmount = selectedAmount + 1;
    if (newAmount > max) return;
    onChange?.(newAmount);
  };

  const onSubstract: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextAmount = selectedAmount - 1;
    if (nextAmount < min) return;
    onChange?.(nextAmount);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Button color="secondary-v4" className={styles.button} onClick={onSubstract}>-</Button>
      <span>{selectedAmount}</span>
      <Button color="secondary-v4" className={styles.button} onClick={onAdd}>+</Button>
    </div>
  );
};