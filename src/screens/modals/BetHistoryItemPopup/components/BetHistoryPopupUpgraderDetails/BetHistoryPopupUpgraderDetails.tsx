import styles from './BetHistoryPopupUpgraderDetails.module.scss';
import { Truncate } from '@/components/Truncate/Truncate';
import { Spacer } from '@/components/Spacer/Spacer';
import { TBetHistoryUpgraderItem } from '@/types/betHistory.types';
import { RollType } from '@/types/upgrader.types';
import { toFixed } from '@/utils/number.utils';
import { UpgraderIcon } from '@/components/icons/UpgarderIcon';

type TProps = {
  item: TBetHistoryUpgraderItem;
};

export const BetHistoryPopupUpgraderDetails = ({ item }: TProps) => {
  const roll = item.roll === RollType.Under ? item.tickets.min : item.tickets.max;

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <UpgraderIcon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <Truncate className={styles.title}>
          Scrap Upgrader
        </Truncate>

        <Spacer y={6} />

        <div className={styles.text}>
          Roll {item.roll} {toFixed(roll / 1000, 6)}
        </div>
      </div>
    </div>
  );
};
