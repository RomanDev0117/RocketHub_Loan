import clsx from 'clsx';
import { CoinIcon } from '../../../../components/icons/CoinIcon';
import { T } from '../../../../i18n/translate';
import styles from './GiftCardAmountSelector.module.scss';
import glow from './images/glow.png';

type TProps = {
  selectedAmount: number | undefined;
  onChange: (amount: number) => void;
};

export const GiftCardAmountSelector = ({
  selectedAmount,
  onChange,
}: TProps) => {
  const amountOptions = [5, 10, 25, 50, 100, 250, 500];

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        <T id="giftCard.PickAnAmount" defaultMessage="Pick an Amount" />
      </h4>

      <div className={styles.grid}>
        {amountOptions.map((value) => {
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={clsx(styles.button, {
                [styles.selected]: selectedAmount === value,
              })}
            >
              <img src={glow} alt="" className={styles.glow} />
              <span>{value}</span>
              <span className={styles.coin}>
                <CoinIcon shine />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
