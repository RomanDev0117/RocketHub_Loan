import clsx from 'clsx';
import {
  FormattedPrice,
  TFormattedPriceProps,
} from '../FormattedPrice/FormattedPrice';
import { CoinIcon, TCoinIconProps } from '../icons/CoinIcon';
import styles from './PriceWithCoin.module.scss';
import { SmallTriangleIcon } from '../icons/SmallTriangleIcon';

export type TPriceWithCoinProps = {
  children?: number | string;
  highlight?: boolean | 'arrows';
  positive?: boolean;
  negative?: boolean;
  className?: string;
  prefix?: string;
  gap?: string | number;
  fontWeight?: number | string;
  iconSize?: number;
  coinProps?: TCoinIconProps;
  priceProps?: Partial<TFormattedPriceProps>;
  placeholder?: any;
};

export const PriceWithCoin = ({
  children,
  highlight,
  className,
  prefix,
  gap,
  fontWeight = 800,
  iconSize,
  coinProps,
  positive,
  negative,
  priceProps,
  placeholder,
}: TPriceWithCoinProps) => {
  const positiveNumber = typeof children === 'number' && children > 0;
  const negativeNumber = typeof children === 'number' && children <= 0;
  const cls = clsx(styles.root, className, {
    [styles.positive]: positive || (highlight && positiveNumber),
    [styles.negative]: negative || (highlight && negativeNumber),
  });

  return (
    <div className={cls} style={{ gap, fontWeight }}>
      <CoinIcon style={{ width: iconSize, height: iconSize }} {...coinProps} />
      <FormattedPrice
        value={
          typeof children === 'number' && !Number.isNaN(children)
            ? children
            : placeholder || ''
        }
        prefix={prefix}
        fontWeight={fontWeight}
        {...priceProps}
      />
      {highlight === 'arrows' && <SmallTriangleIcon className={styles.arrow} />}
    </div>
  );
};
