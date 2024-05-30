import { useDispatch, useSelector } from 'react-redux';
import { useGetWaxpeerItemsQuery } from '../../../store/slices/rockethubApi/waxpeer.endpoints';
import { UpgraderVirtualList } from '../Upgrader.VirtualList/Upgrader.VirtualList';
import {
  selectUpgraderIsRotating,
  selectUpgraderSelectedItems,
  upgraderActions,
} from '../../../store/slices/upgrader.slice';
import styles from './Upgrdaer.Items.module.scss';
import toast from 'react-hot-toast';
import { GAME_TYPE, SORT_BY } from '../../../types/caseTypes';
import { useFilterItems } from '../../../hooks/useFilterItems';
import { UpgraderFilters } from '../Upgrader.Filters/Upgrader.Filters';
import { useGameType } from '../../../hooks/useGameType';
import { getWaxpeerItemPrice, getWaxpeerMinFromPrice } from '../../../utils/waxpeer.utils';
import { useMemo } from 'react';
import { STEAM_APP_ID, UPGRADER_MAX_ITEMS_PRICE, UPGRADER_MIN_ITEMS_PRICE } from '../../../constants';
import { getItemsTotalPrice } from '../upgrader.utils';
import { formatCoins, toFixed } from '../../../utils/number.utils';
import { useGetSteamItemsQuery } from '../../../store/slices/steamItemsSlice';
import { TWaxpeerItem } from '../../../types/waxpeer.types';
import { TSteamItem } from '../../../types/steam.types';
import { isWaxpeerItem } from '../../../utils/app.utils';
import clsx from 'clsx';
import { selectIsLoggedIn } from '../../../store/slices/userSlice';
import { NoDataMessage } from '../../Typography/Typography';
import { useLoginPopup } from '../../../hooks/useLoginPopup';
import Loader from '../../Loader/Loader';
import { DataLoadingError } from '../../DataLoadingError/DataLoadingError';
import { useGameItemData } from '@/hooks/useGameItemData';

type TProps = {
  isModal?: boolean;
};

export const UpgrdaerItems = ({ isModal }: TProps) => {
  const dispatch = useDispatch();
  const loginPopup = useLoginPopup();
  const isRotating = useSelector(selectUpgraderIsRotating);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedItems = useSelector(selectUpgraderSelectedItems);
  const { gameType, setGameType } = useGameType({
    localStorage: false,
    defaultGame: GAME_TYPE.CSGO,
  });

  const {
    data: waxpeerItems,
    isFetching: isWaxpeerFetching,
    error: waxpeerError,
  } = useGetWaxpeerItemsQuery(undefined, { skip: gameType !== GAME_TYPE.CSGO });
  const {
    data: steamItems,
    isFetching: isSteamFetching,
    error: steamError,
  } = useGetSteamItemsQuery(
    {
      appId: STEAM_APP_ID,
      forceNew: false,
      isBot: true,
    },
    {
      skip: !isLoggedIn || gameType !== GAME_TYPE.RUST,
    }
  );

  const formattedItems = useMemo(() => {
    let itemList: (TWaxpeerItem | TSteamItem)[] =
      gameType === GAME_TYPE.RUST
        ? steamItems?.items || []
        : waxpeerItems || [];

    itemList = itemList.map(item => {
      if (isWaxpeerItem(item)) {
        // reverse calculate and update min price so we don't have prices like 0.0042340
        const price = getWaxpeerItemPrice(item);
        return {
          ...item,
          min: getWaxpeerMinFromPrice(toFixed(price, 2)),
        };
      }
      return item;
    });


    return itemList?.filter((item) => {
      const price = isWaxpeerItem(item)
        ? getWaxpeerItemPrice(item)
        : item.price;
      return price <= UPGRADER_MAX_ITEMS_PRICE && price >= UPGRADER_MIN_ITEMS_PRICE;
    });
  }, [gameType, steamItems, waxpeerItems]);

  const {
    items,
    search,
    setSearch,
    sort,
    setSort,
    priceFilter,
    setPriceFilter,
  } = useFilterItems({
    items: formattedItems,
    searchKey: 'name',
    sort: SORT_BY.PRICE_DESC,
    priceFilterEnabled: true,
  });

  const dataLoadnig =
    (gameType === GAME_TYPE.RUST && isSteamFetching) ||
    (gameType === GAME_TYPE.CSGO && isWaxpeerFetching);

    const filteredItems = items.filter(el=>{
      const item = el;
      const { price } = useGameItemData({
        item,
      });
      if (price && price > 1000) return false;
      return true
    })

  return (
    <>
      <UpgraderFilters
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
        gameType={gameType}
        onGameTypeChange={(gameType) => {
          dispatch(upgraderActions.clearItemsSelection());
          setGameType(gameType);
        }}
      />
      <div
        className={clsx(styles.container, {
          [styles.isModal]: isModal,
          [styles.disabled]: isRotating,
        })}
      >
        {!isLoggedIn && gameType === GAME_TYPE.RUST && (
          <div className={styles.center}>
            <NoDataMessage>
              Please{' '}
              <span
                className={styles.loginLink}
                onClick={() => loginPopup.open()}
              >
                log in
              </span>{' '}
              to see items
            </NoDataMessage>
          </div>
        )}
        {/* Loader */}
        {dataLoadnig && <Loader loading />}
        {/* Error */}
        {(waxpeerError || steamError) && !dataLoadnig && (
          <DataLoadingError placement="center">
            Unexpected error happened while fetching items
          </DataLoadingError>
        )}
        <UpgraderVirtualList
          items={filteredItems || []}
          isSelected={(item) => selectedItems.includes(item)}
          onItemClick={(item) => {
            if (!selectedItems.includes(item) && selectedItems.length >= 10) {
              toast.error('You can only select 10 items at a time', {
                id: 'upgrader.maxItems',
              });
              return;
            }

            if (!selectedItems.includes(item)) {
              const newSelectedItems = [...selectedItems, item];
              const totalPrice = getItemsTotalPrice(newSelectedItems);
              if (totalPrice > UPGRADER_MAX_ITEMS_PRICE) {
                toast.error(
                  `You can only select items with total price less than ${formatCoins(
                    UPGRADER_MAX_ITEMS_PRICE
                  )}`,
                  {
                    id: 'upgrader.maxItemsPrice',
                  }
                );
                return;
              }
            }

            dispatch(upgraderActions.selectItem(item));
          }}
        />
      </div>
    </>
  );
};
