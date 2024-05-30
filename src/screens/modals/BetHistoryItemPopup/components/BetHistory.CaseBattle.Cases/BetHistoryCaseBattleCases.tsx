import { TCase } from '@/types/caseTypes';
import styles from './BetHistoryCaseBattleCases.module.scss';
import { getUploadUrl } from '@/utils/url.utils';
import { useMemo } from 'react';

type TProps = {
  cases: TCase[];
}

export const BetHistoryCaseBattleCases = ({ cases }: TProps) => {
  const grouppedCases = useMemo(() => {
    return cases.reduce((acc, c) => {
      if (!acc[c.id]) {
        acc[c.id] = {
          amount: 0,
          caseData: c,
        };
      }

      acc[c.id].amount += 1;

      return acc;
    }, {} as Record<string, { amount: number, caseData: TCase }>);
  }, [cases]);

  return (
    <div className={styles.container}>
      {Object.values(grouppedCases).map(({ amount, caseData }, index) => (
        <div key={index} className={styles.item}>
          <img src={getUploadUrl(caseData.image)} className={styles.image} />
          <span className={styles.amount}>{amount}x</span>
        </div>
      ))}
    </div>
  );
};