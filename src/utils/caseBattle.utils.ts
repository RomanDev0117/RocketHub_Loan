import { TUser } from '@/types/userTypes';
import { BATTLE_TYPE, TCaseGame } from '../types/caseTypes';

export const isCaseBattleCreator = ({
  steamId,
  caseBattle,
}: {
  steamId: string | undefined;
  caseBattle?: TCaseGame | null;
}) => {
  return Boolean(caseBattle) && caseBattle?.player1?.steamid === steamId;
};

export const getCaseBattleTotalUnboxedValue = (
  caseBattle: TCaseGame | null
) => {
  if (!caseBattle) return 0;
  return caseBattle.totalValueUnboxedPerPlayer.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );
};

export const isCaseBattleFinished = (caseBattle: TCaseGame | null) => {
  return caseBattle?.status === 2;
};

export const isCaseBattleInProgress = (caseBattle: TCaseGame | null) => {

  // for some reason status is not being updated
  // return caseBattle?.status === 1;
  return (caseBattle?.currentRound ?? 0) > 0;
};

export const isCaseBattleStarted = (caseBattle: TCaseGame | null) => {
  if (!caseBattle) return false;

  return caseBattle.currentRound > 0;
};

export const isAlreadyJoinedCaseBattle = (
  caseBattle: TCaseGame | null,
  userOrSteamId: TUser | string | undefined
) => {
  if (!caseBattle) {
    return false;
  }

  return caseBattle.playersInDuel.some((player) =>
    typeof userOrSteamId === 'object'
      ? player.steamid === userOrSteamId.steamid
      : player.steamid === userOrSteamId
  );
};

export const canJoinCaseBattle = (
  caseBattle: TCaseGame | null,
  userOrSteamId: TUser | string | undefined
) => {
  const steamId =
    typeof userOrSteamId === 'object' ? userOrSteamId.steamid : userOrSteamId;

  const alreadyJoined = isAlreadyJoinedCaseBattle(caseBattle, steamId);
  const battleEnded = isCaseBattleFinished(caseBattle);
  const battleInProgress = isCaseBattleInProgress(caseBattle);
  const isCreator = isCaseBattleCreator({
    steamId,
    caseBattle,
  });

  return !battleEnded && !battleInProgress && !isCreator && !alreadyJoined;
};

export const canJoinLounge = (
  caseBattle: TCaseGame | null,
  userOrSteamId: TUser | string | undefined,
  hasJoined: (
    steamId?: string | undefined,
    caseBattleId?: string | undefined
  ) => boolean
) => {
  const steamId =
    typeof userOrSteamId === 'object' ? userOrSteamId.steamid : userOrSteamId;

  const alreadyJoined = isAlreadyJoinedCaseBattle(caseBattle, steamId);
  const battleEnded = isCaseBattleFinished(caseBattle);
  const battleInProgress = isCaseBattleInProgress(caseBattle);
  const isCreator = isCaseBattleCreator({
    steamId,
    caseBattle,
  });
  const groupMode = isGroupMode(caseBattle);

  // console.log({
  //   alreadyJoined,
  //   battleEnded,
  //   battleInProgress,
  //   isCreator,
  //   groupMode,
  //   caseBattle,
  // });

  return (
    !battleEnded &&
    !battleInProgress &&
    !isCreator &&
    !alreadyJoined &&
    !groupMode &&
    Boolean(caseBattle?.id) &&
    !hasJoined(steamId, caseBattle?.id)
  );
};

export const isGroupMode = (caseBattle: TCaseGame | null) => {
  return caseBattle?.battleType === BATTLE_TYPE['4-way'];
};
