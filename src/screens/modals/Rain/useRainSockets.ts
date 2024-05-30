import { rainApi } from '@/insolve-framework';
import { openRain } from '@/store/actions/appActions';
import {
  rainApi as rainApiEndpoint,
  useLazyGetRainQuery,
} from '@/store/slices/rockethubApi/rain.endpoints';
import { TRainPlayer } from '@/types/rain.types';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type TRainJoinData = {
  action: 'rainJoin';
  content: string;
  players: TRainPlayer[];
  totalPlayers: number;
};

type TRainUpdateData = {
  totalPot: number;
};

export const useRainSockets = () => {
  const dispatch = useDispatch();
  const [getRain] = useLazyGetRainQuery();

  useEffect(() => {
    // handle rain start
    const handleRainStarted = async () => {
      const result = await getRain().unwrap();

      if (!isEmpty(result)) {
        openRain();
      }
    };

    // handle player joined rain
    const handleRainJoin = (data: TRainJoinData) => {
      dispatch(
        rainApiEndpoint.util.updateQueryData(
          'getRain',
          undefined,
          (rainData) => {
            return {
              ...rainData,
              activeRain: {
                ...rainData.activeRain,
                players: data.players,
              },
            };
          }
        ) as any
      );
    };

    // handle rain update
    const handleRainUpdate = (data: TRainUpdateData) => {
      dispatch(
        rainApiEndpoint.util.updateQueryData(
          'getRain',
          undefined,
          (rainData) => {
            return {
              ...rainData,
              activeRain: {
                ...rainData.activeRain,
                totalPot: data.totalPot,
              },
            };
          }
        ) as any
      );
    };


    rainApi.on('rainStarted', handleRainStarted);
    rainApi.on('rainJoin', handleRainJoin);
    rainApi.on('rainUpdate', handleRainUpdate);

    return () => {
      rainApi.off('rainStarted', handleRainStarted);
      rainApi.off('rainJoin', handleRainJoin);
      rainApi.off('rainUpdate', handleRainUpdate);
    };
  }, [getRain]);
};
