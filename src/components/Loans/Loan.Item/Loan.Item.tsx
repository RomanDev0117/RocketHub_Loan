import clsx from "clsx";
import { useGameItemData } from "../../../hooks/useGameItemData";
import { TSteamItem } from "../../../types/steam.types";
import { TWaxpeerItem } from "../../../types/waxpeer.types";
import { Truncate } from "../../Truncate/Truncate";
import styles from "./Loan.Item.module.scss";
import { GlowIcon } from "../../icons/GlowIcon";
import { PriceWithCoin } from "../../PriceWithCoin/PriceWithCoin";
import { StarsIcon } from "@/components/icons/StarsIcon";
import { loanActions } from "@/store/slices/loan.slice";
import { useDispatch } from "react-redux";

type TProps = {
  item: any;
  selected: boolean;
  onClick?: () => void;
  isOffered?: boolean;
};

export const LoanItem = ({
  onClick,
  selected,
  item,
  isOffered = false,
}: TProps) => {
  const dispatch = useDispatch();

  const offered = item?.count && isOffered ? true : false;

  return (
    <div
      className={clsx(styles.container, {
        [styles.notOffered]: offered ? false : true,
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <div className={styles.itemSellBox}>
        <img src="/images/loans/dark_database.png" alt="loan logo" />
        <p className={styles.itemText}>{item.sellCount}</p>
      </div>
      <img src={item.url} alt="loan logo" className={styles.image} />

      <p className={styles.itemText}>{item.name}</p>
      {!offered && <p className={styles.priceText}>{`$${item.price}`}</p>}
      {(selected || offered) && (
        <div
          className={clsx(styles.countBox, {
            [styles.isOffered]: offered ? true : false,
          })}
        >
          <div
            className={clsx(styles.recBox, {
              [styles.isOffered]: offered ? true : false,
            })}
            onClick={() => {
              dispatch(loanActions.removeItem(item));
            }}
          >
            -
          </div>
          <p
            className={clsx(styles.countText, {
              [styles.isOffered]: offered ? true : false,
            })}
          >
            {item.count}
          </p>
          <div
            className={clsx(styles.recBox, {
              [styles.isOffered]: offered ? true : false,
            })}
            onClick={() => {
              dispatch(loanActions.addItem(item));
            }}
          >
            +
          </div>
        </div>
      )}
      <div
        className={clsx(styles.elipseContainer, {
          [styles.selected]: selected,
          [styles.isOffered]: offered ? true : false,
        })}
      >
        {selected && (
          <GlowIcon
            className={styles.glow}
            style={{ color: "yellow" }}
            lineColor={"transparent"}
          />
        )}
      </div>
    </div>
  );
};
