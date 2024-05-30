import { formatBetHistoryDate } from '@/utils/date.utils';
import styles from './BetHistoryPopupHeader.module.scss';
import { Spacer } from '@/components/Spacer/Spacer';

type TProps = {
  data: TDataItem[];
};

export type TDataItem = {
  label: string;
  value: string | Date;
};

export const BetHistoryPopupHeader = ({ data }: TProps) => {
  return (
    <div className={styles.container}>
      {data.map((item, idx) => {
        return (
          <div className={styles.item} key={idx}>
            <div className={styles.label}>{item.label}</div>
            <Spacer y={6} />
            <div className={styles.text}>
              {item.value instanceof Date
                ? formatBetHistoryDate(item.value)
                : item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
