import { Flex } from '@/components/Flex/Flex';
import { TBetHistoryCaseBattleItem } from '@/types/betHistory.types';
import styles from './BetHistoryCaseBattleTopInfo.module.scss';
import { Truncate } from '@/components/Truncate/Truncate';
import { Spacer } from '@/components/Spacer/Spacer';
import { getCaseBattleWinners } from '@/store/slices/caseBattleSlice';
import { AvatarCircle } from '@/components/AvatarCircle/AvatarCircle';

type TProps = {
  item: TBetHistoryCaseBattleItem;
};

export const BetHistoryCaseBattleTopInfo = ({ item }: TProps) => {
  const winners = getCaseBattleWinners(
    item.winningTeam,
    item.winners,
    item.playersInDuel,
    item.battleType
  );

  return (
    <div className={styles.container}>
      <Flex container alignItems="center" gap={20}>
        <img src="/images/case-battle-icon-92.png" className={styles.image} />
        <Truncate className={styles.title}>{item.battleType}</Truncate>
      </Flex>

      <div className={styles.winnersContainer}>
        <div className={styles.winners}>
          {winners.map((winner) => {
            if (!winner) return null;

            return (
              <AvatarCircle
                key={winner.steamid}
                src={winner.avatar}
                size={44}
                userLevel={winner.level}
              />
            );
          })}
        </div>
        <Spacer y={6} />
        <span className={styles.winnersTitle}>Winners</span>
      </div>
    </div>
  );
};
