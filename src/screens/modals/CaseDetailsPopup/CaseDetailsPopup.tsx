import { useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';
import {
  selectCaseData,
  selectCaseDetailsPopupCssVariablesVersion,
  selectCaseDetailsPopupHideItemRollChance,
  selectCaseDetailsPopupType,
} from '../../../store/slices/caseDetailsPopupSlice';
import { useCaseDetailsPopup } from '../../../hooks/useCaseDetailsPopup';
import { TCase } from '../../../types/caseTypes';
import styles from './CaseDetailsPopup.module.scss';
import { CaseMainDetails } from '../../../components/CaseMainDetails/CaseMainDetails';
import { Titleh4 } from '../../../components/Typography/Typography';
import clsx from 'clsx';
import { Button } from '../../../components/Button/Button';
import {
  CaseDetailsPopupWheel,
  TWheelRef,
} from './CaseDetailsPopup.Wheel/CaseDetailsPopup.Wheel';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UnboxedItemsList } from '../../../components/UnboxedItemsList/UnboxedItemsList';
import { useGetUserRewardsQuery } from '../../../store/slices/rockethubApi/user.endpoints';
import { selectIsLoggedIn } from '@/store/slices/userSlice';
import { useXs } from '@/hooks/useMediaHooks';
import { OpenRewardCaseTimer } from '@/screens/pages/LevelRewardsV2Page/components/OpenCaseButton/OpenCaseButton';
import { levelRewards } from '@/constants';
import { isLevelCase } from '@/utils/app.utils';

export const CaseDetailsPopup = () => {
  const caseDetailsPopup = useCaseDetailsPopup();
  const caseData = useSelector(selectCaseData);
  const type = useSelector(selectCaseDetailsPopupType);
  const cssVariablesVersion = useSelector(
    selectCaseDetailsPopupCssVariablesVersion
  );
  const caseDataRef = useRef(caseData);

  const show = Boolean(caseData);

  const tempCaseData = useMemo(() => {
    // when we close modal -> case data disapears so we want to keep it in ref
    if (!show) {
      return caseDataRef.current;
    }
    return null;
  }, [show]);
  caseDataRef.current = caseData;

  const _caseData = caseData || tempCaseData;

  return (
    <Modal
      show={show}
      onClose={() => caseDetailsPopup.close()}
      className={clsx(styles.modal, {
        [styles.bigModal]: type === 'open',
        v2Variables: cssVariablesVersion === 2,
      })}
      contentClassName={styles.modalContent}
    >
      <ModalBody show={show} caseData={_caseData} type={type} />
    </Modal>
  );
};

const ModalBody = ({
  caseData,
  type,
  show,
}: {
  caseData: TCase | null;
  type: 'open' | 'details';
}) => {
  const isSmall = useXs();
  const wheelRef = useRef<TWheelRef | null>(null);
  const canOpen = type === 'open';
  const hideItemRollChance = useSelector(
    selectCaseDetailsPopupHideItemRollChance
  );

  const [caseOpening, setCaseOpening] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const renderOpenCaseButton = () => {
    if (isLevelCase(caseData)) {
      return (
        <OpenLevelCaseButton
          caseData={caseData}
          onClick={() => {
            void wheelRef.current?.open?.();
          }}
          loading={caseOpening}
          disabled={isRolling}
        />
      );
    }

    return (
      <OpenCaseButton
        caseData={caseData}
        onClick={() => {
          void wheelRef.current?.open?.();
        }}
        loading={caseOpening}
        disabled={isRolling}
      />
    );
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <CaseMainDetails
          caseData={caseData}
          imgSize={canOpen ? 76 : 104}
          gap={canOpen ? 20 : undefined}
        >
          {canOpen && isLevelCase(caseData) && (
            <CaseAmount caseData={caseData} />
          )}
        </CaseMainDetails>

        {canOpen && !isSmall && renderOpenCaseButton()}
      </div>

      {canOpen && (
        <>
          <div className={styles.divider} />

          <CaseDetailsPopupWheel
            caseData={caseData}
            innerRef={wheelRef}
            setCaseOpening={setCaseOpening}
            setIsRolling={setIsRolling}
          />

          {isSmall && renderOpenCaseButton()}

          <Titleh4 className={styles.listTitle}>Items in case</Titleh4>
        </>
      )}

      <UnboxedItemsList
        className={styles.itemsGrid}
        caseItems={caseData?.items || []}
        itemProps={{ size: 's', hideRollChance: hideItemRollChance }}
      />
    </div>
  );
};

const CaseAmount = ({ caseData }: { caseData: TCase | null }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data } = useGetUserRewardsQuery(undefined, { skip: !isLoggedIn });

  return (
    <div className={styles.caseAmount}>
      x{caseData?.rewardType ? data?.userRewards?.[caseData.rewardType] : 0}
    </div>
  );
};

const OpenCaseButton = ({
  caseData,
  loading,
  disabled,
  onClick,
}: {
  caseData: TCase | null;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  // this logic is implemented only for deposit bonus cases. If you want to use it for normal cases update the logic
  // it currently hides the button after first open
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data } = useGetUserRewardsQuery(undefined, { skip: !isLoggedIn });
  const hasDepositBonus = Boolean(
    data?.bonusRewards?.find(
      (r) => r.category === 'bonus' && r.reward_type === caseData?.rewardType
    )
  );

  const _disabeld = !hasDepositBonus || disabled;

  return (
    <Button
      className={styles.openCaseButton}
      pressable
      height={42}
      loading={loading}
      disabled={_disabeld}
      onClick={() => {
        onClick();
      }}
      color={'primary'}
    >
      Open Case
    </Button>
  );
};

const OpenLevelCaseButton = ({
  caseData,
  loading,
  disabled,
  onClick,
}: {
  caseData: TCase | null;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data } = useGetUserRewardsQuery(undefined, { skip: !isLoggedIn });
  const amount = caseData?.rewardType
    ? data?.userRewards?.[caseData.rewardType]
    : 0;
  const _disabled = (caseData?.rewardType && !amount) || disabled;

  const nextClaim = data?.nextClaim ? data.nextClaim * 1000 : 0;
  const now = Date.now();
  const waiting = nextClaim > now;
  const showWaiting = waiting && !_disabled;

  return (
    <Button
      className={styles.openCaseButton}
      pressable
      height={42}
      loading={loading}
      // disabled={_disabled}
      onClick={() => {
        if (waiting) {
          return;
        }

        onClick();
      }}
      color={showWaiting ? 'yellow' : 'primary'}
    >
      {showWaiting ? (
        <>
          Open in <OpenRewardCaseTimer nextClaim={nextClaim} />
        </>
      ) : (
        'Open Case'
      )}
    </Button>
  );
};
