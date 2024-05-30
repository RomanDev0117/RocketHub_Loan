import { isEmpty } from 'lodash';
import {
  HOUSE_EDGE,
  UPGRADER_MAX_BET_AMOUNT,
  UPGRADER_MAX_CHANCE,
  UPGRADER_MIN_BET,
  UPGRADER_MIN_CHANCE,
} from '../../constants';
import { getAppState } from '../../store';
import { selectUpgraderSelectedItems } from '../../store/slices/upgrader.slice';
import { isWaxpeerItem } from '../../utils/app.utils';
import { toFixed } from '../../utils/number.utils';
import { getWaxpeerItemPrice } from '../../utils/waxpeer.utils';
import { TWaxpeerItem } from '../../types/waxpeer.types';
import { TSteamItem } from '../../types/steam.types';
import { selectUserBalance } from '../../store/slices/userSlice';

export const calculateValidationBetAmount = () => {
  const items = selectUpgraderSelectedItems(getAppState());
  const userBalance = selectUserBalance(getAppState());

  const defaultMaxBet = Math.min(UPGRADER_MAX_BET_AMOUNT, userBalance);

  if (isEmpty(items)) {
    return {
      min: UPGRADER_MIN_BET,
      max: defaultMaxBet,
    };
  }

  const totalItemsPrice = getItemsTotalPrice(items);
  const minBet = calculateBetAmount(UPGRADER_MIN_CHANCE);
  const maxBet = Math.min(
    calculateBetAmount(UPGRADER_MAX_CHANCE),
    defaultMaxBet,
    totalItemsPrice - 0.01,
  );

  return {
    min: minBet,
    max: maxBet,
  };
};

export const calculateBetAmount = (chance: number | null) => {
  const items = selectUpgraderSelectedItems(getAppState());

  if (!chance) {
    return 0;
  }

  const totalPrice = getItemsTotalPrice(items);

  const betAmount = (chance / 100 / (1 - HOUSE_EDGE)) * totalPrice;

  return parseFloat(betAmount.toFixed(2));
};

export const calculateChanceFromBetAmount = (
  betAmount: number | null | string,
  precision = 2,
) => {
  const items = selectUpgraderSelectedItems(getAppState());

  if (isEmpty(items)) {
    return 0;
  }

  if (!betAmount) {
    return 0;
  }

  if (typeof betAmount === 'string') {
    return 0;
  }

  const itemsValue = getItemsTotalPrice(items);

  const chance = (betAmount / itemsValue) * (1 - HOUSE_EDGE) * 100;

  return toFixed(chance, precision);
  // return parseFloat(chance.toFixed(2));
};

export const minMaxChance = (chance: any) => {
  const chanceNumber = parseFloat(chance as string);
  return Math.min(
    Math.max(chanceNumber, UPGRADER_MIN_CHANCE),
    UPGRADER_MAX_CHANCE
  );
};

export const normalizeChance = (chance: any): number => {
  chance = parseFloat(chance as string);

  if (!chance) {
    return 0;
  }

  if (typeof chance === 'number') {
    const chancePerMaxBetAmount = calculateChanceFromBetAmount(
      UPGRADER_MAX_BET_AMOUNT
    );
    const maxChance = Math.min(chancePerMaxBetAmount, UPGRADER_MAX_CHANCE);

    if (chance > maxChance) {
      chance = maxChance;
    } else if (chance < UPGRADER_MIN_CHANCE) {
      chance = UPGRADER_MIN_CHANCE;
    }

    return parseFloat(chance as string);
  }

  return 0;
};

export const normalizeBetAmount = (betAmount: any): number => {
  betAmount = parseFloat(betAmount as string);

  if (!betAmount) {
    return 0;
  }

  if (typeof betAmount !== 'number') {
    return 0;
  }

  let normalizedBetAmount = Math.max(betAmount, UPGRADER_MIN_BET);

  normalizedBetAmount = Math.min(
    betAmount,
    UPGRADER_MAX_BET_AMOUNT,
    selectUserBalance(getAppState()),
  );

  return normalizedBetAmount;

};


export const getItemsTotalPrice = (items: (TWaxpeerItem | TSteamItem)[]) => {
  const total = items.reduce((acc, item) => {
    const price = isWaxpeerItem(item) ? getWaxpeerItemPrice(item) : item.price;
    return acc + price * 100;
  }, 0);

  return toFixed(total / 100, 2);
};

export const getMinMaxPercentageBasedOnTotalPrice = (items: (TWaxpeerItem | TSteamItem)[]) => {

  if (isEmpty(items)) {
    return {
      max: UPGRADER_MAX_CHANCE,
      min: UPGRADER_MIN_CHANCE
    };
  }
  const { max: maxBet } = calculateValidationBetAmount();

  let maxChanceByBet = calculateChanceFromBetAmount(maxBet);
  const minChanceByBet = calculateChanceFromBetAmount(UPGRADER_MIN_CHANCE);

  if (calculateBetAmount(maxChanceByBet) >= maxBet) {
    // sometimes calculated chance is too big because of decimal points and rounding the number
    maxChanceByBet = toFixed(maxChanceByBet - 0.01, 2);
  }

  return {
    max: Math.min(maxChanceByBet, UPGRADER_MAX_CHANCE),
    min: Math.max(minChanceByBet, UPGRADER_MIN_CHANCE)
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTicketByBetAmount = (betAmount: number, _items: (TWaxpeerItem | TSteamItem)[]) => {
  const chance = calculateChanceFromBetAmount(betAmount, 5);

  return parseInt(`${chance * 1000}`);
};