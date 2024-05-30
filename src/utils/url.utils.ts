import { TNotAPaymentResponse } from '@/types/api/api.types';
import { BASE_URL, NO_PAYMENT_CO_IFRAME_BASE_URL, STATIC_BASE_URL, UPLOADS_URL } from '../constants';
import { getAppState } from '../store';
import { selectUserId } from '../store/slices/userSlice';
import { RewardType } from '../types/app.types';
import { ROUTE } from '../types/routeTypes';

export const getGamePath = (game: string) => {
  return ROUTE.GAME.replace(':gameName', game);
};

export const getCaseBattlePath = (id: string) => {
  return ROUTE.CASE_BATTLE.replace(':battleId', id);
};

export const getProfilePath = (steamId: string | undefined) => {
  if (!steamId) return '';
  return ROUTE.PROFILE.replace(':steamId', steamId);
};

export const getProfileTransactionsPath = (steamId: string | undefined) => {
  if (!steamId) return '';
  return ROUTE.PROFILE_TRANSACTIONS.replace(':steamId', steamId);
};

export const getProfileBetHistoryPath = (steamId: string | undefined) => {
  if (!steamId) return '';
  return ROUTE.PROFILE_BET_HISTORY.replace(':steamId', steamId);
};

export const getProfileReferralsPath = (steamId: string | undefined) => {
  if (!steamId) return '';
  return ROUTE.PROFILE_REFERRALS.replace(':steamId', steamId);
};

export const getCurrentUserTransactionsPath = () => {
  const userId = selectUserId(getAppState());
  return getProfileTransactionsPath(userId);
};

export const getSupportPath = () => '/support';

export const getReferralUrl = (code: string) => {
  return `${BASE_URL}${ROUTE.REFERRAL_ROUTE.replace(':code', code)}`;
};

export const getReferralUrlBase = () => {
  return `${BASE_URL}${ROUTE.REFERRAL_ROUTE_BASE}`;
};

export const getUploadUrl = (path?: string) => {
  if (!path) return '';
  return UPLOADS_URL + '/' + path;
};

export const getImageUrl = (url = '') => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${STATIC_BASE_URL}${url}`;
};

export const getOpenCasePath = (caseId: string) => {
  return ROUTE.OPEN_CASE.replace(':caseId', caseId);
};

export const getAdminCaseDetailsPath = (caseId: string) => {
  return ROUTE.ADMIN_CASE_DETAILS.replace(':caseId', caseId);
};

export const getSteamImageUrl = (imageId?: string) => {
  if (!imageId) return undefined;
  return imageId.startsWith('http')
    ? imageId
    : `https://community.cloudflare.steamstatic.com/economy/image/${imageId}`;
};

export const getLevelImageUrlByRewardType = (rank?: RewardType) => {
  if (!rank) return '';
  return `/images/levels/${rank.toLocaleLowerCase()}.png`;
};

export const getNotAPaymentUrl = (data: TNotAPaymentResponse | undefined, flow: 'buy' | 'sell') => {
  const paramsObj = {
    externalTransactionId: data?.externalTransactionId || '',
    externalUserId: data?.externalUserId || '',
    injectionVector: data?.injectionVector || '',
    balance: `${data?.balance || ''}`,
    flow,
  };

  const params = new URLSearchParams(paramsObj);
  const url = `${NO_PAYMENT_CO_IFRAME_BASE_URL}?${params.toString()}`;

  return url;
};