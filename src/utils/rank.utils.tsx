import { Rank1Icon } from '../components/icons/ranks/Rank1Icon';
import { Rank2Icon } from '../components/icons/ranks/Rank2Icon';
import { Rank3Icon } from '../components/icons/ranks/Rank3Icon';
import { Rank4Icon } from '../components/icons/ranks/Rank4Icon';
import { Rank5Icon } from '../components/icons/ranks/Rank5Icon';
import { TChatUser } from '../types/chatTypes';
import { TUser } from '../types/userTypes';

type TRankItem = {
  min: number;
  max: number;
  Icon: any;
  rank: number;
  name: string;
  color: string;
}

export const ranksConfig: TRankItem[] = [
  // min is included, max is excluded
  {
    min: 0,
    max: 10,
    Icon: Rank1Icon,
    rank: 1,
    name: 'first',
    color: '#0EA5E9',
  },
  {
    min: 10,
    max: 50,
    Icon: Rank2Icon,
    rank: 2,
    name: 'second',
    color: '#C03BEF',
  },
  {
    min: 50,
    max: 100,
    Icon: Rank3Icon,
    rank: 3,
    name: 'third',
    color: '#B0E90E',
  },
  {
    min: 100,
    max: 200,
    Icon: Rank4Icon,
    rank: 4,
    name: 'fourth',
    color: '#EC6D26',
  },
  {
    min: 200,
    max: 400,
    Icon: Rank5Icon,
    rank: 5,
    name: 'fifth',
    color: '#56EDF6',
  },
  {
    min: 400,
    max: 700,
    Icon: Rank1Icon,
    rank: 6,
    name: 'sixth',
    color: '#F34A4A',
  },
  {
    min: 700,
    max: 1000,
    Icon: Rank2Icon,
    rank: 7,
    name: 'sevent',
    color: '#F3CE4A',
  },
  {
    min: 1000,
    max: 2000,
    Icon: Rank3Icon,
    rank: 8,
    name: 'eigth',
    color: '#7D72FE',
  },
  {
    min: 2000,
    max: 5000,
    Icon: Rank4Icon,
    rank: 9,
    name: 'nineth',
    color: '#29A5FF',
  },
];

export const getUserRank = (user?: TUser | TChatUser | null): TRankItem => {
  if (!user) return ranksConfig[0];

  const rank = ranksConfig.find(rank => {
    return rank.min <= user.wagered && rank.max > user.wagered;
  });

  return rank || ranksConfig[0];
};

export const getUserNextRank = (user?: TUser | null): TRankItem => {
  const userRank = getUserRank(user);
  const index = ranksConfig.indexOf(userRank);
  return ranksConfig[index + 1] || ranksConfig[ranksConfig.length - 1];
};