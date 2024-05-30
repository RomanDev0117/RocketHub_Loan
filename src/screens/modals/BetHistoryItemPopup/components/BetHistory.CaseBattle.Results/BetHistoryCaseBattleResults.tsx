import { Button } from '@/components/Button/Button';
import styles from './BetHistoryCaseBattleResults.module.scss';
import { TBetHistoryCaseBattleItem } from '@/types/betHistory.types';
import { Link } from 'react-router-dom';
import { getCaseBattlePath } from '@/utils/url.utils';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { getCaseBattleTotalUnboxedValue } from '@/utils/caseBattle.utils';

type TProps = {
  item: TBetHistoryCaseBattleItem;
};

export const BetHistoryCaseBattleResults = ({ item }: TProps) => {
  const totalUnboxed = getCaseBattleTotalUnboxedValue(item);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span className={styles.itemTitle}>Battle price:</span>
        <PriceWithCoin
          className={styles.itemPrice}
          fontWeight={800}
          iconSize={18}
          coinProps={{ shine: true }}
        >
          {item.price}
        </PriceWithCoin>
      </div>

      <div className={styles.item}>
        <span className={styles.itemTitle}>Total Unboxed:</span>
        <PriceWithCoin
          className={styles.itemPrice}
          fontWeight={800}
          iconSize={18}
          coinProps={{ shine: true }}
        >
          {totalUnboxed}
        </PriceWithCoin>
      </div>

      <Button
        Component={Link}
        href={getCaseBattlePath(item.id)}
        pressable
        color="secondary-v3"
        className={styles.button}
      >
        Open Battle Page
      </Button>
    </div>
  );
};
