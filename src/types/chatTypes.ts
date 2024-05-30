import { UserType } from './userTypes';

export type TChatMessage = {
  content: string;
  user: TChatUser;
  time: number; // 1689267114
  type?: MessageType; // it's provided by javascript
  msgType?: string; // 'error' // it's provided by javascript
  data?: TipData;
};

export enum MessageType {
  User = 'user',
  System = 'system',
  Tip = 'tip',
  RainTip = 'rainTip',
}

export type TChatMessageExtended = {
  isNew: boolean;
} & TChatMessage;

// TODO: check if battle user has same type
export type TChatUser = {
  avatar: string;
  name: string;
  tickets: number;
  isInDiscord: boolean;
  steamid: string;
  rank: UserType;
  exp: number;
  profit: number;
  wagered: number;
  deposited: number;
  withdrawn: number;
  level: number;
  join_date: number; // 1687535378
};

export type TRoom = {
  name: number;
  flag?: 'US' | 'PL' | 'DE' | 'SE' | 'LT';
  users: number;
};

export enum ChatCommand {
  TIP = '/tip',
}

export type TipData = {
  tipAmount: number;
  recipientUser: TChatUser;
};
