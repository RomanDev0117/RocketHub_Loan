import { AvatarCircle } from '@/components/AvatarCircle/AvatarCircle';
import styles from './BetHistoryCaseBattlePlayerItems.module.scss';
import { TDuelPlayer, TPlayerUnboxedItem } from '@/types/caseTypes';
import { getLevelColor, getLevelIcon } from '@/utils/level.utils';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { TBetHistoryCaseBattleItem } from '@/types/betHistory.types';
import { Truncate } from '@/components/Truncate/Truncate';
import { Spacer } from '@/components/Spacer/Spacer';

type TProps = {
  caseBattle: TBetHistoryCaseBattleItem;
  player: TDuelPlayer;
  unboxedItems: TPlayerUnboxedItem[];
};

export const BetHistoryCaseBattlePlayerItems = ({
  player,
  unboxedItems,
  caseBattle,
}: TProps) => {
  const color = getLevelColor(player.level);
  const levelIcon = getLevelIcon(player.level);

  const playerResultData = caseBattle?.winners.find(
    (w) => w.steamid === player.steamid
  );
  const winAmount = playerResultData?.amount || 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.player}>
          <AvatarCircle
            src={player.avatar}
            size={28}
            userLevel={player.level}
          />
          <img src={levelIcon} className={styles.levelIcon} />
          <Truncate className={styles.playerName} style={{ color }}>
            {player.name}
          </Truncate>
        </div>

        <PriceWithCoin
          className={styles.wonAmount}
          fontWeight={800}
          coinProps={{ shine: true }}
          iconSize={18}
          gap={6}
        >
          {winAmount}
        </PriceWithCoin>
      </div>

      <div className={styles.items}>
        {unboxedItems.map((item, idx) => {
          return (
            <div className={styles.item} key={idx}>
              <div className={styles.itemLeft}>
                <span className={styles.round}>#{idx + 1}</span>
                <img src={item.item.image} />

                <div className={styles.itemDescription}>
                  <Truncate className={styles.itemName}>{item.item.name}</Truncate>
                  <Spacer y={2} />
                  <div className={styles.itemChance}>
                    {(item.res || 0) / 1000}%
                    <span>-</span>
                    <span>{item.item.percentage}%</span>
                  </div>
                </div>
              </div>

              <PriceWithCoin
                fontWeight={700}
                className={styles.itemPrice}
                iconSize={14}
                coinProps={{ shine: true }}
              >
                {parseFloat(item.item.price)}
              </PriceWithCoin>
            </div>
          );
        })}
      </div>
    </div>
  );
};
