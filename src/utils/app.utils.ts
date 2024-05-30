import { TCase } from '@/types/caseTypes';
import { TAdminCaseItem } from '../types/admin.types';
import { TSkinsBackCsGoItem } from '../types/skinsback.types';
import { TSteamItem } from '../types/steam.types';
import { TWaxpeerItem } from '../types/waxpeer.types';
import { levelRewards } from '@/constants';

export const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export function preloadImage(imgUrl: string) {
  const img = new Image();
  img.src = imgUrl;
}

export type RGB = {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  if (!hex) {
    return { r: 0, g: 0, b: 0 };
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export const rgbToRgbaStr = ({ r, g, b }: RGB, alpha: number) => {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isSteamItem = (item: any): item is TSteamItem => {
  if (!item) return false;
  return 'tradableAfter' in item;
};

export const isWaxpeerItem = (item: any): item is TWaxpeerItem => {
  if (!item) return false;
  return 'rarity_color' in item;
};

export const isAdminCaseItem = (item: any): item is TAdminCaseItem => {
  if (!item) return false;
  return 'prices' in item;
};

export const isSkinsBackCsGoItem = (item: any): item is TSkinsBackCsGoItem => {
  if (!item) return false;
  return 'extra' in item;
};

export const isCsGoItem = (item: any): item is TSkinsBackCsGoItem | TWaxpeerItem => {
  return isWaxpeerItem(item) || isSkinsBackCsGoItem(item);
};


export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isPromise(p: any) {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}

export const isLevelCase = (caseData: TCase | null | undefined) => {
  if (!caseData) {
    return false;
  }

  if (!caseData.rewardType) {
    return false;
  }

  return levelRewards.includes(caseData.rewardType);
};