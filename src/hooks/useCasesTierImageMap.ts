import { useMemo } from 'react';
import { useGetRewardCasesQuery } from '../store/slices/rockethubApi/case.endpoints';
import { getUploadUrl } from '../utils/url.utils';

export const useCasesTierImageMap = () => {
  const { currentData } = useGetRewardCasesQuery();

  return useMemo(() => {
    const cases = currentData?.success ? currentData.data : [];

    return cases.reduce((acc, caseData) => {
      const tier = caseData.rewardType;
      const imgUrl = getUploadUrl(caseData.image);
      if (!tier || !imgUrl) {
        return acc;
      }

      acc[tier] = imgUrl;
      return acc;
    }, {} as Record<string, string>);
  }, [currentData]);
};