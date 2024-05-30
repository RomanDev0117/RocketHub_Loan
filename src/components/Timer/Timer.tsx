import { useTimer } from 'react-timer-hook';
import useTranslation from '../../hooks/useTranslation';
import styles from './Timer.module.scss';
import { FormattedPlural } from 'react-intl';

type TProps = {
  expiryDate: Date;
};

export const Timer = ({ expiryDate }: TProps) => {
  const { t } = useTranslation();
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryDate,
  });

  const items = [
    // {
    //   value: days,
    //   label: (
    //     <FormattedPlural
    //       one={t({ id: 'common.timer.Day', defaultMessage: 'Day' })}
    //       other={t({ id: 'common.timer.Days', defaultMessage: 'Days' })}
    //       value={days}
    //     />
    //   ),
    // },
    {
      value: hours,
      label: (
        <FormattedPlural
          one={t({ id: 'common.timer.Hour', defaultMessage: 'Hour' })}
          other={t({ id: 'common.timer.Hours', defaultMessage: 'Hours' })}
          value={days}
        />
      ),
    },
    {
      value: minutes,
      label: t({ id: 'common.timer.Min', defaultMessage: 'Min' }),
    },
    {
      value: seconds,
      label: t({ id: 'common.timer.Sec', defaultMessage: 'Sec' }),
    },
  ];

  return (
    <div className={styles.container}>
      {items.map((item, idx) => {
        return (
          <div key={idx} className={styles.item}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
