import { useDispatch } from 'react-redux';
import { TCase } from '../types/caseTypes';
import { caseDetailsPopupActions } from '../store/slices/caseDetailsPopupSlice';

export const useCaseDetailsPopup = () => {
  const dispatch = useDispatch();

  const open = (
    caseData: TCase,
    {
      type,
      cssVariablesVersion,
      hideItemRollChance,
    }: {
      type?: 'open' | 'details';
      cssVariablesVersion?: 2;
      hideItemRollChance?: boolean;
    } = {}
  ) => {
    dispatch(
      caseDetailsPopupActions.setCaseData({
        caseData,
        type: type || 'details',
        cssVariablesVersion,
        hideItemRollChance,
      })
    );
  };

  const close = () => {
    dispatch(caseDetailsPopupActions.setCaseData(null));
  };

  return {
    open,
    close,
  };
};
