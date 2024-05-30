import { memo, useEffect } from 'react';
import { TCase } from '../../../../types/caseTypes';
import {
  SingleCaseOpenWheel,
} from '@pages/OpenCasePage/SingleCaseOpenWheel/SingleCaseOpenWheel';
import {
  useHorizontalWheel
} from '@pages/OpenCasePage/SingleCaseOpenWheel/useHorizontalWheel';

type TProps = {
  caseData: TCase | null;
  setCaseOpening: (value: boolean) => void;
  setIsRolling: (value: boolean) => void;
  innerRef: {
    current: TWheelRef | null;
  };
};

export type TWheelRef = {
  open: () => Promise<void>;
};

export const CaseDetailsPopupWheel = memo(
  ({ caseData, innerRef, setIsRolling, setCaseOpening }: TProps) => {
    const {
      wheelItems,
      wheelRef,
      isRolling,
      isOpeningCase,
      openCase,
      animationDuration,
      // demoSpin
    } = useHorizontalWheel(caseData, 1);

    if (innerRef) {
      innerRef.current = {
        open: openCase,
        // open: demoSpin, // uncomment for spin testing
      };
    }

    useEffect(() => {
      setIsRolling(isRolling);
    }, [isRolling, setIsRolling]);

    useEffect(() => {
      setCaseOpening(isOpeningCase);
    }, [isOpeningCase, setCaseOpening]);

    return (
      <SingleCaseOpenWheel
        items={wheelItems}
        wheelRef={wheelRef}
        caseType={caseData?.type}
        animationDuration={animationDuration}
        size="small"
      />
    );
  }
);
