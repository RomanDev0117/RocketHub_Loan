import { useGameItemData } from "@/hooks/useGameItemData";
import clsx from "clsx";
import { useMemo, useState } from "react";
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
import styles from "./LoanOffer.Items.module.scss";
import { TLoanItem } from "@/types/loan.types";
import { loanActions, selectLoanItems } from "@/store/slices/loan.slice";

export const LoanOfferItems = () => {
  const selectedItems = useSelector(selectUpgraderSelectedItems);
  const loanOfferItems = useSelector(selectLoanItems).filter(
    (item) => item.count > 0
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.offerTopBox}>
          <div className={styles.offerTitleBox}>
            <p className={styles.offerTitle}>You Offer</p>
            <div className={styles.offerIcon}>
              <img src="/images/loans/subtract.png" alt="loan logo" />
              <div className={styles.offerCountBox}>
                <p className={styles.offerCountText}>{loanOfferItems.length}</p>
              </div>
            </div>
          </div>
          <div
            className={styles.offerTrashBox}
            onClick={() => dispatch(loanActions.resetItems())}
          >
            <img src="/images/loans/light_trash.png" alt="loan logo" />
          </div>
        </div>
        <LoanVirtualList
          items={loanOfferItems || []}
          isSelected={(item) => selectedItems.includes(item)}
          onItemClick={(item) => {}}
          isOffered={true}
        />
      </div>
    </>
  );
};
