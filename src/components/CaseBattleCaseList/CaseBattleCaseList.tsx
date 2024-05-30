import { useCaseDetailsPopup } from '../../hooks/useCaseDetailsPopup';
import { TCase } from '../../types/caseTypes';
import { CaseImage } from '../CaseImage/CaseImage';
import styles from './CaseBattleCaseList.module.scss';
import { useCurrentRoundCaseVisible } from './useCurrentRoundCaseVisible';
import { useRef } from 'react';
import { useIntersection } from 'react-use';
import { RollArrowIconV2 } from '../icons/RollArrowIconV2';

type TProps = {
  cases: TCase[];
  currentRound: number;
  battleInProgress: boolean;
  finished: boolean;
};

export const CaseBattleCaseList = ({
  cases,
  battleInProgress,
  currentRound,
  finished,
}: TProps) => {
  const outerRootRef = useRef(null);
  const itemWidth = 86;
  const gap = 4;


  const { rootTranslateX, rootRef } = useCurrentRoundCaseVisible({
    currentRound,
    battleInProgress,
    finished,
    itemWidth,
    gap,
  });


  let translateX = (currentRound - 1) * itemWidth;
  if (currentRound > 1) {
    translateX += gap * (currentRound - 1);
  }

  return (
    <div>
      {battleInProgress && translateX >= 0 && (
        <div
          className={styles.arrowsContainer}
          style={{
            transform: `translateX(${rootTranslateX}px)`,
          }}
        >
          <div
            className={styles.arrows}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            <RollArrowIconV2 className={styles.arrowDown} />
          </div>
        </div>
      )}
      <div className={styles.outer} ref={outerRootRef}>
        <div
          className={styles.root}
          style={{ transform: `translateX(${rootTranslateX}px)` }}
          ref={rootRef}
        >
          {cases.map((item, idx) => {
            return <Item key={idx} caseData={item} containerRef={outerRootRef} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Item = ({ caseData, containerRef }: { caseData: TCase, containerRef: any }) => {
  const caseDetailsPopup = useCaseDetailsPopup();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: containerRef.current,
    rootMargin: '0px',
    threshold: 1,
  });

  const isFullyVisible = intersection?.intersectionRatio === 1;

  const handleRightClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    caseDetailsPopup.open(caseData);
    return false;
  };

  return (
    <div
      ref={intersectionRef}
      className={styles.imgContainer}
      onContextMenu={handleRightClick}
      data-is-visible={isFullyVisible}
    >
      <CaseImage
        className={styles.caseImg}
        src={caseData.image}
        alt={`Case #${caseData.title}`}
        caseData={caseData}
      />
    </div>
  );
};
