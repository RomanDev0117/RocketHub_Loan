import { TBetHistoryCaseOpeningItem } from '@/types/betHistory.types';
import {
  ProvablyFairSection,
  TProvablyFairSectionProps,
} from '../ProvablyFairSection/ProvablyFairSection';
import { Divider } from '@/components/Divider/Divider';
import { formatBetHistoryDate } from '@/utils/date.utils';
import { UnboxedItemsList } from '@/components/UnboxedItemsList/UnboxedItemsList';
import { BlockTitleSmall } from '@/components/Typography/Typography';
import { Spacer } from '@/components/Spacer/Spacer';
import {
  BetHistoryPopupHeader,
  TDataItem,
} from '../BetHistoryPopupHeader/BetHistoryPopupHeader';
import { BetHistoryPopupCaseDetails } from '../BetHistoryPopupCaseDetails/BetHistoryPopupCaseDetails';
import { Flex } from '@/components/Flex/Flex';
import { Button } from '@/components/Button/Button';
import { Link } from 'react-router-dom';
import { getOpenCasePath } from '@/utils/url.utils';
import styles from './ContentCaseOpening.module.scss';

type TProps = {
  item: TBetHistoryCaseOpeningItem;
};

export const ContentCaseOpening = ({ item }: TProps) => {
  const provablyFairItems: TProvablyFairSectionProps['items'] = [
    [
      {
        label: 'Client seed',
        value: item?.clientSeed,
        canCopy: true,
      },
      {
        label: 'Nonce',
        value: item?.nonce,
        canCopy: true,
      },
    ],
    {
      label: 'Public server seed',
      value: item?.publicServerSeed,
      canCopy: true,
    },
    {
      label: 'Case opened at',
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

  return (
    <>
      <BetHistoryPopupHeader data={headerData} />

      <Divider />

      <Flex container justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={16}>
        <BetHistoryPopupCaseDetails caseData={item.caseInfo} />

        <Button
          pressable
          Component={Link}
          href={getOpenCasePath(item.caseInfo.id)}
          className={styles.openMoreButton}
        >
          Open More
        </Button>
      </Flex>

      <Spacer y={28} />

      <BlockTitleSmall uppercase>Your unboxing</BlockTitleSmall>

      <Spacer y={12} />

      <UnboxedItemsList
        // className={styles.itemsGrid}
        caseItems={item?.caseInfo.items || []}
        itemProps={{ size: 's' }}
      />

      <Divider my={28} />

      <ProvablyFairSection items={provablyFairItems} />
    </>
  );
};
