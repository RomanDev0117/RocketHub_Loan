import { TBetHistoryUpgraderItem } from '@/types/betHistory.types';
import styles from './BetHistoryPopupUpgraderChanceDetails.module.scss';
import { Spacer } from '@/components/Spacer/Spacer';
import { toFixed } from '@/utils/number.utils';

type TProps = {
  item: TBetHistoryUpgraderItem;
};

export const BetHistoryPopupUpgraderChanceDetails = ({ item }: TProps) => {
  const multiplier = item.amountWon / item.betAmount;

  return (
    <div className={styles.container}>
      <div className={styles.multiplier}>{toFixed(multiplier)}x</div>
      <Spacer y={6} />
      <div className={styles.ticket}>
        Ticket
        <span>{item.result / 1000}</span>
      </div>
    </div>
  );
};