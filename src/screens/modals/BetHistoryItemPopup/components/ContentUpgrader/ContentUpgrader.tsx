import { TBetHistoryUpgraderItem } from '@/types/betHistory.types';
import {
  ProvablyFairSection,
  TProvablyFairSectionProps,
} from '../ProvablyFairSection/ProvablyFairSection';
import { Divider } from '@/components/Divider/Divider';
import { formatBetHistoryDate } from '@/utils/date.utils';
import { UnboxedItemsList } from '@/components/UnboxedItemsList/UnboxedItemsList';
import { Spacer } from '@/components/Spacer/Spacer';
import { BlockTitleSmall } from '@/components/Typography/Typography';
import {
  BetHistoryPopupHeader,
  TDataItem,
} from '../BetHistoryPopupHeader/BetHistoryPopupHeader';
import { BetHistoryPopupUpgraderChanceDetails } from '../BetHistoryPopupUpgraderChanceDetails/BetHistoryPopupUpgraderChanceDetails';
import { BetHistoryPopupUpgraderDetails } from '../BetHistoryPopupUpgraderDetails/BetHistoryPopupUpgraderDetails';
import styles from './ContentUpgrader.module.scss';

type TProps = {
  item: TBetHistoryUpgraderItem;
};

export const ContentUpgrader = ({ item }: TProps) => {
  const provablyFairItems: TProvablyFairSectionProps['items'] = [
    [
      {
        label: 'Client seed',
        value: item.clientSeed,
        canCopy: true,
      },
      {
        label: 'Nonce',
        value: item.nonce,
        canCopy: true,
      },
    ],
    {
      label: 'Server seed',
      value: item.serverSeed,
      canCopy: true,
    },
    {
      label: 'Upgraded at',
      value: formatBetHistoryDate(item.createdAt * 1000),
    },
  ];
  const headerData: TDataItem[] = [
    {
      label: 'Bet ID',
      value: item.id,
    },
    {
      label: 'Created',
      value: new Date(item.createdAt * 1000),
    },
  ];

  const items = (item.items || []).map((item) => item.itemData);

  return (
    <>
      <BetHistoryPopupHeader data={headerData} />

      <Divider />

      <div className={styles.topRow}>
        <BetHistoryPopupUpgraderDetails item={item} />

        <BetHistoryPopupUpgraderChanceDetails item={item} />
      </div>

      <Spacer y={28} />

      <BlockTitleSmall uppercase>Upgrade items</BlockTitleSmall>

      <Spacer y={12} />

      <UnboxedItemsList caseItems={items} itemProps={{ size: 's' }} />

      <Divider my={28} />

      <ProvablyFairSection items={provablyFairItems} />
    </>
  );
};
