import clsx from 'clsx';
import { TCase } from '../../types/caseTypes';
import { getOpenCasePath, getUploadUrl } from '../../utils/url.utils';
import { Truncate } from '../Truncate/Truncate';
import styles from './CaseListItem.module.scss';
import { Link } from 'react-router-dom';
import { CoinIcon } from '../icons/CoinIcon';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { Button } from '../Button/Button';
import { PlusCircleIcon } from '../icons/PlusCircleIcon';
import { T } from '../../i18n/translate';
import { SearchIcon } from '../icons/SearchIcon';
import { MouseEvent } from 'react';
import { useCaseDetailsPopup } from '../../hooks/useCaseDetailsPopup';
import { CloseIcon } from '../NotificationsController/components/CloseIcon';

export type TCaseListItemProps = {
  caseData: TCase;
  noShadow?: boolean;
  amount?: number;
  asLink?: boolean;
  priceColor?: string;
  userLevel?: number;
  viewItems?: boolean;
  placeholderImage?: string;
  onClick?: () => void;
  onClear?: () => void;
  onAmountChange?: (caseData: TCase, amount: number) => void;
  getLink?: (caseData: TCase) => string;
};

const defaultGetLink = (caseData: TCase) => {
  return getOpenCasePath(caseData.id);
};

export const CaseListItem = ({
  caseData,
  noShadow,
  amount = 0,
  asLink,
  priceColor,
  userLevel,
  placeholderImage,
  viewItems,
  onClear,
  onAmountChange,
  onClick,
  getLink = defaultGetLink,
}: TCaseListItemProps) => {
  const src = caseData.image ? getUploadUrl(caseData.image) : '';
  const popupInfo = useCaseDetailsPopup();

  const onAdd = () => {
    onAmountChange?.(caseData, amount + 1);
  };

  const onSubstract = () => {
    const nextAmount = amount - 1 < 0 ? 0 : amount - 1;
    onAmountChange?.(caseData, nextAmount);
  };

  const onViewItems = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    popupInfo.open(caseData);
  };

  const Component = asLink ? Link : 'div';
  const rootProps = asLink ? { to: getLink(caseData) } : ({} as any);
  const isLevelCase = Boolean(caseData.level);
  const canOpenCase = isLevelCase ? (userLevel || 0) >= caseData.level! : true;
  const imageSrc = src || placeholderImage;

  return (
    <Component
      {...rootProps}
      className={clsx(styles.root, {
        [styles.noShadow]: noShadow,
        [styles.hasAmountSwitcher]: Boolean(onAmountChange),
      })}
      onClick={onClick}
    >
      <div className={styles.imageContainer}>
        {imageSrc && <img src={imageSrc} className={styles.thumbnail} />}
        {viewItems && (
          <div className={styles.viewItems} onClick={onViewItems}>
            <SearchIcon />
            View Items
          </div>
        )}
      </div>

      {onClear && amount > 0 && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => onClear()}
        >
          <CloseIcon />
        </button>
      )}

      <h4 className={styles.title}>
        <Truncate>{caseData.title}</Truncate>
      </h4>

      {!isLevelCase && (
        <div className={styles.price}>
          <CoinIcon shine />
          <FormattedPrice
            style={{ color: priceColor }}
            value={caseData.price || 0}
          />
        </div>
      )}

      {isLevelCase && (
        <Button pressable disabled={!canOpenCase}>
          {canOpenCase ? (
            <T id="common.OpenCase" defaultMessage="Open case" />
          ) : (
            <T id="case.caseLocked" defaultMessage="Locked" />
          )}
        </Button>
      )}

      {onAmountChange && (
        <>
          {!amount && (
            <Button
              prepend={<PlusCircleIcon width={18} height={18} />}
              className={styles.addButton}
              onClick={onAdd}
              size="s"
              pressable
              fullWidth
            >
              Add
            </Button>
          )}
          {amount > 0 && (
            <div className={styles.amountPicker}>
              <button
                className={styles.amountPickerButton}
                type="button"
                onClick={onSubstract}
              >
                -
              </button>
              {amount}
              <button
                className={styles.amountPickerButton}
                type="button"
                onClick={onAdd}
              >
                +
              </button>
            </div>
          )}
        </>
      )}
    </Component>
  );
};
