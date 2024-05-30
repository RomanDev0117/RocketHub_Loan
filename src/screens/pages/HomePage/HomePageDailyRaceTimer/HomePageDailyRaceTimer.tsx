import { useMemo } from 'react';
import { getDailyRaceEndDate } from '../../../../utils/date.utils';
import { useTimer } from 'react-timer-hook';
import { ClockIcon } from '../../../../components/icons/ClockIcon';

export const HomePageDailyRaceTimer = () => {
  // const { t } = useTranslation();

  const date = useMemo(() => {
    return getDailyRaceEndDate();
  }, []);


  const {
    minutes,
    hours,
    days
  } = useTimer({ expiryTimestamp: date });

  // const items = [
  //   { value: days, label: t({ id: 'common.timer.Day', defaultMessage: 'Day' }) },
  //   { value: hours, label: t({ id: 'common.timer.Hour', defaultMessage: 'Hour' }) },
  //   { value: minutes, label: t({ id: 'common.timer.Min', defaultMessage: 'Min' }) },
  //   { value: seconds, label: t({ id: 'common.timer.Sec', defaultMessage: 'Sec' }) },
  // ];

  return (
    <>
      Ends in {days} days, {hours}h {minutes}min <ClockIcon />
    </>
  );
};