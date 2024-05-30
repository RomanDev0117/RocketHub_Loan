import { useCountUp } from 'use-count-up';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { PriceWithCoin } from '../PriceWithCoin/PriceWithCoin';
import { useEffect, useState } from 'react';

type TProps = {
  value: number | string;
  duration?: number;
  start?: number;
  withCoin?: boolean;
  highlight?: boolean;
  positive?: boolean;
  negative?: boolean;
};

export const CountUpPrice = ({
  value,
  duration = 2,
  start = 0,
  withCoin,
  highlight,
  positive,
  negative,
}: TProps) => {
  const floatValue = parseFloat(value as string);
  const [_start, setStart] = useState(parseFloat(start as any as string));
  const [_end, setEnd] = useState(floatValue);

  const countUp = useCountUp({
    isCounting: true,
    start: _start,
    end: _end,
    duration,
  });

  const _value =
    duration === 0 ? floatValue : parseFloat(countUp.value as string);

  useEffect(() => {
    // count up every time value changes
    if (floatValue !== _end) {
      setStart(_value); // set current value as start
      setEnd(floatValue); // set new end value
      countUp.reset();
    }
  }, [floatValue]);

  if (withCoin) {
    return (
      <PriceWithCoin
        highlight={highlight}
        positive={positive}
        negative={negative}
      >
        {_value}
      </PriceWithCoin>
    );
  }

  return <FormattedPrice value={_value} />;
};
