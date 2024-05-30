import { useFetchFilterItems } from '@/hooks/useFetchFilterItems';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Flex } from '../../../../components/Flex/Flex';
import Loader from '../../../../components/Loader/Loader';
import { TextTitle1 } from '../../../../components/Typography/Typography';
import { UboxedItemsVirtualList } from '../../../../components/UboxedItemsVirtualList/UboxedItemsVirtualList';
import useTranslation from '../../../../hooks/useTranslation';
import { T } from '../../../../i18n/translate';
import { TSkinsBackCsGoItem } from '../../../../types/skinsback.types';
import { TSteamItem } from '../../../../types/steam.types';
import { TWaxpeerItem } from '../../../../types/waxpeer.types';
import { isCsGoItem } from '../../../../utils/app.utils';
import { SteamInventoryFilter } from '../SteamInventoryFilter/SteamInventoryFilter';
import { SteamInventorySidebar } from '../SteamInventorySidebar/SteamInventorySidebar';
import { useWalletPopupActions } from '../useWalletPopupActions';
import styles from './SteamInventory.module.scss';

type TProps = {
  isSuccess?: boolean;
  error: any;
  type: 'deposit' | 'withdraw';
  onSubmit?: (items: TSkinsBackCsGoItem[], onSuccess: (items?: TSkinsBackCsGoItem[]) => void) => void;
};

export function SteamPaginationInventory({ error, type, isSuccess, onSubmit }: TProps) {
  const { t } = useTranslation();
  const [selectedItemsAmount, setSelectedItemsAmount] = useState<
    Record<string, number>
  >({});

  const [selectedItems, setSelectedItems] = useState<TSkinsBackCsGoItem[]>([]);

  const { resetSelectedPaymentMethod } = useWalletPopupActions();

  const {
    items,
    isLoading,
    fetchError,
    search,
    setSearch,
    sort,
    setSort,
    setPage,
    priceFilter,
    setPriceFilter,
  } = useFetchFilterItems();

  useEffect(() => {
    if(!items) return ;
    const itemsMap = items.reduce((acc, item) => {
      const key = item.id;
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
    }, {} as Record<string, TSkinsBackCsGoItem[]>);
    setSelectedItems(prev => {
      const sItems: TSkinsBackCsGoItem[] = [];
      Object.entries(selectedItemsAmount).forEach(([key, amount]) => {
        const itemsWithSameName = itemsMap[key];
        if (itemsWithSameName)
          for (let i = 0; i < amount; i++) {
            sItems.push(itemsWithSameName[i]);
          }
        else {
          const existItem = prev.find(el => el.id == key);
          if (existItem)
            for (let i = 0; i < amount; i++) {
              sItems.push(existItem);
            }
        }
      });
      return [...sItems];
    })

  }, [items, selectedItemsAmount])

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

    void onSubmit?.(selectedItems, (successItems?: TSkinsBackCsGoItem[]) => {
      if (!successItems) {
        setSelectedItemsAmount({});
      } else {
        // some of items failed so we need to do it one by one
        const newSelectedItemsAmount = { ...selectedItemsAmount };
        successItems.forEach((item) => {
          const key = item.id;
          newSelectedItemsAmount[key] = 0;
        });
        setSelectedItemsAmount(newSelectedItemsAmount);
      }
    });
  };

  const isItemSelected = (item: TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem) => {
    const key = item.id;
    return selectedItemsAmount[key] > 0;
  };

  const handleAmountChange = (item: TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem) => (amount: number) => {
    const key = item.id;
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
          onSortChange={(sort) => {
            setPage(1);
            setSort(sort);
          }}
          priceFilter={priceFilter}
          onPriceFilterChange={(priceFilter) => {
            setPage(1);
            setPriceFilter({ ...priceFilter })
          }}
          onBackClick={() => resetSelectedPaymentMethod()}
        />

        <div className={styles.itemsContainer}>
          <Loader loading={isLoading} position="absolute" />

          {fetchError && (
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
            scrollEnded={() => setPage(prev => prev + 1)}
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
              return {}
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
