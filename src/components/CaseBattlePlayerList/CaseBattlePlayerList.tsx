import { Fragment } from 'react';
import { BATTLE_TYPE, TDuelPlayer } from '../../types/caseTypes';
import styles from './CaseBattlePlayerList.module.scss';
import { useCaseBattleSlots } from '../../hooks/useCaseBattleSlots';
import { CursedModeIcon } from '../icons/CursedModeIcon';
import { SwordsIconV2 } from '../icons/SwordsIconV2';
import { CaseBattleAvatar } from '../Avatar/CaseBattleAvatar';
import { useIsSmallScreenCaseBattleItem } from '../../hooks/useMediaHooks';
import clsx from 'clsx';

type TProps = {
  battleType: BATTLE_TYPE;
  playersInDuel: TDuelPlayer[];
  isCursed?: boolean;
  variant?: 'selectBox' | 'gameItem';
  selectedTeam?: number | null; // selected team starts from 1
  onSelect?: (team: number) => void;
};

export const CaseBattlePlayerList = ({
  isCursed,
  battleType,
  playersInDuel,
  variant,
  selectedTeam,
  onSelect,
}: TProps) => {
  const isSmall = useIsSmallScreenCaseBattleItem();
  const isSelectBox = variant === 'selectBox';

  const { playerSlotList } = useCaseBattleSlots({
    battleType,
    playersInDuel,
  });

  const isGroupMode = battleType === BATTLE_TYPE['4-way'];
  const isDuel = battleType === BATTLE_TYPE['2v2'];
  const TeamContainer = isSelectBox ? 'div' : Fragment;

  const gameItemSize = {
    small: 24,
    large: 40,
  };

  const selectBoxSize = {
    small: 32,
    large: 32,
  };

  const size = isSelectBox ? selectBoxSize : gameItemSize;

  return (
    <div
      className={clsx(styles.root, {
        [styles.variantSelectBox]: isSelectBox,
      })}
    >
      {playerSlotList.map((playersSlot, idx) => (
        <Fragment key={idx}>
          <TeamContainer
            className={clsx(styles.box, {
              [styles.selected]: selectedTeam === idx + 1,
              [styles.duel]: isDuel,
            })}
            onClick={() => onSelect?.(idx + 1)}
          >
            {playersSlot.map((player) => {
              return (
                <CaseBattleAvatar
                  key={player.positionIdx}
                  src={player.avatar}
                  fallback={
                    isCursed ? (
                      <CursedModeIcon />
                    ) : (
                      <CursedModeIcon fill="#fff" />
                    )
                  }
                  size={isSmall ? size.small : size.large}
                  teamIdx={idx}
                  isDuel={battleType === BATTLE_TYPE['2v2']}
                  level={player.level}
                  showLevel
                  className={styles.avatar}
                />
              );
            })}
          </TeamContainer>
          {!isGroupMode && idx !== playerSlotList.length - 1 && (
            <SwordsIconV2 className={styles.separator} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
