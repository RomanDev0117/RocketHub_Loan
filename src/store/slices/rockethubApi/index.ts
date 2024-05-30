import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../../constants';

// initialize an empty api service that we'll inject endpoints into later as needed
export const rockethubApi = createApi({
  reducerPath: 'rockethubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api`,
    credentials: 'include',
    method: 'POST',
  }),
  tagTypes: [
    'AffiliateData',
    'UserCryptoAddressList',
    'Cases',
    'AdminCase',
    'UserRewards',
    'Notifications',
    'Coupons',
    'Vault',
    'Stake',
  ],
  endpoints: () => ({}),
});
