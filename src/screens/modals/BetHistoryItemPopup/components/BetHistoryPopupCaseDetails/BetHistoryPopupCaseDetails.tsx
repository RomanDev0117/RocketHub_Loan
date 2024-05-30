import { TCase } from '@/types/caseTypes';
import styles from './BetHistoryPopupCaseDetails.module.scss';
import { getUploadUrl } from '@/utils/url.utils';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { Truncate } from '@/components/Truncate/Truncate';
import { Spacer } from '@/components/Spacer/Spacer';

type TProps = {
  caseData: TCase;
};

export const BetHistoryPopupCaseDetails = ({ caseData }: TProps) => {
  return (
    <div className={styles.container}>
      <img src={getUploadUrl(caseData.image)} className={styles.image} />
      <div className={styles.content}>
        <Truncate className={styles.title}>{caseData.title}</Truncate>

        <Spacer y={6} />

        <PriceWithCoin className={styles.price} fontWeight={800} gap={6}>
          {caseData.price}
        </PriceWithCoin>
      </div>
    </div>
  );
};
