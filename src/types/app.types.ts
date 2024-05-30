export type TLevelDetails = {
  level: number;
  minWager: number;
  maxWager: number;
  rewards: Record<RewardType, number>;
};

export type TLevelDetailsWithId = TLevelDetails & {
  id: string;
};

export enum RewardType {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Meteorite = 'meteorite',
  Marstronaut = 'marstronaut',
  Ancient = 'ancient',
  Legend = 'legend',
  Immortal = 'immortal',

  // others
  Bitinvestor = 'bitinvestor',
  Zen = 'zen',
  AlphapoUsdtt = 'alphapo_usdtt',
  AlphapoBtc = 'alphapo_btc',
  AlphapoEth = 'alphapo_eth',
  AlphapoLtc = 'alphapo_ltc',
  AlphapoTrx = 'alphapo_trx',

  // lossback
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export enum DepositRewardType {
  Bitinvestor = 'bitinvestor',
  Zen = 'zen',
  AlphapoUsdtt = 'alphapo_usdtt',
  AlphapoBtc = 'alphapo_btc',
  AlphapoEth = 'alphapo_eth',
  AlphapoLtc = 'alphapo_ltc',
  AlphapoTrx = 'alphapo_trx',
}