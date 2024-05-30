import {
  BetHistoryType,
  TBetHistoryCaseBattleItem,
  TBetHistoryCaseOpeningItem,
  TBetHistoryItem,
  TBetHistoryUpgraderItem,
} from '@/types/betHistory.types';

export const isBetHistoryCaseBattleItem = (
  item: TBetHistoryItem
): item is TBetHistoryCaseBattleItem => {
  return item.itemType === BetHistoryType.CASE_BATTLES;
};

export const isBetHistoryCaseOpeningItem = (
  item: TBetHistoryItem
): item is TBetHistoryCaseOpeningItem => {
  return item.itemType === BetHistoryType.CASE_OPENING;
};

export const isBetHistoryUpgraderItem = (
  item: TBetHistoryItem,
): item is TBetHistoryUpgraderItem => {
  return item.itemType === BetHistoryType.UPGRADER;
};