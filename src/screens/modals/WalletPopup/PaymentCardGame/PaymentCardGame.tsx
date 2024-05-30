import { PAYMENT_TYPE_GAME } from '../../../../types/payment.types';
import styles from './PaymentCardGame.module.scss';
import useTranslation from '../../../../hooks/useTranslation';
import { PaymentMethodCardUI } from '../PaymentMethodCardUI/PaymentMethodCardUI';

type TProps = {
  game: PAYMENT_TYPE_GAME;
  type: 'deposit' | 'withdrawal';
  onClick: () => void;
};

export const PaymentCardGame = ({ game, onClick }: TProps) => {
  const { t } = useTranslation();

  const gameMap = {
    [PAYMENT_TYPE_GAME.RUST]: {
      name: 'Rust',
      img: '/images/wallet/rust.svg',
      buttonText: 'Rockethub',
    },
    [PAYMENT_TYPE_GAME.CS_GO]: {
      name: 'CS2',
      img: '/images/wallet/cs.svg',
      buttonText: t({ id: 'payment.game.Skinsback', defaultMessage: 'Skinsback' })
    },
    [PAYMENT_TYPE_GAME.DOTA_2]: {
      name: 'Dota2',
      img: '/images/wallet/dota2.svg',
      buttonText: t({ id: 'payment.game.Skinsback', defaultMessage: 'Skinsback' })
    },
  };

  const config = gameMap[game];

  return (
    <PaymentMethodCardUI
      title={config.name}
      image={<img src={config.img} alt={`${config.name}`} className={styles.image} />}
      onClick={onClick}
    />
  );
};
