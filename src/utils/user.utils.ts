import { TChatUser } from '@/types/chatTypes';
import { TUser, UserType } from '@/types/userTypes';
import { getLvlDetails } from './level.utils';
import { positiveOrZero } from './number.utils';

export const generateClientSeed = () => {
  const length = 10;
  let newClientSeed = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    newClientSeed += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return newClientSeed;
};

export const isAdmin = (user: TUser | TChatUser | null) => {
  return user?.rank === UserType.Admin;
};

export const isModerator = (user: TUser | TChatUser | null) => {
  return user?.rank === UserType.Moderator;
};

export const getLevelProgress = (user: TUser | TChatUser | null) => {
  if (!user) return 0;

  const { level, wagered } = user;
  const lvlInfo = getLvlDetails(level || 0);

  const value = positiveOrZero((wagered || 0) - lvlInfo.minWager);
  const maxValue = (lvlInfo.maxWager - lvlInfo.minWager) || 999999999;

  return value * 100 / maxValue;
};