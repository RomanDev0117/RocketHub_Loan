import { memo } from 'react';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './RangeSlider.module.scss';
import clsx from 'clsx';

type TProps = {
  className?: string;
} & SliderProps

export const RangeSlider = memo(
  (props: TProps) => {
    return (
      <Slider
        {...props}
        // onChange={onChange as any}
        className={clsx(props.className, styles.root)}
        classNames={{
          rail: styles.rail,
          track: styles.track,
          handle: styles.handle,
        }}

      />
    );
  }
);
