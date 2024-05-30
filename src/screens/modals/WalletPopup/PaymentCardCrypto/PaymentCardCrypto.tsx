import { CRYPTO_CURRENCY, PaymentBadge } from '../../../../types/payment.types';
import styles from './PaymentCardCrypto.module.scss';
import { CRYPTO_CURRENCY_MAP, CRYPTO_NAME_MAP } from '../../../../constants';
import { PaymentMethodCardUI } from '../PaymentMethodCardUI/PaymentMethodCardUI';
import { useGetDepositRewardsQuery } from '@/store/slices/rockethubApi/payment.endpoints';

type TProps = {
  currency: CRYPTO_CURRENCY;
  type: 'deposit' | 'withdrawal';
  selected?: boolean;
  onClick: () => void;
};

const glowImg = {
  [CRYPTO_CURRENCY.BITCOIN]: '/images/wallet/glow-bitcoin.svg',
  [CRYPTO_CURRENCY.ETHEREUM]: '/images/wallet/glow-ethereum.svg',
  [CRYPTO_CURRENCY.LITECOIN]: '/images/wallet/glow-litecoin.svg',
  [CRYPTO_CURRENCY.USDT]: '/images/wallet/glow-usdt.svg',
  [CRYPTO_CURRENCY.TRON]: '/images/wallet/glow-tron.svg',
} as Record<CRYPTO_CURRENCY, string>;

export const PaymentCardCrypto = ({ currency, onClick, type }: TProps) => {
  const { data } = useGetDepositRewardsQuery(undefined, { skip: type === 'withdrawal' });

  const config = CRYPTO_CURRENCY_MAP[currency];
  // const bonus = PAYMENT_BONUS_PERCENTAGE[currency] || 0;
  const name = CRYPTO_NAME_MAP[currency];

  const glowImage = glowImg[currency];

  const reward = data?.depositRewards?.find(r => r.type === config.rewardType);


  return (
    <PaymentMethodCardUI
      rotate
      gradientColor={config.color}
      title={name}
      image={
        <img src={config.img} alt={`${name} logo`} className={styles.image} />
      }
      glowImage={glowImage}
      onClick={onClick}
      badge={type === 'deposit' && reward?.enabled ? PaymentBadge.FREE_CRATE : undefined}
    />
  );
};
