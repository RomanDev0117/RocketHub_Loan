import { isEmpty } from 'lodash';
import { Button } from '../../../../components/Button/Button';
import { PriceWithCoin } from '../../../../components/PriceWithCoin/PriceWithCoin';
import styles from './SteamInventorySidebar.module.scss';
import { getWaxpeerItemPrice } from '../../../../utils/waxpeer.utils';
import { TWaxpeerItem } from '../../../../types/waxpeer.types';
import { CoinIcon } from '../../../../components/icons/CoinIcon';
import { FormattedPrice } from '../../../../components/FormattedPrice/FormattedPrice';
import { T } from '../../../../i18n/translate';
import { SidebarItem } from '../../../../components/SidebarItem/SidebarItem';
import { TSteamItem } from '../../../../types/steam.types';
import { isWaxpeerItem } from '../../../../utils/app.utils';
import { ArrowUpCircleIcon } from '../../../../components/icons/ArrowUpCircleIcon';
import { useState } from 'react';
import clsx from 'clsx';
import { TSkinsBackCsGoItem } from '../../../../types/skinsback.types';

type TProps<T> = {
  items: T[];
  buttonText: React.ReactNode;
  onButtonClick: () => void;
  onClear: () => void;
  onItemDelete: (item: T) => (amount: number) => void;
  loading?: boolean;
  totalItemsCount: number;
};

export const SteamInventorySidebar = <T extends TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem>({
  items,
  buttonText,
  loading,
  totalItemsCount,
  onButtonClick,
  onItemDelete,
  onClear,
}: TProps<T>) => {
  const hasItems = !isEmpty(items);
  const [expanded, setExpanded] = useState(false);

  const totalPrice = items.reduce((acc, item) => {
    const price = isWaxpeerItem(item)
      ? getWaxpeerItemPrice(item) || 0
      : item.price || 0;

    return acc + price;
  }, 0);

  return (
    <div
      className={clsx(styles.container, {
        [styles.expanded]: expanded,
      })}
    >
      <header className={styles.header}>
        Selected ({totalItemsCount})
        <button className={styles.clearButton} onClick={() => onClear()}>
          Clear all
        </button>
        <button
          className={styles.expandCollapseButton}
          onClick={() => setExpanded(!expanded)}
        >
          <ArrowUpCircleIcon />
        </button>
      </header>

      <div className={styles.content}>
        {!hasItems && <div>No items selected</div>}
        {items.map((item, idx) => {
          return (
            <SidebarItem
              key={idx}
              data={item}
              onDelete={() => onItemDelete(item)(0)}
              imageSize={72}
            />
          );
        })}
      </div>

      <footer className={styles.footer}>
        <div className={styles.total}>
          <T id="steamInventory.Total:" defaultMessage="Total:" />
          <div className={styles.totalValue}>
            <CoinIcon shine />
            <FormattedPrice value={totalPrice} />
          </div>
        </div>
        <Button
          loading={loading}
          disabled={!hasItems}
          pressable
          className={styles.doneButton}
          onClick={onButtonClick}
          fullWidth
        >
          {buttonText}
          <PriceWithCoin>{totalPrice}</PriceWithCoin>
        </Button>
      </footer>
    </div>
  );
};
