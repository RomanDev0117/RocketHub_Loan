import { addDays, format } from 'date-fns';

export const formatTransactionDate = (date: number | Date) => {
  const d = typeof date === 'number' ? new Date(date) : date;
  return format(d, 'MMM d yyyy HH:mm');
};

export const formatBanDate = formatTransactionDate;
export const formatBetHistoryDate = formatTransactionDate;

export const getDailyRaceEndDate = () => {
  const d = addDays(new Date(), 1);
  d.setUTCHours(0, 0, 0);
  return d;
};
