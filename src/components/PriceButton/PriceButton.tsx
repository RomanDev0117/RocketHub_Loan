import clsx from 'clsx';
import { Button } from '../Button/Button';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { CoinIcon } from '../icons/CoinIcon';
import styles from './PriceButton.module.scss';

export const PriceButton = ({
  className,
  children,
  height,
  fontSize,
}: {
  className?: string;
  children?: string | number;
  height?: number;
  fontSize?: number;
}) => {
  return (
    <Button
      prepend={<CoinIcon />}
      color="secondary"
      className={clsx(styles.button, className)}
      style={{ height, fontSize }}
    >
      <FormattedPrice value={children || 0} />
    </Button>
  );
};
