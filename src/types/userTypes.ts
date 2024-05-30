import { RewardType } from './app.types';
import { TDuelPlayer } from './caseTypes';
import { TChatUser } from './chatTypes';

export type TUser = {
  avatar: string;
  email?: string;
  emailVerified?: boolean;
  balance: number;
  code: string;
  crypto_address: {
    BTC: string;
    ETH: string;
    LTC: string;
  };
  deposited: number;
  earningsRefCurrent: number;
  earningsRefTotal: number;
  exp: number;
  id: string;
  join_date: number; // 1689279597
  last_steam_inv_update: number;
  level: number;
  name: string;
  profit: number;
  rank: UserType;
  referredBy: string;
  steamid: string;
  tickets: number;
  token: string;
  wagered: number;
  withdrawn: number;
  tradelink: string;
  banned: false;
  seed: string | null;
  publicServerSeed: string | null;
  notificationsDisabled?: boolean;
};

export enum UserType {
  Normal = 0,
  Moderator = 1,
  Admin = 2,
}

export type TGlobalUser = TUser | TChatUser | TDuelPlayer;

export type TUserReward = {
  id: string;
  steamid: string;
  reward_type: RewardType;
  amount: number;
};

export type RewardsAmountMap = Record<RewardType, number>;
