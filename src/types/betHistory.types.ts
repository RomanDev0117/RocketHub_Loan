import { TCase, TCaseGame, TCaseItem } from './caseTypes';
import { TSteamItem } from './steam.types';
import { RollType } from './upgrader.types';
import { TWaxpeerItem } from './waxpeer.types';

export enum BetHistoryType {
  CASE_BATTLES = 'battles',
  CASE_OPENING = 'caseOpenings',
  UPGRADER = 'upgrader',
}

export type TBetHistoryItem =
  | TBetHistoryCaseBattleItem
  | TBetHistoryCaseOpeningItem
  | TBetHistoryUpgraderItem;

// case battle item
export type TBetHistoryCaseBattleItem = TCaseGame & {
  itemType: BetHistoryType.CASE_BATTLES;
};

// case opening item
export type TBetHistoryCaseOpeningItem = {
  itemType: BetHistoryType.CASE_OPENING;
  amountWon: number;
  caseInfo: TCase;
  createdAt: number;
  id: string;
  itemWin: TCaseItem & {
    chance: number[];
  };
  price: number;
  userId: string;


  clientSeed: string;
  publicServerSeed: string;
  nonce: number;
  outcome: number;
  reel: number;
};

// upgrader item
export type TBetHistoryUpgraderItem = {
  itemType: BetHistoryType.UPGRADER;
  amountWon: number;
  betAmount: number;
  clientSeed: string;
  createdAt: number;
  id: string;
  items: TBetHistoryUpgraderItemBetItem[];
  nonce: number;
  result: number;
  roll: RollType;
  serverSeed: string;
  tickets: {
    max: number;
    min: number;
  };
  userId: string;
  win: boolean;
};

export type TBetHistoryUpgraderItemBetItem = {
  itemData: TSteamItem | TWaxpeerItem;
  price: number;
};
