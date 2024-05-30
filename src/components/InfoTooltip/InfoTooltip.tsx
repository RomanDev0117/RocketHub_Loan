import { createPortal } from 'react-dom';
import { TCase } from '../../types/caseTypes';
import styles from './InfoTooltip.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type TProps = {
  popperTooltip: any;
  caseData?: TCase;
};

export const InfoTooltip = ({ popperTooltip }: TProps) => {
  const { visible, getTooltipProps, setTooltipRef } = popperTooltip;
  const [_visible, _setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      _setVisible(true);
    } else {
      const timerId = setTimeout(() => {
        _setVisible(false);
      }, 300);

      return () => {
        clearTimeout(timerId);
      };
    }

  }, [visible]);

  if (!_visible) {
    return null;
  }



  return createPortal(
    <div
      ref={setTooltipRef}
      {...getTooltipProps({ className: 'tooltip-container' })}
      className={clsx(styles.tooltip)}
    >
      <div className={clsx(styles.tooltipContent, {
        [styles.hidden]: !visible
      })}>
        <footer className={styles.footer}>
            Players to player count,  game mode & cases<br/> are unknown and completely random!<br/>
            Select the coin amount to play for and your battle will roll!
        </footer>
      </div>
    </div>,
    document.body
  );
};
