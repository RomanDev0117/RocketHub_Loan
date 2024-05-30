import { useMemo, useState } from 'react';
import styles from './SteamInventory.module.scss';
import useTranslation from '../../../../hooks/useTranslation';
import { Flex } from '../../../../components/Flex/Flex';
import { useWalletPopupActions } from '../useWalletPopupActions';
import { useFilterItems } from '../../../../hooks/useFilterItems';
import { CASE_SORT_BY } from '../../../../types/caseTypes';
import Loader from '../../../../components/Loader/Loader';
import { SteamInventorySidebar } from '../SteamInventorySidebar/SteamInventorySidebar';
import { TSteamItem } from '../../../../types/steam.types';
import { T } from '../../../../i18n/translate';
import { groupSteamItems } from '../../../../utils/wallet.utils';
import { TWaxpeerItem } from '../../../../types/waxpeer.types';
import { UboxedItemsVirtualList } from '../../../../components/UboxedItemsVirtualList/UboxedItemsVirtualList';
import { isCsGoItem, isSteamItem } from '../../../../utils/app.utils';
import { TextTitle1 } from '../../../../components/Typography/Typography';
import { isEmpty } from 'lodash';
import { TSkinsBackCsGoItem } from '../../../../types/skinsback.types';
import { SteamInventoryFilter } from '../SteamInventoryFilter/SteamInventoryFilter';

type TProps<T> = {
  itemsList?: T[];
  isFetching?: boolean;
  isSuccess?: boolean;
  error: any;
  type: 'deposit' | 'withdraw';
  onSubmit?: (items: T[], onSuccess: (items?: T[]) => void) => void;
};

export function SteamInventory<
  T extends TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem
>({ itemsList, isFetching, error, type, isSuccess, onSubmit }: TProps<T>) {
  const { t } = useTranslation();
  // const [importantNoticeVisible, setImportantNoticeVisible] = useState(false);
  const [selectedItemsAmount, setSelectedItemsAmount] = useState<
    Record<string, number>
  >({});
  const { resetSelectedPaymentMethod } = useWalletPopupActions();

  const getItemKey = () => {
    if (!itemsList?.[0]) {
      return 'name';
    }

    return isCsGoItem(itemsList[0]) ? 'id' : 'name';
  };

  const selectedItems = useMemo(() => {
    if (!itemsList) return [];
    // get items map where key is item name and value are items
    const itemsMap = itemsList.reduce((acc, item) => {
      const key = item[getItemKey()];
      if (!acc[key]) {
        acc[key] = [];
      }

      if (typeof item.amount !== 'number') {
        acc[key].push(item);
      }
      if (item.amount === 1) {
        acc[key].push(item);
      } else {
        for (let i = 0; i < item.amount; i++) {
          acc[key].push(item);
        }
      }
      return acc;
    }, {} as Record<string, T[]>);

    const sItems: T[] = [];
    Object.entries(selectedItemsAmount).forEach(([key, amount]) => {
      const itemsWithSameName = itemsMap[key];
      for (let i = 0; i < amount; i++) {
        sItems.push(itemsWithSameName[i]);
      }
    });

    return sItems;
  }, [itemsList, selectedItemsAmount]);

  const handleSubmit = () => {
    if (type === 'withdraw') {
      // setImportantNoticeVisible(true);
      withdrawItems();
    } else {
      void onSubmit?.(selectedItems, () => {
        setSelectedItemsAmount({});
      });
    }
  };

  const withdrawItems = () => {
    // setImportantNoticeVisible(false);

    void onSubmit?.(selectedItems, (successItems?: T[]) => {
      if (!successItems) {
        setSelectedItemsAmount({});
      } else {
        // some of items failed so we need to do it one by one
        const newSelectedItemsAmount = { ...selectedItemsAmount };
        successItems.forEach((item) => {
          const key = item[getItemKey()];
          newSelectedItemsAmount[key] = 0;
        });
        setSelectedItemsAmount(newSelectedItemsAmount);
      }
    });
  };

  const groupedItems = useMemo(() => {
    if (!itemsList) return [];
    if (isSteamItem(itemsList[0])) {
      return groupSteamItems(itemsList);
    }
    return itemsList;
  }, [itemsList]);

  const {
    items,
    search,
    setSearch,
    sort,
    setSort,
    priceFilter,
    setPriceFilter,
  } = useFilterItems({
    items: groupedItems,
    searchKey: 'name',
    sort: CASE_SORT_BY.PRICE_DESC,
    priceFilterEnabled: true,
  });

  const isItemSelected = (item: T) => {
    const key = item[getItemKey()];
    return selectedItemsAmount[key] > 0;
  };

  const handleAmountChange = (item: T) => (amount: number) => {
    const key = item[getItemKey()];
    setSelectedItemsAmount({
      ...selectedItemsAmount,
      [key]: amount,
    });
  };

  const sidebarButtonText =
    type === 'deposit' ? (
      <T id="common.Deposit" defaultMessage="Deposit" />
    ) : (
      <T id="common.Withdraw" defaultMessage="Withdraw" />
    );

  const totalItemsCount = Object.values(selectedItemsAmount).reduce(
    (acc, amount) => acc + amount,
    0
  );

  return (
    <Flex container className={styles.container}>
      <div className={styles.contentContainer}>
        <TextTitle1 className={styles.title}>
          {type === 'withdraw' ? 'Withdraw' : 'Deposit'} Items
        </TextTitle1>
        <SteamInventoryFilter
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          onBackClick={() => resetSelectedPaymentMethod()}
        />

        <div className={styles.itemsContainer}>
          <Loader loading={isFetching} position="absolute" />

          {error && (
            <div className={styles.error}>
              {t({ id: 'common.Error', defaultMessage: 'Error' })}:{' '}
              {error?.data?.msg ||
                t({
                  id: 'common.api.error',
                  defaultMessage:
                    'Unexpected error happened while fetching data',
                })}
            </div>
          )}

          {isSuccess && isEmpty(items) && (
            <div className={styles.error}>
              You have no available items to {type}
            </div>
          )}

          <UboxedItemsVirtualList
            className={styles.itemsVirtualGrid}
            items={items}
            isSelected={(item) => isItemSelected(item)}
            getItemProps={(item) => {
              if (isCsGoItem(item)) {
                return {
                  onClick: () => {
                    isItemSelected(item)
                      ? handleAmountChange(item)(0)
                      : handleAmountChange(item)(1);
                  },
                };
              }

              const key = item[getItemKey()];
              const locked =
                type === 'deposit' && !item.available
                  ? 'Not Accepted'
                  : undefined;

              return {
                amount: item.amount,
                selectedAmount: selectedItemsAmount[key] || 0,
                onAmountChange: handleAmountChange(item),
                locked,
              };
            }}
          />
        </div>
      </div>
      <SteamInventorySidebar
        items={selectedItems}
        buttonText={sidebarButtonText}
        onButtonClick={handleSubmit}
        loading={false}
        onItemDelete={handleAmountChange}
        onClear={() => setSelectedItemsAmount({})}
        totalItemsCount={totalItemsCount}
      />

      {/* {type === 'withdraw' && importantNoticeVisible && (
        <WithdrawImportantNotice
          onConfirm={withdrawItems}
          onClose={() => setImportantNoticeVisible(false)}
        />
      )} */}
    </Flex>
  );
}
