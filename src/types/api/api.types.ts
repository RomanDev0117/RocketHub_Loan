import { TAdminCoupon } from '../admin.types';
import { DepositRewardType, RewardType } from '../app.types';
import { TBetHistoryItem } from '../betHistory.types';
import { GAME_TYPE, TCaseItem } from '../caseTypes';
import { TSystemNotification, TUserNotification } from '../notification.types';
import { CRYPTO_CURRENCY_U } from '../payment.types';
import { TRain } from '../rain.types';
import { RewardsAmountMap, TUser, TUserReward } from '../userTypes';
import { TVault } from '../vault.types';

export type TPaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  per_page: number;
};

export type TGetAffiliateDataResponse = {
  success: boolean;
  data: {
    earningsRefCurrent: number;
    earningsRefTotal: number;
    totalReferred: number;
  };
};

export type TErrorResponse = {
  success: false;
  msg: string;
};

export type TSimpleSuccessResponse = {
  success: true;
  msg: string;
};

export type TSuccessResponse<T> = {
  success: true;
  data: T;
};

export type TCreateSuccessResponse = {
  success: true;
  msg: string;
};

export type TDailyRaceResponse = {
  success: boolean;
  data: {
    wageredWeekly: TWageredWeeklyItem[];
    rewards: TRewardItem[];
  };
};

export type TRewardItem = {
  price: number;
};

export type TWageredWeeklyItem = {
  avatar: string;
  name: string;
  steamid: string;
  wagered: number;
  level: number;
};

export type TOpenCasesResponse = {
  success: true;
  item: TCaseItem[];

  // provably fair
  nonce: number[];
  publicServerSeed: string;
  newPublicserverSeed: string;
  serverSeed: string;
};

export type TTipUserSuccessResponse = {
  success: true;
  msg: string;
};

export type TRotateServerSeedSuccessResponse = {
  success: true;
  publicServerSeed: string;
};

export type TCollectEarningsResponse = {
  success: true;
};

export type TGetUserDataBySteamIdResponse = {
  success: true;
  user: TUser;
};

export type TUpgraderSuccessResponse = {
  success: true;
  tickets: {
    min: number;
    max: number;
  };
  result: number;
  win: boolean;
  amountWon: number;
  provablyfair: {
    serverSeed: string;
    clientSeed: string;
    nonce: number;
  };
};

export type TFeatureFlag = {
  enabled: boolean;
  name: string;
  type: string;
};

export type TGetFeatureFlagsSuccessResponse = {
  featureFlags: TFeatureFlag[];
};

export type TUpdateFeatureFlagSuccessResponse = {
  featureFlag: TFeatureFlag;
};

export type TUpdateFeatureFlagRequest = {
  enabled: boolean;
};

export type TGetFeatureFlagResponse =
  | TGetFeatureFlagsSuccessResponse
  | TErrorResponse;

export type TPostStatisticsGGRRequest = {
  startDate?: string;
  endDate?: string;
  steamid?: string;
};

export type GameStats = {
  wagered: number;
  winnings: number;
  ggr: number;
  ggrm: string;
};

export type GameTypeResponse = {
  CASE_BATTLE: GameStats;
  CASE_OPENING: GameStats;
  WHEEL_OF_FORTUNE: GameStats;
  JACKPOT: GameStats;
  UPGRADER: GameStats;
  TOWERS: GameStats;
  TOTAL: GameStats;
};

export type TGetGGRResponse = {
  success: boolean;
  gameTypeResponse: GameTypeResponse;
};

export type TUpgraderErrorResponse = {
  success: false;
};

export type TUpgraderResponse =
  | TUpgraderErrorResponse
  | TUpgraderSuccessResponse;

export type TGetWaxpeerItemsResponse = any; // TODO: work on this type

export type TGetUserCryptoAddressListResponse = {
  success: true;
  data: {
    addresses: TUserCryptoAddress[];
    steamid: string;
  };
};

export type TUserCryptoAddress = {
  address: string;
  id: string;
  label: string;
  type: CRYPTO_CURRENCY_U;
};

export type TGetUserReferralsResponse = {
  data: {
    referralsResponse: TReferralItem[];
    totalWagered: number;
  };
  page: number;
  per_page: number;
  total: number;
  success: boolean;
};

type TReferralItem = {
  name: string;
  wagered: number;
  earningsForReferrer: number;
};

export type TCreateNewCaseRequestData = {
  id?: string;
  image: File;
  title: string;
  price: number;
  isEdit: boolean;
  type: GAME_TYPE;
  rewardType: RewardType | null;
  items: TCreateNewCaseItem[];
};

export type TCreateNewCaseItem = {
  name: string;
  image: string;
  price: number;
  percentage: number;
  color: string;
};

export type TGetNotificationsSuccessResponse = {
  success: true;
  unreadUserNotificationsCount: number;
  userNotifications: TUserNotification[];
  systemNotifications: TSystemNotification[];
};

export type TGetBetHistoryByTypeResponse = TPaginatedResponse<TBetHistoryItem>;

export type TGetRainSuccessResponse = {
  activeRain: TRain;
};

export type TAdminGetCouponsSuccess = {
  coupons: TAdminCoupon[];
  success: true;
};

export type TGetUserRewardsResponse = {
  userRewards: TUserReward[];
  wagered: number;
  nextClaim: number;
  rakebackRewards: TRakebackReward[];
  bonusRewards: TBonusReward[];
};

export type TGetUserRewardsResponseMapped = {
  userRewards: RewardsAmountMap;
  wagered: number;
  nextClaim: number;
  rakebackRewards: TRakebackReward[];
  bonusRewards: TBonusReward[];
};

export type TRakebackReward = {
  amount: number;
  category: 'rakeback' | 'bonus';
  id: string;
  reward_type: RewardType;
  steamid: string;
};

export type TBonusReward = TRakebackReward;

export type TGetVaultResponse = {
  vault?: TVault;
};

export type TUpdateVaultRequestData = {
  amount: number;
  action: 'deposit' | 'withdraw';
  lock?: boolean;
  lockDuration?: number; // seconds
};

export type TBitInvestorResponse = {
  url: string;
};

export type TNotAPaymentResponse = {
  success: boolean;
  externalTransactionId: string;
  externalUserId: string;
  balance: number;
  injectionVector: string;
};

export type TPayoutsResponse = {
  success: boolean;
  total: number;
  payoutsByType: {
    sponsored: number;
    rain: number;
    affiliates: number;
    rewards: number;
    weeklyRace: number;
    coupons: number;
    referralCodes: number;
    dailyRewards: number;
    weeklyRewards: number;
    lounge: number;
  };
};

export type TDepositReward = {
  enabled: boolean;
  minDepositAmount: number;
  name: string;
  timeBetweenRewards: number;
  type: DepositRewardType;
};

export type TGetDepositRewardsResponse = {
  depositRewards: TDepositReward[];
};
