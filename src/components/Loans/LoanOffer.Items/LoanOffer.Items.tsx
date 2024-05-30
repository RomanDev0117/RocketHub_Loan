import { loanActions, selectLoanItems } from "@/store/slices/loan.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUpgraderSelectedItems } from "../../../store/slices/upgrader.slice";
import { LoanVirtualList } from "../Loan.VirtualList/Loan.VirtualList";
import styles from "./LoanOffer.Items.module.scss";

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
          onItemClick={() => {}}
          isOffered={true}
        />
      </div>
    </>
  );
};
