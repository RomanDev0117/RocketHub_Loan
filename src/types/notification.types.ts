export enum NotificationType {
  CryptoDeposit = 'crypto_deposit',
  CryptoWithdraw = 'crypto_withdraw',
  SteamDeposit = 'steam_deposit',
  SkinsbackDeposit = 'skinsback_deposit',
  SkinsbackWithdraw = 'skinsback_withdraw',
  WaxpeerWithdraw = 'waxpeer_withdraw',
  Reward = 'reward',
  Tip = 'tip',
  LevelUp = 'levelup',
  Rain = 'rain',
  System = 'system',
  BitInvestorDeposit = 'bitinvestor_deposit',
  SpectatorLounge = 'spectator_lounge',
  NotapaymentWithdraw = 'notapayment_withdraw',
  AccountLock = 'account_lock',
  WithdrawalLock = 'withdrawal_lock',
  Email = 'email',
  Zen = 'zen_deposit',
}

export type TNotification = TUserNotification | TSystemNotification;

export type TUserNotification = {
  id: string;
  steamid: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created: number;
  display: boolean; // decides if we need to show notification to the user or not
};

export type TSystemNotification = {
  created: number;
  id: string;
  message: string;
  read: boolean;
  subtype: 'other';
  type: NotificationType.System;
};
