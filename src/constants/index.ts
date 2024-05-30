import {
  CARD_TYPE,
  CRYPTO_CURRENCY,
  PAYMENT_TYPE_GAME,
  PaymentBadge,
} from '../types/payment.types';
import bitcoin from '../assets/images/icons/crypto/bitcoin.svg';
import ethereum from '../assets/images/icons/crypto/ethereum.svg';
import usdt from '../assets/images/icons/crypto/usdt.svg';
import litecoin from '../assets/images/icons/crypto/litecoin.svg';
import binance from '../assets/images/icons/crypto/binance-coin.svg';
import tron from '../assets/images/icons/crypto/tron-coin.svg';
import busd from '../assets/images/icons/crypto/busd.svg';
import { ROUTE } from '../types/routeTypes';
import { captureException } from '@sentry/react';
import { TOption } from '../components/Dropdown/Dropdown';
import { WOFColor } from '../types/wheelOfFortune.types';
import { NotificationType } from '@/types/notification.types';
import { DepositIcon } from '@/components/icons/notifications/DepositIcon';
import { WithdrawIcon } from '@/components/icons/notifications/WithdrawIcon';
import { RewardIcon } from '@/components/icons/notifications/RewardIcon';
import { SystemIcon } from '@/components/icons/notifications/SystemIcon';
import { TipsIcon } from '@/components/icons/notifications/TipsIcon';
import { LevelUpIcon } from '@/components/icons/notifications/LevelUpIcon';
import { RainIcon } from '@/components/icons/notifications/RainIcon';
import { LoungeIcon } from '@/components/icons/notifications/LoungeIcon';
import { DepositRewardType, RewardType } from '@/types/app.types';
import { AccountRockIcon } from '@/components/icons/notifications/AccountRockIcon';

if (
  !import.meta.env.VITE_APP_API_BASE ||
  !import.meta.env.VITE_APP_AUTH_URL ||
  !import.meta.env.VITE_APP_STATIC_BASE_URL ||
  !import.meta.env.VITE_APP_BASE_URL
) {
  const error = new Error('.env Configuration is incorrect');
  captureException(error);
  throw error;
}

export const APP_ENV = import.meta.env.VITE_APP_ENV; // dev | prod | stage
export const APP_RELEASE = import.meta.env.VITE_APP_RELEASE;

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE;
export const AUTH_URL = import.meta.env.VITE_APP_AUTH_URL as string;
export const STATIC_BASE_URL = import.meta.env
  .VITE_APP_STATIC_BASE_URL as string;
export const STEAM_AUTH_URL = AUTH_URL + '/auth/steam';
export const UPLOADS_URL = BASE_URL + '/uploads';
export const NO_PAYMENT_CO_IFRAME_BASE_URL = import.meta.env
  .VITE_APP_NO_PAYMENT_CO_IFRAME_BASE_URL;

// local storage
export const LS_REFERRAL_KEY = 'RH_REFERRAL_DATA';
export const LS_SPECTATOR_LOUNGE_LOG = 'RH_SPECTATOR_LOUNGE_LOG';

// Social links
export const DISCORD_CHANNEL_URL = 'https://discord.com/invite/rockethub';

// Chat
export const CHAT_MESSAGE_MAX_LENGTH = 140;

// User
export const MIN_USER_LEVEL = 0;
export const DEFAULT_USER_AVATAR = '';

// TOAST
export const MAX_TOAST_COUNT = 5;

// CASE OPEN
export const SPIN_ANIMAION_DURAION = {
  FAST_OPEN: 2000,
  DEFAULT: 5000,
};

//
export const HEADER_BALANCE_COUNT_UP_DURATION = 1;

// Sorting
export const ASC = 'ASC';
export const DESC = 'DESC';

// Payment
export const STEAM_APP_ID = 252490;

export const MIN_CARD_DEPOSIT = 5;
export const MAX_CARD_DEPOSIT = 500;
export const MAX_DEPOSIT_USD = 1000;
export const MAX_WITHDRAWAL = 3500;
export const DEFAULT_DEPOSIT_USD = 5;

export const CRYPTO_WITHDRAWAL_MIN_USD_AMOUNT = {
  [CRYPTO_CURRENCY.BITCOIN]: 60,
  [CRYPTO_CURRENCY.ETHEREUM]: 60,
  [CRYPTO_CURRENCY.USDT]: 60,
  [CRYPTO_CURRENCY.LITECOIN]: 60,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 60,
  [CRYPTO_CURRENCY.BUSD]: 60,
  [CRYPTO_CURRENCY.TRON]: 60,
};

export const CRYPTO_WITHDRAWAL_MAX_USD_AMOUNT = {
  [CRYPTO_CURRENCY.BITCOIN]: 100000,
  [CRYPTO_CURRENCY.ETHEREUM]: 100000,
  [CRYPTO_CURRENCY.USDT]: 100000,
  [CRYPTO_CURRENCY.LITECOIN]: 100000,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 100000,
  [CRYPTO_CURRENCY.BUSD]: 100000,
  [CRYPTO_CURRENCY.TRON]: 100000,
};

export const CRYPTO_DEPOST_MIN_AMOUNT = {
  [CRYPTO_CURRENCY.BITCOIN]: 0.0001,
  [CRYPTO_CURRENCY.ETHEREUM]: 0.01,
  [CRYPTO_CURRENCY.USDT]: 20,
  [CRYPTO_CURRENCY.LITECOIN]: 0.01,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 10,
  [CRYPTO_CURRENCY.BUSD]: 10,
  [CRYPTO_CURRENCY.TRON]: 10,
};

export const CRYPTO_CONFIRMATIONS_REQUIRED = {
  [CRYPTO_CURRENCY.BITCOIN]: 1,
  [CRYPTO_CURRENCY.ETHEREUM]: 10,
  [CRYPTO_CURRENCY.USDT]: 20,
  [CRYPTO_CURRENCY.LITECOIN]: 1,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 1,
  [CRYPTO_CURRENCY.BUSD]: 1,
  [CRYPTO_CURRENCY.TRON]: 19,
};

export const CRYPTO_DEPOSIT_PROCESSING_TIME_MIN = {
  [CRYPTO_CURRENCY.BITCOIN]: 5,
  [CRYPTO_CURRENCY.ETHEREUM]: 5,
  [CRYPTO_CURRENCY.USDT]: 1,
  [CRYPTO_CURRENCY.LITECOIN]: 5,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 100000,
  [CRYPTO_CURRENCY.BUSD]: 100000,
  [CRYPTO_CURRENCY.TRON]: 1,
};

export const PAYMENT_BONUS_PERCENTAGE = {
  [PAYMENT_TYPE_GAME.RUST]: 0,
  [PAYMENT_TYPE_GAME.CS_GO]: 0,
  [PAYMENT_TYPE_GAME.DOTA_2]: 0,

  [CRYPTO_CURRENCY.BITCOIN]: 65,
  [CRYPTO_CURRENCY.ETHEREUM]: 65,
  [CRYPTO_CURRENCY.USDT]: 65,
  [CRYPTO_CURRENCY.LITECOIN]: 65,
  [CRYPTO_CURRENCY.BINANCE_COIN]: 65,
  [CRYPTO_CURRENCY.BUSD]: 65,
  [CRYPTO_CURRENCY.TRON]: 65,

  [CARD_TYPE.CREDIT_CARD]: 55,
  [CARD_TYPE.GIFT_CARD]: 65,
};

export const PAYMENT_GAMES = [
  PAYMENT_TYPE_GAME.RUST,
  PAYMENT_TYPE_GAME.CS_GO,
  PAYMENT_TYPE_GAME.DOTA_2,
];

export const SKINS_BACK_GAMES = [
  PAYMENT_TYPE_GAME.CS_GO,
  PAYMENT_TYPE_GAME.DOTA_2,
];

export const PAYMENT_CRYPTO = [
  CRYPTO_CURRENCY.BITCOIN,
  CRYPTO_CURRENCY.ETHEREUM,
  CRYPTO_CURRENCY.LITECOIN,
  CRYPTO_CURRENCY.USDT,
  // CRYPTO_CURRENCY.BUSD,
  // CRYPTO_CURRENCY.BINANCE_COIN,
  CRYPTO_CURRENCY.TRON,
];

export const DEPOSIT_GAMES = PAYMENT_GAMES;
export const WITHDRAW_GAMES = [
  PAYMENT_TYPE_GAME.RUST,
  PAYMENT_TYPE_GAME.CS_GO,
  PAYMENT_TYPE_GAME.DOTA_2,
];

export const DEPOSIT_CARDS = [
  CARD_TYPE.CREDIT_CARD,
  CARD_TYPE.BIT_INVESTOR,
  CARD_TYPE.NOTAPAYMENT,
];

export const DEPOSIT_CRYPTO = [
  CRYPTO_CURRENCY.BITCOIN,
  CRYPTO_CURRENCY.ETHEREUM,
  CRYPTO_CURRENCY.LITECOIN,
  CRYPTO_CURRENCY.USDT,
  CRYPTO_CURRENCY.TRON,
];
export const WITHDRAW_CARDS = [CARD_TYPE.BANK_REVOLUT];
export const WITHDRAW_CRYPTO = PAYMENT_CRYPTO;

export const CRYPTO_NAME_MAP = {
  [CRYPTO_CURRENCY.BITCOIN]: 'Bitcoin',
  [CRYPTO_CURRENCY.ETHEREUM]: 'Ethereum',
  [CRYPTO_CURRENCY.USDT]: 'USDT',
  [CRYPTO_CURRENCY.LITECOIN]: 'Litecoin',
  [CRYPTO_CURRENCY.BINANCE_COIN]: 'BNB',
  [CRYPTO_CURRENCY.BUSD]: 'BUSD',
  [CRYPTO_CURRENCY.TRON]: 'TRON',
};

// route constants
export const ROUTE_WITH_WHITE_SHADOW_ON_THE_BOTTOM_OF_THE_PAGE = [
  ROUTE.CASE_BATTLE_CREATE,
  ROUTE.CASE_BATTLE,
  ROUTE.CASE_BATTLES,
  ROUTE.CASE_OPENING,
  ROUTE.OPEN_CASE,
];

// validations
export const CLIENT_SEED_MAX_LENGTH = 10;
export const CLIENT_SEED_MIN_LENGTH = 5;

export const REFERRAL_CODE_MAX_LENGTH = 16;
export const REFERRAL_CODE_MIN_LENGTH = 1;

export const CRYPTO_CURRENCY_MAP = {
  [CRYPTO_CURRENCY.BITCOIN]: {
    color: 'rgba(253, 147, 18, 0.60)',
    img: bitcoin,
    // badge: null,
    rewardType: DepositRewardType.AlphapoBtc,
  },
  [CRYPTO_CURRENCY.ETHEREUM]: {
    color: 'rgba(144, 144, 144, 0.60)',
    img: ethereum,
    // badge: null,
    rewardType: DepositRewardType.AlphapoEth,
  },
  [CRYPTO_CURRENCY.USDT]: {
    color: 'rgba(95, 179, 156, 0.60)',
    img: usdt,
    // badge: PaymentBadge.FREE_CRATE,
    rewardType: DepositRewardType.AlphapoUsdtt,
  },
  [CRYPTO_CURRENCY.LITECOIN]: {
    color: 'rgba(69, 106, 163, 0.60)',
    img: litecoin,
    // badge: null,
    rewardType: DepositRewardType.AlphapoLtc,
  },
  [CRYPTO_CURRENCY.BUSD]: {
    color: 'rgba(240, 185, 11, 0.6)',
    img: busd,
    // badge: null,
    rewardType: null,
  },
  [CRYPTO_CURRENCY.BINANCE_COIN]: {
    color: 'rgba(240, 185, 11, 0.60)',
    img: binance,
    // badge: null,
    rewardType: null,
  },
  [CRYPTO_CURRENCY.TRON]: {
    color: 'rgba(240, 185, 11, 0.60)',
    img: tron,
    // badge: PaymentBadge.FREE_CRATE,
    rewardType: DepositRewardType.AlphapoTrx,
  },
};

// local storage keys
export const LS_SELECTED_GAME_TYPE = 'R_SELECTED_GAME_TYPE';
export const LS_SOUND = 'R_SOUND';

export const COIN_EXP_EXCHANGE = 5;

// upgrader
export const HOUSE_EDGE = 0.05;
export const UPGRADER_MAX_CHANCE = 95;
export const UPGRADER_MIN_CHANCE = 0.01;
export const UPGRADER_MIN_BET = 0.01;
export const UPGRADER_MIN_ITEMS_TOTAL_PRICE = 0.1;
export const UPGRADER_MAX_BET_AMOUNT = 500;
export const UPGRADER_MAX_ITEMS_PRICE = 10000;
export const UPGRADER_MIN_ITEMS_PRICE = 0.5;
export const UPGRADER_TICKETS_AMOUNT = 100000;
export const UPGRADER_ANIMATION_DURATION_MS = 5000;

// common
export const priceRangeOptions: TOption[] = [
  {
    value: '0-',
    label: 'All',
  },
  {
    value: '0-5',
    label: '0 — 5',
  },
  {
    value: '5-25',
    label: '5 — 25',
  },
  {
    value: '25-50',
    label: '25 — 50',
  },
  {
    value: '50-100',
    label: '50 — 100',
  },
  {
    value: '100-250',
    label: '100 — 250',
  },
  {
    value: '250-',
    label: '250 +',
  },
];

// WHEEL OF FORTUNE
export const WOF_TRANSITION_DURATION = 4500;
export const WHEEL_OF_FORTUNE_MIN_BET = 0.01;
export const WHEEL_OF_FORTUNE_MAX_BET = 500;
export const WOF_COLOR_MULTIPLIER = {
  [WOFColor.RED]: 2,
  [WOFColor.BLACK]: 3,
  [WOFColor.GREEN]: 5,
  [WOFColor.YELLOW]: 50,
};

// rewards
export const REWARDS_MOBILE_BREAKPOINT = 550;
export const REWARD_TYPE_COLOR_MAP = {};

// bet history
export const BET_HISTORY_MOBILE_BREAKPOINT = 660;

// notifications
type NotificationConfigItem = {
  Icon: any;
  title?: string;
  borderColor: string;
  glowImageName?: string;
  progressColor: string;
};

export const SS_HIDDEN_SYSTEM_NOTIFICATIONS = 'RH_HIDDEN_SYSTEM_NOTIFICATIONS';

export const NOTIFICATIONS_CONFIG: Record<
  NotificationType,
  NotificationConfigItem
> = {
  [NotificationType.CryptoDeposit]: {
    Icon: DepositIcon,
    title: 'Deposit',
    borderColor: 'rgba(76, 113, 162, 0.30)',
    glowImageName: 'glow-deposit.png',
    progressColor: '#4C71A2',
  },
  [NotificationType.CryptoWithdraw]: {
    Icon: WithdrawIcon,
    title: 'Withdraw',
    borderColor: 'rgba(175, 165, 103, 0.20)',
    glowImageName: 'glow-withdraw.png',
    progressColor: '#AFA567',
  },
  [NotificationType.SteamDeposit]: {
    Icon: DepositIcon,
    title: 'Deposit',
    borderColor: 'rgba(76, 113, 162, 0.30)',
    glowImageName: 'glow-deposit.png',
    progressColor: '#4C71A2',
  },
  [NotificationType.SkinsbackDeposit]: {
    Icon: DepositIcon,
    title: 'Deposit',
    borderColor: 'rgba(76, 113, 162, 0.30)',
    glowImageName: 'glow-deposit.png',
    progressColor: '#4C71A2',
  },
  [NotificationType.SkinsbackWithdraw]: {
    Icon: WithdrawIcon,
    title: 'Withdraw',
    borderColor: 'rgba(175, 165, 103, 0.20)',
    glowImageName: 'glow-withdraw.png',
    progressColor: '#AFA567',
  },
  [NotificationType.WaxpeerWithdraw]: {
    Icon: WithdrawIcon,
    title: 'Withdraw',
    borderColor: 'rgba(175, 165, 103, 0.20)',
    glowImageName: 'glow-withdraw.png',
    progressColor: '#AFA567',
  },
  [NotificationType.Reward]: {
    Icon: RewardIcon,
    title: 'Reward',
    borderColor: 'rgba(112, 164, 59, 0.20)',
    glowImageName: 'glow-reward.png',
    progressColor: '#5E8841',
  },

  [NotificationType.LevelUp]: {
    Icon: LevelUpIcon,
    title: 'Level up!',
    borderColor: 'rgba(97, 76, 173, 0.30)',
    glowImageName: 'glow-level-up.png',
    progressColor: '#4C71A2',
  },
  [NotificationType.Tip]: {
    Icon: TipsIcon,
    title: 'Tips Received',
    borderColor: 'rgba(140, 70, 55, 0.30)',
    glowImageName: 'glow-tip.png',
    progressColor: '#8D4637',
  },
  [NotificationType.AccountLock]: {
    Icon: AccountRockIcon,
    title: 'Account locked!',
    borderColor: 'rgba(198, 40, 40, 0.3)',
    glowImageName: 'glow-account-lock.png',
    progressColor: '#C62828',
  },
  [NotificationType.WithdrawalLock]: {
    Icon: AccountRockIcon,
    title: 'Withdrawal locked!',
    borderColor: 'rgba(198, 40, 40, 0.3)',
    glowImageName: 'glow-account-lock.png',
    progressColor: '#C62828',
  },
  [NotificationType.Rain]: {
    Icon: RainIcon,
    title: 'Rain notification',
    borderColor: 'rgba(76, 113, 162, 0.30)',
    glowImageName: 'glow-rain.png',
    progressColor: '#4C71A2',
  },
  [NotificationType.BitInvestorDeposit]: {
    Icon: DepositIcon,
    title: 'Deposit',
    borderColor: 'rgba(76, 113, 162, 0.30)',
    glowImageName: 'glow-deposit.png',
    progressColor: '#4C71A2',
  },
  // [NotificationType.SpectatorLounge]: {
  //   Icon: DepositIcon,
  //   title: 'Spectator Lounge notification',
  //   borderColor: 'rgba(76, 113, 162, 0.30)',
  //   glowImageName: 'glow-deposit.png',
  //   progressColor: '#4C71A2',
  // },
  [NotificationType.NotapaymentWithdraw]: {
    Icon: WithdrawIcon,
    title: 'Withdraw',
    borderColor: 'rgba(175, 165, 103, 0.20)',
    glowImageName: 'glow-withdraw.png',
    progressColor: '#AFA567',
  },
  [NotificationType.SpectatorLounge]: {
    Icon: LoungeIcon,
    title: 'Lounge surfer',
    borderColor: 'rgba(97, 76, 173, 0.30)',
    glowImageName: 'glow-level-up.png',
    progressColor: '#614CAD',
  },
  [NotificationType.Email]: {
    Icon: SystemIcon,
    title: 'Email',
    borderColor: 'rgba(97, 76, 173, 0.30)',
    glowImageName: 'glow-level-up.png',
    progressColor: '#614CAD',
  },
  [NotificationType.Zen]: {
    Icon: DepositIcon,
    title: 'Deposit',
    borderColor: 'rgba(175, 165, 103, 0.20)',
    glowImageName: 'glow-withdraw.png',
    progressColor: '#AFA567',
  },
  [NotificationType.System]: {
    // this notification will be shown in different way
    Icon: SystemIcon,
    title: 'System',
    borderColor: '#ad1e1e',
    progressColor: '#8D4637',
  },
};

//// VAULT
export const MAX_VAULT_DEPOSIT_AMOUNT = 10000;
export const MAX_VAULT_LOCK_DURATION_HOURS = 1000;

// Intercom
export const INTERCOM_APP_ID = 'g3ynxaj7';

// rewards
export const levelRewards = [
  RewardType.Bronze,
  RewardType.Silver,
  RewardType.Gold,
  RewardType.Platinum,
  RewardType.Diamond,
  RewardType.Meteorite,
  RewardType.Marstronaut,
  RewardType.Ancient,
  RewardType.Legend,
  RewardType.Immortal,
];
