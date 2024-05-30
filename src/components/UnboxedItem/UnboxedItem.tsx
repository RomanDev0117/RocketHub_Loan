import clsx from 'clsx';
import { TCaseItem, TPlayerUnboxedItemDetails } from '../../types/caseTypes';
import { Truncate } from '../Truncate/Truncate';
import { Gradient } from './Gradient';
import { TSteamItem } from '../../types/steam.types';
import { AmountSelector } from './AmountSelector';
import styles from './UnboxedItem.module.scss';
import { PriceWithCoin } from '../PriceWithCoin/PriceWithCoin';
import { isCsGoItem } from '../../utils/app.utils';
import { Checkbox } from '../Form/Checkbox';
import { TWaxpeerItem } from '../../types/waxpeer.types';
import { useGameItemData } from '../../hooks/useGameItemData';
import { TSkinsBackCsGoItem } from '../../types/skinsback.types';
import { TAdminCaseItem } from '../../types/admin.types';
import { StarsIcon } from '../icons/StarsIcon';
import { LockIcon } from '../icons/LockIcon';

export type TUnboxedItemProps = {
  item:
  | TPlayerUnboxedItemDetails
  | TCaseItem
  | TSteamItem
  | TWaxpeerItem
  | TSkinsBackCsGoItem
  | TAdminCaseItem;
  rolledRound?: number;
  animateAppearance?: boolean;
  className?: string;
  imageContainerClassName?: string;
  priceClassName?: string;
  selected?: boolean;
  selectedStyle?: 'default' | 'checkbox';
  amount?: number;
  selectedAmount?: number;
  size?: 's' | 'm';
  locked?: string | boolean; // if locked we show lock on an item and item is not clickable or selectable
  hideRollChance?: boolean;
  onAmountChange?: (amount: number) => void;
  onClick?: () => void;
};

export const UnboxedItem = ({
  item,
  rolledRound,
  animateAppearance,
  className,
  imageContainerClassName,
  priceClassName,
  selected,
  onClick,
  amount,
  selectedStyle = 'default',
  selectedAmount,
  size = 'm',
  locked,
  hideRollChance,
  onAmountChange,
}: TUnboxedItemProps) => {
  const { isSteam, imageUrl, color, price, exterior, type, itemName } =
    useGameItemData({
      item,
    });

  return (
    <div
      className={clsx(styles.item, className, styles[`${size}Size`], {
        [styles.selected]: selectedStyle === 'default' && selected,
        [styles.checkboxSelected]: selectedStyle === 'checkbox' && selected,
        [styles.animateAppearance]: animateAppearance,
        [styles.contentLeft]: isSteam || isCsGoItem(item),
        [styles.clickable]: isSteam || isCsGoItem(item),
      })}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--itemColor': color,
      }}
      onClick={() => {
        onClick?.();

        if (amount) {
          let newAmount = (selectedAmount || 0) + 1;
          newAmount = newAmount > amount ? amount : newAmount;
          onAmountChange?.(newAmount);
        }
      }}
    >
      <div className={styles.rolledRound}>
        {rolledRound && `#${rolledRound}`}
        {!rolledRound && 'percentage' in item && !hideRollChance && `${item.percentage}%`}
        {typeof selectedAmount === 'number' && `${selectedAmount}/`}
        {amount || null}
      </div>

      {selectedStyle === 'checkbox' && selected && (
        <Checkbox
          className={styles.checkbox}
          checked
          size="xlarge"
          style="shiny"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={() => onAmountChange?.(0)}
        />
      )}

      {exterior && <div className={styles.exterior}>{exterior}</div>}
      <div className={clsx(styles.imageContainer, imageContainerClassName)}>
        <img src={imageUrl} alt={itemName} />
      </div>

      <Gradient className={styles.elipse} style={{ color }} />
      <StarsIcon className={styles.stars} />

      <footer className={styles.footer}>
        <div className={styles.line} style={{ color }} />
        <div className={styles.nameContainer}>
          {type && <div className={styles.itemType}>{type}</div>}
          <div className={styles.name}>
            <Truncate>{itemName}</Truncate>
            {/* <span className={styles.fade}>• Fade</span> */}
          </div>
        </div>
        <PriceWithCoin gap={6} className={clsx(styles.price, priceClassName)}>
          {price}
        </PriceWithCoin>

        {typeof selectedAmount === 'number' && (
          <AmountSelector
            className={styles.amountSelector}
            max={amount}
            selectedAmount={selectedAmount}
            onChange={onAmountChange!}
          />
        )}
      </footer>

      {locked && (
        <div
          className={styles.locked}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <LockIcon />
          {locked}
        </div>
      )}
    </div>
  );
};
