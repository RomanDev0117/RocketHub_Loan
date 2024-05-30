import clsx from 'clsx';
import { BATTLE_TYPE, TCaseGame } from '../../../../types/caseTypes';
import { PriceWithCoin } from '../../../PriceWithCoin/PriceWithCoin';
import styles from './BattleInfo.module.scss';

type TProps = {
  caseBattle: TCaseGame;
};

export const BattleInfo = ({ caseBattle }: TProps) => {
  const isGroupBattle = caseBattle.battleType === BATTLE_TYPE['4-way'];
  const label = caseBattle.cursed
    ? 'Cursed'
    : isGroupBattle
      ? 'Group'
      : '';

  return (
    <div className={styles.container}>
      <PriceWithCoin>{caseBattle.price}</PriceWithCoin>
      <span className={styles.battleType}>{caseBattle.battleType}</span>

      <span
        className={clsx(styles.label, {
          [styles.cursed]: caseBattle.cursed,
          [styles.group]: isGroupBattle,
        })}
      >
        {label}
      </span>
    </div>
  );
};
