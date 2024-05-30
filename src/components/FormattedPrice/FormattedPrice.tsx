import { CSSProperties } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export type TFormattedPriceProps = NumericFormatProps & {
  value: number | string;
  prefix?: string;
  style?: CSSProperties;
  className?: string;
  fontWeight?: number | string;
};

export const FormattedPrice = ({
  value,
  prefix = '',
  className,
  style,
  fontWeight = 800,
  ...rest
}: TFormattedPriceProps) => {
  return (
    <NumericFormat
      value={value}
      thousandSeparator=" "
      decimalSeparator="."
      displayType="text"
      prefix={prefix}
      fixedDecimalScale
      decimalScale={2}
      className={className}
      style={{ fontWeight: fontWeight, ...style }}
      {...rest}
    />
  );
};
