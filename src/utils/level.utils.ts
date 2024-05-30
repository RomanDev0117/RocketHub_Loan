import { levels } from '../constants/levels';
import { RewardType } from '../types/app.types';

export const getLvlDetails = (lvl: number) => {
  return levels.find((info) => info.level === lvl) || levels[levels.length - 1];
};

type TLevelConfigItem = {
  min: number;
  max: number;
  color: string;
  tier: RewardType;
};

type TLevelImageConfig = {
  min: number;
  max: number;
  img: string;
};

export const levelImageConfig: TLevelImageConfig[] = [
  { min: 1, max: 9, img: '/images/levels/bronze.png' },
  { min: 10, max: 19, img: '/images/levels/silver.png' },
  { min: 20, max: 29, img: '/images/levels/gold.png' },
  { min: 30, max: 39, img: '/images/levels/platinum.png' },
  { min: 40, max: 49, img: '/images/levels/diamond.png' },
  { min: 50, max: 59, img: '/images/levels/meteorite.png' },
  { min: 60, max: 69, img: '/images/levels/marstronaut.png' },
  { min: 70, max: 79, img: '/images/levels/ancient.png' },
  { min: 80, max: 89, img: '/images/levels/legend.png' },
  { min: 90, max: 200, img: '/images/levels/immortal.png' },
];

export const levelsConfig: TLevelConfigItem[] = [
  {
    min: 0,
    max: 9,
    color: '#E5A466',
    tier: RewardType.Bronze,
  },
  {
    min: 10,
    max: 19,
    color: '#E8E9EA',
    tier: RewardType.Silver,
  },
  {
    min: 20,
    max: 29,
    color: '#FCC339',
    tier: RewardType.Gold,
  },
  {
    min: 30,
    max: 39,
    color: '#B3C8F2',
    tier: RewardType.Platinum,
  },
  {
    min: 40,
    max: 49,
    color: '#E29EFF',
    tier: RewardType.Diamond,
  },
  {
    min: 50,
    max: 59,
    color: '#6AE683',
    tier: RewardType.Meteorite,
  },
  {
    min: 60,
    max: 69,
    color: '#FFFFCD',
    tier: RewardType.Marstronaut,
  },
  {
    min: 70,
    max: 79,
    color: '#2585CB',
    tier: RewardType.Ancient,
  },
  {
    min: 80,
    max: 89,
    color: '#F05923',
    tier: RewardType.Legend,
  },
  {
    min: 90,
    max: 100,
    color: '#F53B57',
    tier: RewardType.Immortal,
  },
];

const DEFAULT_COLOR = levelsConfig[0].color;

export const getLevelColor = (level?: number) => {
  if (!level) {
    return DEFAULT_COLOR;
  }

  const config = getLevelConfig(level);

  return config?.color || DEFAULT_COLOR;
};

export const getLevelIconConfig = (level?: number) => {
  if (!level) {
    return levelImageConfig[0];
  }

  const config = levelImageConfig.find((config) => {
    return config.min <= level && config.max >= level;
  });

  return config;
};

export const getLevelConfig = (level?: number) => {
  if (!level) {
    return levelsConfig[0];
  }

  const config = levelsConfig.find((config) => {
    return config.min <= level && config.max >= level;
  });

  return config || levelsConfig[0];
};

export const getLevelIcon = (level: number | undefined) => {
  return getLevelIconConfig(level)?.img;
};

export const getNextLevelIcon = (level?: number): string | null => {
  const config = getLevelIconConfig(level);
  const index = levelImageConfig.indexOf(config!);
  return levelImageConfig[index + 1]?.img || levelImageConfig[index].img || '';
};

export const getLevelConfigByTier = (tier?: RewardType) => {
  const config = levelsConfig.find((config) => {
    return config.tier === tier;
  });

  return config;
};
