import { Flex } from '../../../../components/Flex/Flex';
import {
  CARD_TYPE,
  CRYPTO_CURRENCY,
  PAYMENT_METHOD,
  PAYMENT_TYPE_GAME,
} from '../../../../types/payment.types';
import { PaymentCardCrypto } from '../PaymentCardCrypto/PaymentCardCrypto';
import { PaymentCardGame } from '../PaymentCardGame/PaymentCardGame';
import { PaymentCardCard } from '../PaymentCardCard/PaymentCardCard';
import { PaymentMethodTitle } from '../PaymentMethodTitle/PaymentMethodTitle';
import styles from './PaymentMethods.module.scss';

type TProps = {
  games?: PAYMENT_TYPE_GAME[];
  cards?: CARD_TYPE[];
  crypto?: CRYPTO_CURRENCY[];
  type: 'deposit' | 'withdrawal';
  selected: PAYMENT_METHOD | null;
  onSelect: (paymentMethod: PAYMENT_METHOD) => void;
};

export const PaymentMethods = ({
  games,
  cards,
  crypto,
  type,
  selected,
  onSelect,
}: TProps) => {
  // const gamesCollapsed = useCollapse({
  //   duration: 0,
  //   isExpanded: !selected || games?.includes(selected as PAYMENT_TYPE_GAME),
  // });

  // const cardsCollapsed = useCollapse({
  //   duration: 0,
  //   isExpanded: !selected,
  // });

  // const cryptoCollapsed = useCollapse({
  //   duration: 0,
  //   isExpanded: !selected,
  // });

  const gamesExpanded = !selected || games?.includes(selected as PAYMENT_TYPE_GAME);
  const cardsExpanded = !selected;
  const cryptoExpanded = !selected;

  return (
    <Flex container flexDirection="column" gap={30}>
      {games && gamesExpanded && (
        // <div {...gamesCollapsed.getCollapseProps()}>
        <div>
          <PaymentMethodTitle>
            game {type === 'withdrawal' ? 'withdraw' : 'deposits'}
          </PaymentMethodTitle>
          <div className={styles.grid}>
            {games.map((game) => {
             if(type === 'withdrawal' && game === 'DOTA_2') return null;
              return (
                <PaymentCardGame
                  key={game}
                  game={game}
                  type={type}
                  onClick={() => onSelect(game)}
                />
              );
            })}
          </div>
        </div>
      )}

      {cards && cardsExpanded && (
        // <div {...cardsCollapsed.getCollapseProps()}>
        <div>
          <PaymentMethodTitle discounted={type === 'deposit' ? '+65%' : ''}>
            Cash {type === 'withdrawal' ? 'withdraw' : 'deposits'}
          </PaymentMethodTitle>
          <div className={styles.grid}>
            {cards.map((card) => {
              const visible = !selected || card === selected;

              if (!visible) return null;

              return (
                <PaymentCardCard
                  key={card}
                  cardType={card}
                  type={type}
                  onClick={() => onSelect(card)}
                />
              );
            })}
          </div>
        </div>
      )}

      {crypto && cryptoExpanded && (
        // <div {...cryptoCollapsed.getCollapseProps()}>
        <div>
          <PaymentMethodTitle discounted={type === 'withdrawal' ? undefined : '+65%'}>
            Cryptocurrencies
          </PaymentMethodTitle>
          <div className={styles.grid}>
            {crypto.map((c) => {
              return (
                <PaymentCardCrypto
                  key={c}
                  currency={c}
                  type={type}
                  onClick={() => onSelect(c)}
                  selected={c === selected}
                />
              );
            })}
          </div>
        </div>
      )}
    </Flex>
  );
};
