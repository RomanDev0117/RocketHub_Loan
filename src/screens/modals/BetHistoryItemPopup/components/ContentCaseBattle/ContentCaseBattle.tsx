import { TBetHistoryCaseBattleItem } from '@/types/betHistory.types';
import {
  ProvablyFairSection,
  TProvablyFairSectionProps,
} from '../ProvablyFairSection/ProvablyFairSection';
import { Divider } from '@/components/Divider/Divider';
import { formatBetHistoryDate } from '@/utils/date.utils';
import { BetHistoryPopupHeader, TDataItem } from '../BetHistoryPopupHeader/BetHistoryPopupHeader';
import { BetHistoryCaseBattleTopInfo } from '../BetHistory.CaseBattle.TopInfo/BetHistoryCaseBattleTopInfo';
import { Spacer } from '@/components/Spacer/Spacer';
import { BlockTitleSmall } from '@/components/Typography/Typography';
import { BetHistoryCaseBattleCases } from '../BetHistory.CaseBattle.Cases/BetHistoryCaseBattleCases';
import { BetHistoryCaseBattleResults } from '../BetHistory.CaseBattle.Results/BetHistoryCaseBattleResults';
import { BetHistoryCaseBattlePlayerItems } from '../BetHistory.CaseBattle.PlayerItems/BetHistoryCaseBattlePlayerItems';
import styles from './ContentCaseBattle.module.scss';

type TProps = {
  item: TBetHistoryCaseBattleItem;
};

export const ContentCaseBattle = ({ item }: TProps) => {
  const provablyFairItems: TProvablyFairSectionProps['items'] = [
    [
      {
        label: 'EOS Block hash',
        value: item.eos_block_id,
        canCopy: true,
      },
      {
        label: 'EOS ID',
        value: item.flare_id,
        canCopy: true,
      },
    ],
    {
      label: 'Public server seed',
      value: item.public_server_seed,
      canCopy: true,
    },
    {
      label: 'Server seed',
      value: item.server_seed,
      canCopy: true,
    },
    {
      label: 'Battle started at',
      value: formatBetHistoryDate(item.time_start),
    },
  ];

  const headerData: TDataItem[] = [
    {
      label: 'Game ID',
      value: item.id
    },
    {
      label: 'Created',
      value: new Date(item.time_start)
    },
  ];

  return (
    <div className={styles.container}>
      <BetHistoryPopupHeader data={headerData} />

      <Divider />

      <BetHistoryCaseBattleTopInfo item={item} />

      <Spacer y={28} />

      <BlockTitleSmall uppercase>Players in this Battle</BlockTitleSmall>

      <Spacer y={12} />


      <div className={styles.itemsGrid}>
        {item.playersInDuel.map((player) => {
          const playerKey = `player${player.positionIdx + 1}`;
          const playerData = item.playerItemsUnboxedPerCase.find(p => p[playerKey]);
          const unboxedItems = playerData?.[playerKey]?.items || [];
          return (
            <BetHistoryCaseBattlePlayerItems
              player={player}
              unboxedItems={unboxedItems}
              caseBattle={item}
            />
          );
        })}
      </div>

      <Spacer y={28} />

      <BlockTitleSmall uppercase>crates in this Battle</BlockTitleSmall>

      <Spacer y={12} />

      <BetHistoryCaseBattleCases cases={item.cases} />

      <Spacer y={28} />

      <BetHistoryCaseBattleResults item={item} />

      <Divider my={28} />

      <ProvablyFairSection items={provablyFairItems} />
    </div>
  );
};
