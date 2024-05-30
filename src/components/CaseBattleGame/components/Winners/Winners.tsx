import { memo, useMemo } from 'react';
import { getCaseBattleWinners } from '../../../../store/slices/caseBattleSlice';
import { TCaseGame } from '../../../../types/caseTypes';
import { AvatarsList } from '../../../AvatarsList/AvatarsList';
import { T } from '../../../../i18n/translate';
import { PriceWithCoin } from '../../..//PriceWithCoin/PriceWithCoin';
import { getCaseBattleTotalUnboxedValue } from '../../../../utils/caseBattle.utils';
import { useIsSmallScreenCaseBattleItem } from '../../../../hooks/useMediaHooks';
import styles from './Winners.module.scss';

type TProps = {
  caseBattle: TCaseGame;
  summary?: boolean;
};

export const Winners = memo(({ caseBattle, summary }: TProps) => {
  const isSmall = useIsSmallScreenCaseBattleItem();

  const [totalUnboxedValue, winners] = useMemo(() => {
    return [
      getCaseBattleTotalUnboxedValue(caseBattle),
      getCaseBattleWinners(
        caseBattle.winningTeam,
        caseBattle.winners,
        caseBattle.playersInDuel,
        caseBattle.battleType
      )
    ];
  }, [caseBattle]);

  return (
    <div className={styles.root}>
      {summary && (
        <div>
          <div className={styles.title}>
            <T id="common.Winners" defaultMessage="Winners" />
          </div>
          <PriceWithCoin highlight className={styles.totalWin}>{totalUnboxedValue}</PriceWithCoin>
        </div>
      )}
      <AvatarsList players={winners} avatarSize={isSmall ? 28 : 39} />
    </div>
  );
});
