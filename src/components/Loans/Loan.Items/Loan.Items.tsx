import { useGameItemData } from "@/hooks/useGameItemData";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  STEAM_APP_ID,
  UPGRADER_MAX_ITEMS_PRICE,
  UPGRADER_MIN_ITEMS_PRICE,
} from "../../../constants";
import { useFilterItems } from "../../../hooks/useFilterItems";
import { useGameType } from "../../../hooks/useGameType";
import { useLoginPopup } from "../../../hooks/useLoginPopup";
import { useGetWaxpeerItemsQuery } from "../../../store/slices/rockethubApi/waxpeer.endpoints";
import { useGetSteamItemsQuery } from "../../../store/slices/steamItemsSlice";
import {
  selectUpgraderIsRotating,
  selectUpgraderSelectedItems,
  upgraderActions,
} from "../../../store/slices/upgrader.slice";
import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { GAME_TYPE, SORT_BY } from "../../../types/caseTypes";
import { TSteamItem } from "../../../types/steam.types";
import { TWaxpeerItem } from "../../../types/waxpeer.types";
import { isWaxpeerItem } from "../../../utils/app.utils";
import { toFixed } from "../../../utils/number.utils";
import {
  getWaxpeerItemPrice,
  getWaxpeerMinFromPrice,
} from "../../../utils/waxpeer.utils";
import { DataLoadingError } from "../../DataLoadingError/DataLoadingError";
import Loader from "../../Loader/Loader";
import { NoDataMessage } from "../../Typography/Typography";
import { LoanFilters } from "../Loan.Filters/Loan.Filters";
import { LoanVirtualList } from "../Loan.VirtualList/Loan.VirtualList";
import styles from "./Loan.Items.module.scss";
import {
  loanActions,
  selectLoanItems,
  selectLoanSelectedItem,
} from "@/store/slices/loan.slice";
import { TLoanItem } from "@/types/loan.types";

export const LoanItems = () => {
  const dispatch = useDispatch();
  const loginPopup = useLoginPopup();
  const isRotating = useSelector(selectUpgraderIsRotating);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedItem = useSelector(selectLoanSelectedItem);
  const loanItems = useSelector(selectLoanItems);
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

    itemList = itemList.map((item) => {
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
      return (
        price <= UPGRADER_MAX_ITEMS_PRICE && price >= UPGRADER_MIN_ITEMS_PRICE
      );
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
    searchKey: "name",
    sort: SORT_BY.PRICE_DESC,
    priceFilterEnabled: true,
  });

  const [filteredItems, setFilteredItems] = useState<TLoanItem[]>([
    {
      id: 0,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_0.png",
    },
    {
      id: 1,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_1.png",
    },
    {
      id: 2,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_2.png",
    },
    {
      id: 3,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_3.png",
    },
    {
      id: 4,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_3.png",
    },
    {
      id: 5,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_1.png",
    },
    {
      id: 6,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_0.png",
    },
    {
      id: 7,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_3.png",
    },
    {
      id: 8,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_2.png",
    },
    {
      id: 9,
      sellCount: 2,
      name: "Mystic AK47",
      count: 0,
      price: 2.49,
      url: "/images/loans/gun_4.png",
    },
  ]);

  useEffect(() => {
    dispatch(loanActions.setItems(filteredItems));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <LoanFilters
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          gameType={gameType}
          onGameTypeChange={(gameType) => {
            setGameType(gameType);
          }}
        />
        <LoanVirtualList
          items={loanItems || []}
          isSelected={(item) => selectedItem?.id === item.id}
          onItemClick={(item) => {
            dispatch(loanActions.selectItem(item));
          }}
        />
      </div>
    </>
  );
};
