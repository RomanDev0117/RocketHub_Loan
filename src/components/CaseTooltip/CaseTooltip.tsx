import { createPortal } from 'react-dom';
import { TCase } from '../../types/caseTypes';
import { T } from '../../i18n/translate';
import { InfoCircleIcon } from '../icons/InfoCircleIcon';
import styles from './CaseTooltip.module.scss';
import { PriceWithCoin } from '../PriceWithCoin/PriceWithCoin';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type TProps = {
  popperTooltip: any;
  caseData?: TCase;
};

export const CaseTooltip = ({ popperTooltip, caseData }: TProps) => {
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
        <div className={styles.content}>
          <div className={styles.title}>{caseData?.title}</div>
          <PriceWithCoin className={styles.button}>{caseData?.price}</PriceWithCoin>
        </div>
        <footer className={styles.footer}>
          <InfoCircleIcon />
          <T
            id="caseTooltip.RightClickForInfo"
            defaultMessage="Right-click for info"
          />
        </footer>
      </div>
    </div>,
    document.body
  );
};
