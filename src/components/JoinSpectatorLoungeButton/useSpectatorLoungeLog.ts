import { LS_SPECTATOR_LOUNGE_LOG } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type TJoinLog = {
  [steamId: string]: {
    [caseBattleId: string]: number;
  }
}

export const useSpectatorLoungeLog = () => {
  const [joinLog, setJoinLog] = useLocalStorage<TJoinLog>(LS_SPECTATOR_LOUNGE_LOG, {} as TJoinLog);

  const clearLogFromOldData = (joinLog: TJoinLog | undefined) => {
    if (!joinLog) return joinLog;

    // returns requests log with old data removed

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const newLog: TJoinLog = {};

    Object.keys(joinLog || {}).forEach((key) => {
      const _userRequests = {} as { [caseBattleId: string]: number };

      Object.keys(joinLog?.[key] || {}).forEach((caseBattleId) => {
        const date = joinLog?.[key]?.[caseBattleId];

        if (!date || Date.now() - date < 3 * ONE_DAY) {
          _userRequests[caseBattleId] = date;
        }

      });

      if (Object.keys(_userRequests).length > 0) {
        newLog[key] = _userRequests;
      }
    });

    return newLog;
  };

  const logJoin = (steamId: string, caseBattleId: string) => {
    const updatedLog = clearLogFromOldData(joinLog);

    setJoinLog({
      ...updatedLog,
      [steamId]: {
        ...updatedLog?.[steamId],
        [caseBattleId]: Date.now(),
      },
    });
  };

  const hasJoined = (steamId?: string, caseBattleId?: string) => {
    if (!steamId || !caseBattleId) return false;

    return Boolean(joinLog?.[steamId]?.[caseBattleId]);
  };

  return {
    logJoin,
    hasJoined,
  };
};