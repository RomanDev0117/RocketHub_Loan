import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMountedState } from 'react-use';
import { selectChatOpen, selectSidebarExpanded } from '../../store/slices/appSlice';

type TArgs = {
  currentRound: number;
  battleInProgress: boolean;
  itemWidth?: number;
  gap?: number;
  finished?: boolean;
  stickyCurrentItemPosition?: number;
};

export const useCurrentRoundCaseVisible = ({
  currentRound,
  battleInProgress,
  itemWidth = 54,
  gap = 4,
  finished,
  stickyCurrentItemPosition,
}: TArgs) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootTranslateX, setRootTranslateX] = useState(0);
  const isMounted = useMountedState();
  const isSidebarExpanded = useSelector(selectSidebarExpanded);
  const isChatOpen = useSelector(selectChatOpen);

  // uncomment for debuggin
  // const [_currentRound, setCurrentRound] = useState(0);
  // currentRound = _currentRound;
  // finished = false;
  // battleInProgress = true;

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrentRound(v => v + 1);
  //   }, 1000);
  // }, []);


  const calculatePosition = () => {
    // calculate root translate x

    const rootEl = rootRef.current;
    if (!rootEl) return;
    if (!isMounted()) return;
    if (!battleInProgress) return;

    const itemAndGap = itemWidth + gap;
    const caseElements = rootEl.querySelectorAll('[data-is-visible]');


    // sticky logic
    if (stickyCurrentItemPosition) {
      if (currentRound > stickyCurrentItemPosition) {
        const lastItem = (caseElements[caseElements.length - 1] as HTMLElement);
        if (lastItem?.dataset.isVisible === 'true') {
          return;
        }

        const translate = (currentRound - stickyCurrentItemPosition) * itemAndGap;

        setRootTranslateX(-1 * translate);
      }
      return;
    }
    // end of sticky logic

    const currnetCase = caseElements.item(currentRound - 1);

    if (!currnetCase) return;

    const isVisible = (currnetCase as HTMLElement).dataset.isVisible === 'true';

    if (!isVisible) {

      // caclulate visible items
      let visibleCount = 0;
      caseElements.forEach((el, idx) => {
        if (idx >= currentRound - 1) {
          return;
        }

        if ((el as HTMLElement).dataset.isVisible === 'true') {
          visibleCount += 1;
        }
      });

      let translateX = (currentRound - 1) * itemWidth;
      if (currentRound > 1) {
        translateX += gap * (currentRound - 1);
      }

      translateX -=
        itemAndGap * (visibleCount > 0 ? visibleCount - 1 : visibleCount);
      setRootTranslateX(-1 * translateX);

    }

  };

  useEffect(() => {
    calculatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound]);

  // calculate on resize
  const calculatePositionRef = useRef(calculatePosition);
  calculatePositionRef.current = calculatePosition;
  useEffect(() => {
    if (finished) {
      return;
    }

    const func = throttle(() => {
      calculatePositionRef.current();
    }, 80);

    window.addEventListener('resize', func);
    return () => {
      window.removeEventListener('resize', func);
    };
  }, [finished]);

  // calculate when sidebar/chat open close
  useEffect(() => {
    if (finished) {
      return;
    }

    const timerId = setTimeout(() => {
      calculatePosition();
    }, 350);
    return () => {
      clearTimeout(timerId);
    };
  }, [isSidebarExpanded, isChatOpen]);

  useEffect(() => {
    if (!battleInProgress) {
      setRootTranslateX(0);
    }
  }, [battleInProgress]);

  return {
    rootRef,
    rootTranslateX,
  };
};
