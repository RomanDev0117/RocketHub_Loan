import { REWARDS_MOBILE_BREAKPOINT } from '@/constants';
import { useMedia } from 'react-use';

export const useIsMobileHeader = () => {
  return useMedia('(max-width: 680px)');
};

export const useIsSmallScreenCaseBattleItem = () => {
  return useMedia('(max-width: 870px)');
};


export const useIsSmallCaseBattle = () => {
  return useMedia('(max-width: 900px)');
};

export const useSm = () => {
  return useMedia('(max-width: 600px)');
};

export const useXs = () => {
  return useMedia('(max-width: 480px)');
};

export const useIsRewardsMobile = () => {
  return useMedia(`(max-width: ${REWARDS_MOBILE_BREAKPOINT}px)`);
};