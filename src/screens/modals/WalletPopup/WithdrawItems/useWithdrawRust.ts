import { useState } from 'react';
import { TSteamItem } from '../../../../types/steam.types';
import { toast } from 'react-hot-toast';
import { userApi } from '../../../../insolve-framework';

type TArgs = {
  appId: number;
  type: 'withdraw' | 'deposit';
};

export type TResult = {
  offerId: number;
  // isOnHold: boolean;
  reason: string;
};

export const useWithdrawRust = ({ appId, type }: TArgs) => {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<TResult | null>(null);

  const handleSubmit = async (
    selectedItems: TSteamItem[],
    onSuccess: () => void
  ) => {
    if (submitting) return;

    setSubmitting(true);

    const items = selectedItems.map((item) => item.assetId);

    try {
      const res = await userApi.newTransaction({
        type: type,
        data: {
          items: items,
          appid: appId,
          customAction: 'bot',
        },
      });

      setResult({
        offerId: res.id,
        reason: res.reason,
      });

      onSuccess?.();
    } catch (e: any) {
      let errorMessage: string = e?.data?.msg || e?.msg;

      if (!errorMessage) {
        errorMessage = e.error
          ? e.error.toString()
          : 'Unexpected error happened, please try again';
      }

      if (errorMessage.includes('tradelink')) {
        errorMessage =
          'Please make sure you trade link is set correctly on your profile page!';
      }

      toast.error(errorMessage);
    }

    setSubmitting(false);
  };

  const clearResult = () => {
    setResult(null);
  };

  return {
    handleSubmit,
    submitting,
    result,
    clearResult,
  };
};
