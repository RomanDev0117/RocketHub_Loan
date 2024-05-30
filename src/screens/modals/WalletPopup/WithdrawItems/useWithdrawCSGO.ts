import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserTradeLink } from '../../../../store/slices/userSlice';
import { toast } from 'react-hot-toast';
import { TSkinsBackCsGoItem } from '../../../../types/skinsback.types';
import { useBuySkinsbackItemMutation } from '../../../../store/slices/rockethubApi/skinsBack.endpoints';
import { captureException } from '@sentry/react';

export const useWithdrawCSGO = () => {
  const [submitting, setSubmitting] = useState(false);
  const tradeLink = useSelector(selectUserTradeLink);
  const [buySkinsbackItemApi] = useBuySkinsbackItemMutation();

  const showErrorMessage = (item: TSkinsBackCsGoItem, error: any) => {
    const message: string = typeof error === 'string'
      ? error
      : error?.data?.msg || error?.msg || 'Unknown error';
    toast.error(`Error buying item "${item.name}": ${message}`);
  };

  const handleSubmit = async (
    selectedItems: TSkinsBackCsGoItem[],
    onSuccess: (successItems: TSkinsBackCsGoItem[]) => void
  ) => {
    if (submitting) return;

    if (!tradeLink) {
      toast.error(
        'Please make sure you trade link is set correctly on your profile page!'
      );
      return;
    }

    setSubmitting(true);

    const itemIds = selectedItems.map((item) => item.id);

    try {
      const result = await buySkinsbackItemApi(itemIds)
        .unwrap();

      // show success messages
      result?.boughtItems.forEach((item) => {
        toast.success(`"${item.name}" was bought successfully`);
      });

      // show errors
      const successIds = result?.boughtItems.map((item) => item.id);
      selectedItems.forEach((item) => {
        if (successIds.includes(item.id)) {
          return;
        }
        showErrorMessage(item, ' ');
      });

      onSuccess?.(result?.boughtItems || []);
    } catch (error: any) {
      const message: string = typeof error === 'string'
        ? error
        : error?.data?.msg || error?.msg || 'Unknown error';

      toast.error(`Error buying items: ${message}`);
      captureException(error);
    }

    setSubmitting(false);
  };

  return {
    handleSubmit,
    submitting,
  };
};
