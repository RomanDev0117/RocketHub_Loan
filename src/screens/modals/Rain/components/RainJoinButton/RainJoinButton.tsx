import { Button } from '@/components/Button/Button';
import { useSelector } from '@/store';
import { selectUserSteamId } from '@/store/slices/userSlice';
import { TRain } from '@/types/rain.types';
import { useMemo } from 'react';
import { RequiremenetsTooltip } from '@/components/RequiremenetsTooltip/RequiremenetsTooltip';

type TProps = {
  rain: TRain;
  onJoin: () => void;
};

export const RainJoinButton = ({ rain, onJoin }: TProps) => {
  const steamId = useSelector(selectUserSteamId);

  const alreadyJoined = useMemo(() => {
    return rain.players.some((player) => player.steamid === steamId);
  }, [rain.players, steamId]);

  if (alreadyJoined) {
    return null;
  }

  const requirements = [
    'Put rockethub.gg in your Steam name and re-log',
    'Join our Discord',
    'Level 10+ on Rockethub',
    'Steam profile & inventory set to public',
    'Level 5+ on Steam'
  ];

  return (
    <RequiremenetsTooltip requirements={requirements}>
      <Button height={36} pressable fullWidth onClick={() => onJoin()}>
        Join
      </Button>
    </RequiremenetsTooltip>
  );
};
