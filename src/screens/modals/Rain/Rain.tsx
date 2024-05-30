import { useGetRainQuery, useJoinRainMutation } from '@/store/slices/rockethubApi/rain.endpoints';
import { RainUI } from './components/RainUI/RainUI';
import { useEffect } from 'react';
import { openRain } from '@/store/actions/appActions';
import { useRainSockets } from './useRainSockets';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { useSelector } from 'react-redux';
import { selectUserLevel, selectUserSteamId } from '@/store/slices/userSlice';
import { RainTipPopup } from '../RainTipPopup/RainTipPopup';

export const Rain = () => {
  const { data } = useGetRainQuery();
  const level = useSelector(selectUserLevel);
  const steamid = useSelector(selectUserSteamId);
  useRainSockets();

  const [joinRainApi, joinResult] = useJoinRainMutation();
  useHandleApiError({
    data: joinResult.data,
    isError: joinResult.isError,
    error: joinResult.error,
  });

  const shouldRenderRain = !!data?.activeRain?.active;

  useEffect(() => {
    if (!shouldRenderRain) {
      return;
    }

    const timerId = setTimeout(() => {
      openRain();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [data?.activeRain?.id]);


  // data = {
  //   activeRain: {
  //     active: true,
  //     createdAt: Date.now() / 1000,
  //     endingAt: Date.now() / 1000,
  //     id: '70670a0e-6f36-4526-95fc-71d9c39aa64b',
  //     players: [
  //       {
  //         level: 41,
  //         steamid: '76561197980435117',
  //       },
  //     ],
  //     totalPot: 5,
  //   },
  // };

  if (!shouldRenderRain) {
    return null;
  }

  return (
    <>
      <RainUI
        rain={data.activeRain}
        onJoin={() => joinRainApi({
          userLevel: level,
          steamid: steamid as string,
        })}
      />
      <RainTipPopup />
    </>
  );
};
