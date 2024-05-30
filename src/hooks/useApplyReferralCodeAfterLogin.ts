import { useCallback, useEffect } from 'react';
import { userApi } from '../insolve-framework';
import { TUser } from '../types/userTypes';
import { captureException } from '@sentry/react';
import { LS_REFERRAL_KEY } from '../constants';
import { TReferralData } from '../types/localStorage.types';
import { addDays, differenceInHours } from 'date-fns';
import { useUseReferralCodeMutation } from '../store/slices/rockethubApi/referral.endpoints';

export const useApplyReferralCodeAfterLogin = () => {
  const [applyReferralCode] = useUseReferralCodeMutation();

  const applyReferralCodeIfNeeded = useCallback(async (user: TUser) => {

    const unsubscribe = () => {
      userApi.off('signed in', applyReferralCodeIfNeeded);
    };

    if (user.referredBy) {
      unsubscribe();
      return;
    }

    const dataJSON = localStorage.getItem(LS_REFERRAL_KEY);
    if (!dataJSON) {
      unsubscribe();
      return;
    }

    let data: TReferralData;

    try {
      data = JSON.parse(dataJSON);

      const date = new Date(data.expiresMS);
      const nowPlus1Day = addDays(Date.now(), 1);

      if (differenceInHours(nowPlus1Day, date) < 0) {
        // referral link active only for 24h and it's expired here
        unsubscribe();
        return;
      }
    } catch (e) {
      captureException(e);
      console.error(e);
      unsubscribe();
      return;
    }


    try {
      await applyReferralCode({ code: data.code });
    } catch (e) {
      // there is no need to show this error to the user as this logic is a background process
      captureException(e);
      console.error(e);
    }

    unsubscribe();
  }, [applyReferralCode]);

  useEffect(() => {
    userApi.on('signed in', applyReferralCodeIfNeeded);
  }, [applyReferralCodeIfNeeded]);
};