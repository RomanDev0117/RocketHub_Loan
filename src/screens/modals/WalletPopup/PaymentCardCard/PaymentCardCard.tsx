import { CARD_TYPE, PaymentBadge } from '../../../../types/payment.types';
import visaIcon from '../../../../assets/images/icons/visa.svg';
import masterCardIcon from '../../../../assets/images/icons/mastercard.svg';
import styles from './PaymentCardCard.module.scss';
import { Flex } from '../../../../components/Flex/Flex';
import { PaymentMethodCardUI } from '../PaymentMethodCardUI/PaymentMethodCardUI';
import { DepositRewardType } from '@/types/app.types';
import { useGetDepositRewardsQuery } from '@/store/slices/rockethubApi/payment.endpoints';

type TProps = {
  cardType: CARD_TYPE;
  type: 'deposit' | 'withdrawal';
  onClick: () => void;
};

export const PaymentCardCard = ({ cardType, onClick, type }: TProps) => {
  const { data } = useGetDepositRewardsQuery(undefined, { skip: type === 'withdrawal' });

  const cardMap = {
    [CARD_TYPE.CREDIT_CARD]: {
      name: 'Zen',
      img: '/images/wallet/zen.svg',
      contentBg:
        'linear-gradient(180deg, rgba(19, 29, 37, 0.00) 0%, rgba(6, 43, 74, 0.88) 50%, #062350 100%)',
      rewardType: DepositRewardType.Zen,
    },
    [CARD_TYPE.GIFT_CARD]: {
      name: 'Gift card',
      img: '/images/wallet/kinguin-logo.png',
      contentBg:
        'linear-gradient(180deg, rgba(19, 29, 37, 0.00) 0%, rgba(17, 25, 33, 0.88) 50%, #21084F 100%)',
      footer: (
        <span className={styles.rockbets}>
          {/* <VectorIcon /> */}
          Rockethub
        </span>
      ),
      rewardType: null,
    },
    [CARD_TYPE.BIT_INVESTOR]: {
      name: 'Bit Investor',
      img: '/images/wallet/visa-mastercard.png',
      contentBg:
        'linear-gradient(180deg, rgba(19, 29, 37, 0.00) 0%, rgba(6, 43, 74, 0.88) 50%, #062350 100%)',
      footer: (
        <Flex container gap={7}>
          <img src={masterCardIcon} alt="MasterCard logo" />
          <img src={visaIcon} alt="Visa logo" />
        </Flex>
      ),
      rewardType: DepositRewardType.Bitinvestor,
    },
    [CARD_TYPE.BANK_REVOLUT]: {
      name: 'Bank/Revolut',
      img: '/images/wallet/visa-mastercard.png',
      contentBg:
        'linear-gradient(180deg, rgba(19, 29, 37, 0.00) 0%, rgba(6, 43, 74, 0.88) 50%, #062350 100%)',
      footer: (
        <Flex container gap={7}>
          <img src={masterCardIcon} alt="MasterCard logo" />
          <img src={visaIcon} alt="Visa logo" />
        </Flex>
      ),
      rewardType: null,
    },
    [CARD_TYPE.NOTAPAYMENT]: {
      name: 'Notapayment',
      img: '/images/wallet/visa-mastercard.png',
      contentBg:
        'linear-gradient(180deg, rgba(19, 29, 37, 0.00) 0%, rgba(6, 43, 74, 0.88) 50%, #062350 100%)',
      footer: (
        <Flex container gap={7}>
          <img src={masterCardIcon} alt="MasterCard logo" />
          <img src={visaIcon} alt="Visa logo" />
        </Flex>
      ),
      rewardType: null,
    },
  };

  const config = cardMap[cardType];
  const reward = data?.depositRewards?.find(r => r.type === config.rewardType);
  // const bonus = PAYMENT_BONUS_PERCENTAGE[cardType] || 0;

  return (
    <PaymentMethodCardUI
      className={styles.item}
      title={config.name}
      image={
        <img src={config.img} alt={`${config.name}`} className={styles.image} />
      }
      onClick={onClick}
      badge={type === 'deposit' && reward?.enabled ? PaymentBadge.FREE_CRATE : undefined}
    />
  );
};
