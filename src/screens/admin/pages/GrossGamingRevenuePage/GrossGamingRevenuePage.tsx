import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import styles from './GrossGamingRevenuePage.module.scss';
import { useLazyGetStatisticsGGRQuery } from '@store/slices/rockethubApi/statistic.endpoints.ts';
import GenericTable from '@components/GenericTable/GenericTable.tsx';
import { Box } from '@components/Box/Box.tsx';
import { Flex } from '@components/Flex/Flex.tsx';
import { toFixed } from '@utils/number.utils.ts';
import { Button } from '@components/Button/Button.tsx';
import { TextField } from '@components/Form/TextField/TextField.tsx';
import Loader from '@components/Loader/Loader.tsx';
import { Moment } from 'moment';

interface TGGRGameStats {
  wagered: number;
  winnings: number;
  ggr: number;
  ggrm: string;
  gameType: string;
}

const { RangePicker } = DatePicker;

export const Component = () => {
  const [ggrDataSource, setGGRDataSource] = useState<TGGRGameStats[]>([]);
  const [dateTimeRange, setDateTimeRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [steamid, setSteamid] = useState('');

  const [triggerFetchGGR, { data: ggrData, isFetching }] =
    useLazyGetStatisticsGGRQuery();

  const handleSubmit = async () => {
    const [start, end] = dateTimeRange || [];
    await triggerFetchGGR({
      startDate: start?.toISOString(),
      endDate: end?.toISOString(),
      steamid: steamid || undefined,
    });
  };

  useEffect(() => {
    if (ggrData?.gameTypeResponse) {
      const stats = Object.entries(ggrData.gameTypeResponse).map(
        ([gameType, stats]) => ({
          gameType,
          ...stats,
        })
      );
      setGGRDataSource(stats);
    }
  }, [ggrData]);

  const COLUMNS = {
    gameType: (gameStats: TGGRGameStats) => gameStats.gameType,
    ggr: (gameStats: TGGRGameStats) => toFixed(gameStats.ggr, 2),
    ggrm: (gameStats: TGGRGameStats) => gameStats.ggrm,
    wagered: (gameStats: TGGRGameStats) => toFixed(gameStats.wagered, 2),
    winnings: (gameStats: TGGRGameStats) => toFixed(gameStats.winnings, 2),
  };

  const HEADERS = ['Type', 'GGR', 'GGRM', 'Wagered', 'Winnings'];

  return (
    <Box direction="column" className={styles.container}>
      <Flex container gap={6} alignItems="center" className={styles.title}>
        GGR Statistics
      </Flex>
      <div className={styles.content}>
        <div className={styles.datePicker}>
          <RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ format: 'HH:mm:ss' }}
            onChange={(dates) => setDateTimeRange(dates as [Moment, Moment])}
          />
        </div>
        <TextField
          placeholder="Enter Steam ID"
          value={steamid}
          onChange={(e) => setSteamid(e.target.value)}
        />
        <Button size="m" color="secondary-v3" pressable onClick={handleSubmit}>
          Submit
        </Button>
        <div className={styles.table}>
          <Loader
            loading={isFetching}
            position="absolute"
            zIndex={100}
            backdrop
          />
          <GenericTable
            items={ggrDataSource.map((data, index) => {
              return {
                id: index.toString(),
                ...data,
              };
            })}
            columns={COLUMNS}
            columnNames={HEADERS}
            disablePagination={true}
          />
        </div>
      </div>
    </Box>
  );
};
