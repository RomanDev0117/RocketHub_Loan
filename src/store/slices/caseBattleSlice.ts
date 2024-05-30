import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TAppState } from '..';
import {
  BATTLE_TYPE,
  TCase,
  TCaseGame,
  TCaseItem,
  TDuelPlayer,
  TTotalValueUnboxedOfPlayer,
  TWinner,
} from '../../types/caseTypes';
import { TCurrentRoundItem } from '../../types/caseBattleTypes';
import {
  getCaseBattleTotalUnboxedValue,
  isCaseBattleFinished,
} from '../../utils/caseBattle.utils';
import { PA } from '../../types/utility.types';

export type TCaseBattleState = {
  caseBattle: TCaseGame | null;
  eos_block_id: string | null;
  server_seed: string | null;
  timer: number;
  battleStarting: boolean;
  winItems: Record<number, TCaseItem>;
  currentRoundTotals: TTotalValueUnboxedOfPlayer[];
  currentRoundItems: TCurrentRoundItem[];
  joinSpectatorLoungeModalOpen: boolean;
};

const initialState: TCaseBattleState = {
  caseBattle: null,
  eos_block_id: null,
  server_seed: null,
  timer: 0,
  battleStarting: false,
  winItems: {},
  currentRoundTotals: [],
  currentRoundItems: [],
  joinSpectatorLoungeModalOpen: false,
};

const caseBattleSlice = createSlice({
  initialState,
  name: 'caseBattle',
  reducers: {
    resetState: () => {
      return initialState;
    },
    setCaseBattle: (state, action: PA<TCaseGame | null>) => {
      state.caseBattle = action.payload;
    },
    updateCaseBattle: (state, action: PA<Partial<TCaseGame>>) => {
      if (!state.caseBattle) return;
      state.caseBattle = {
        ...state.caseBattle,
        ...action.payload,
      };
    },
    setEosBlockId: (state, action: PA<TCaseGame['eos_block_id']>) => {
      state.eos_block_id = action.payload;
    },
    setServerSeed: (state, action: PA<TCaseGame['server_seed']>) => {
      state.server_seed = action.payload;
    },
    setTimer: (state, action: PA<number>) => {
      state.timer = action.payload;
    },
    setBattleStarting: (state, action: PA<boolean>) => {
      state.battleStarting = action.payload;
    },
    setWinItems: (state, action: PA<TCaseBattleState['winItems']>) => {
      state.winItems = action.payload;
    },
    setCurrentRoundTotals: (
      state,
      action: PA<TCaseBattleState['currentRoundTotals']>
    ) => {
      state.currentRoundTotals = action.payload;
    },
    setCurrentRoundItems: (
      state,
      action: PA<TCaseBattleState['currentRoundItems']>
    ) => {
      state.currentRoundItems = action.payload;
    },
    setJoinSpectatorLoungeModalOpen: (state, action: PA<boolean>) => {
      state.joinSpectatorLoungeModalOpen = action.payload;
    },
  },
});

export const caseBattleActions = caseBattleSlice.actions;
export const caseBattleReducer = caseBattleSlice.reducer;

export const selectCaseBattle = (state: TAppState) =>
  state.caseBattle.caseBattle;
export const selectEosBlockId = (state: TAppState) =>
  state.caseBattle.eos_block_id || state.caseBattle.caseBattle?.eos_block_id;
export const selectServerSeed = (state: TAppState) =>
  state.caseBattle.server_seed || state.caseBattle.caseBattle?.server_seed;
export const selectTimer = (state: TAppState) => state.caseBattle.timer;
export const selectBattleStarting = (state: TAppState) =>
  state.caseBattle.battleStarting;
export const selectWinItems = (state: TAppState) => state.caseBattle.winItems;
export const selectIsDuel = (state: TAppState) =>
  state.caseBattle.caseBattle?.battleType === BATTLE_TYPE['2v2'];
export const selectCurrentRoundTotals = (state: TAppState) =>
  state.caseBattle.currentRoundTotals;
export const selectCurrentRoundItems = (state: TAppState) =>
  state.caseBattle.currentRoundItems;
export const selectTotalRounds = (state: TAppState) =>
  state.caseBattle.caseBattle?.cases.length || 0;

export const selectCaseBattleCases = (state: TAppState) =>
  selectCaseBattle(state)?.cases || (EMPTY_ARRAY as TCase[]);
export const selectCaseBattleRound = (state: TAppState) =>
  selectCaseBattle(state)?.currentRound || 0;
export const selectPublicServerSeed = (state: TAppState) =>
  selectCaseBattle(state)?.public_server_seed;
export const selectFlareId = (state: TAppState) =>
  selectCaseBattle(state)?.flare_id;
export const selectWinningTeam = (state: TAppState) =>
  selectCaseBattle(state)?.winningTeam;
export const selectWinners = (state: TAppState) =>
  selectCaseBattle(state)?.winners;
export const selectPlayersInDuel = (state: TAppState) =>
  selectCaseBattle(state)?.playersInDuel;
export const selectCaseBattleType = (state: TAppState) =>
  selectCaseBattle(state)?.battleType;
export const selectCaseBattleCursed = (state: TAppState) =>
  selectCaseBattle(state)?.cursed;
export const selectCaseBattletTotalValueUnboxedPerPlayer = (state: TAppState) =>
  selectCaseBattle(state)?.totalValueUnboxedPerPlayer;

export const selectCaseBattleTotalUnboxedValue =
  (steamId: string) => (state: TAppState) => {
    return selectCaseBattle(state)?.totalValueUnboxedPerPlayer?.find(
      (p) => p.steamid === steamId
    );
  };

export const selectCaseBattleFinished = (state: TAppState) =>
  isCaseBattleFinished(state.caseBattle.caseBattle);

export const selectTotalUnboxedValue = (state: TAppState) => {
  const caseBattle = selectCaseBattle(state);
  return getCaseBattleTotalUnboxedValue(caseBattle);
};

export const selectPlayerUnboxed =
  (steamId: string | number) => (statre: TAppState) =>
    statre.caseBattle.caseBattle?.totalValueUnboxedPerPlayer.find(
      (u) => u.steamid === steamId
    );
export const selectPlayerUnboxedCases = (statre: TAppState) =>
  statre.caseBattle.caseBattle?.playerItemsUnboxedPerCase;
export const selectPlayerWon =
  (steamId: string | number) => (statre: TAppState) =>
    statre.caseBattle.caseBattle?.winners.find((w) => w.steamid === steamId);

const EMPTY_ARRAY: any[] = [];

export const selectWinnerPlayers = createSelector(
  selectWinningTeam,
  selectWinners,
  selectPlayersInDuel,
  selectCaseBattleType,
  (w, e, r, t) => {
    return getCaseBattleWinners(w, e, r, t);
  }
);

export const getCaseBattleWinners = (
  winningTeam: string | undefined,
  winners: TWinner[] | undefined,
  playersInDuel: TDuelPlayer[] | undefined,
  battleType: BATTLE_TYPE | undefined
) => {
  battleType;
  if (typeof winningTeam === 'undefined' || !winners || !playersInDuel) {
    return EMPTY_ARRAY as TDuelPlayer[];
  }

  let winPlayers: TWinner[] = [];

  // if (battleType === BATTLE_TYPE['2v2']) {
  //   if (`${winningTeam}` === '0') {
  //     winPlayers = winners;
  //   } else {
  //     winPlayers = winners.filter((w) => `${w.team}` === `${parseInt(winningTeam) + 1}`);
  //   }
  // } else {
  //   const maxAmount = Math.max(...winners.map((w) => w.amount));
  //   winPlayers = winners.filter((w) => w.amount === maxAmount);
  // }

  const maxAmount = Math.max(...winners.map((w) => w.amount));
  winPlayers = winners.filter((w) => w.amount === maxAmount);

  return winPlayers
    .map((w) => playersInDuel.find((p) => p.steamid === w.steamid))
    .filter(Boolean);
};

export const selectJoinSpectatorLoungeModalOpen = (state: TAppState) =>
  state.caseBattle.joinSpectatorLoungeModalOpen;
