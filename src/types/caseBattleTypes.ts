import { TPlayerUnboxedItem, TTotalValueUnboxedOfPlayer } from './caseTypes';

export type TCurrentRoundItem = {
  player: string; // player1, player2
  items: TPlayerUnboxedItem[];
}

export type TOnRoundFinishedData = {
  action: 'round finished';
  id: string;
  currentRound: 1;
  currentRoundItems: TCurrentRoundItem[];
  currentRoundTotals: TTotalValueUnboxedOfPlayer[];
};
