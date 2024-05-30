import { LoanItems } from "@/components/Loans/Loan.Items/Loan.Items";
import { LoanOfferItems } from "@/components/Loans/LoanOffer.Items/LoanOffer.Items";
import { getAppState } from "@/store";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserName,
} from "../../../store/slices/userSlice";
import styles from "./HomePage.module.scss";
import { selectLoanItems } from "@/store/slices/loan.slice";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";

export const HomePage = () => {
  const userName = useSelector(selectUserName);
  const { t } = useTranslation();

  const state = getAppState();
  const isLoggedIn = selectIsLoggedIn(state);
  const [tradeLink, setTradeLink] = useState(
    "https://bitskick.com/tradeoffer/new?partner=35RTFH6vwfew££"
  );

  const days = [7, 14, 30];
  const methods = [
    { name: "Card", url: "/images/loans/credit.png" },
    { name: "CashApp", url: "/images/loans/cash.png" },
    { name: "PayPal", url: "/images/loans/paypal.png" },
    { name: "Bank Transfer", url: "/images/loans/bank.png" },
    { name: "Venmo", url: "/images/loans/venmo.png" },
    { name: "BTC", url: "/images/loans/btc.png" },
    { name: "Revolut", url: "/images/loans/revolut.png" },
    { name: "ETH", url: "/images/loans/eth.png" },
    { name: "LTC", url: "/images/loans/ltc.png" },
    { name: "TRX", url: "/images/loans/trx.png" },
    { name: "USDT", url: "/images/loans/usdt.png" },
  ];

  const amountFooters = [
    { name: "Safe & Secure", url: "/images/loans/secure.png" },
    { name: "Instant payments", url: "/images/loans/discount.png" },
    { name: "Best prices", url: "/images/loans/dollar_coin.png" },
  ];

  const steps = [
    "Deposit your skins",
    "Borrow against skins for USD",
    "Pay back within 7 days",
  ];

  const loanItems = useSelector(selectLoanItems);
  const loanOfferItems = loanItems.filter((item) => item.count > 0);

  const [dayIndex, setDayIndex] = useState(1);
  const [methodIndex, setMethodIndex] = useState(1);

  const totalAmount = loanItems.reduce((acc, item) => {
    acc += item.count * item.price;
    return acc;
  }, 0);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(tradeLink)
      .then(() => {
        const message = t({
          id: "common.CopiedToClipboard",
          defaultMessage: "Copied to clipboard!",
        });

        toast.success(message);
      })
      .catch((error) => {
        console.error("Failed to copy the trade link: ", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bannerBox}>
        <p className={styles.bannerTitle}>
          Don't lose your SKINS & get cash INSTANTLY <span>0% FEES</span>
        </p>
        <p className={styles.bannerDescription}>
          Get paid in Paypal, Crypto, Bank, CashApp & other methods
        </p>
        <div className={styles.row64}>
          {steps.map((step, index) => (
            <div className={styles.stepBox} key={index}>
              <img src="/images/loans/star.png" alt="copy link" />
              <p className={styles.stepNumber}>{`0${index + 1}`}</p>
              <p className={styles.stepDescription}>{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tradeBox}>
        <div className={styles.rowBetweenContainer}>
          <p className={styles.linkTitle}>You trade link</p>
          <p className={styles.linkDescription}>
            You can find it <a>here</a>
          </p>
        </div>
        <div className={styles.linkBox}>
          <div className={styles.linkBoxContainer}>
            <img
              src="/images/loans/copy_link.png"
              alt="copy link"
              onClick={handleCopyLink}
            />
            <input
              value={tradeLink}
              className={styles.linkText}
              onChange={(e) => setTradeLink(e.target.value)}
            />
          </div>
          <div className={styles.rowContainer} onClick={() => setTradeLink("")}>
            <img src="/images/loans/trash.png" alt="loan logo" />
            <img src="/images/loans/red_close.png" alt="loan logo" />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.offerBox}>
            <LoanOfferItems />
          </div>
          <div className={styles.itemsBox}>
            <LoanItems />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.amountTitleBox}>
            <img src="/images/loans/gold_left.png" alt="loan logo" />
            <p className={styles.amountTitle}>Loan amount</p>
            <img src="/images/loans/gold_right.png" alt="loan logo" />
          </div>
          <div className={styles.amountBox}>
            <div className={styles.column5}>
              <p className={styles.amountLabel}>Loan amount</p>
              <p className={styles.amountValue}>{`$ ${totalAmount.toFixed(
                2
              )}`}</p>
            </div>
            <div className={styles.row50}>
              <div className={styles.amountDivider}></div>
              <div className={styles.offerIcon}>
                <img src="/images/loans/subtract.png" alt="loan logo" />
                <div className={styles.offerCountBox}>
                  <p className={styles.offerCountText}>
                    {loanOfferItems.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.amountDayBox}>
            <div className={styles.row6}>
              <p className={styles.amountDay}>{days[dayIndex]}</p>
              <p className={styles.amountDayLabel}>days</p>
            </div>
            <div className={styles.row0}>
              {days.map((item, index) => (
                <div
                  key={index}
                  className={clsx(styles.dayBox, {
                    [styles.selected]: index == dayIndex,
                  })}
                  onClick={() => setDayIndex(index)}
                >
                  <p
                    className={clsx(styles.dayText, {
                      [styles.selected]: index == dayIndex,
                    })}
                  >
                    {`${item} D`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.amountMethodTitle}>Select payment method</p>
          <div className={styles.amountMethodBox}>
            {methods.map((method, index) => (
              <div
                key={index}
                className={clsx(styles.methodItemBox, {
                  [styles.selected]: index == methodIndex,
                })}
                onClick={() => setMethodIndex(index)}
              >
                <img src={method.url} alt="loan logo" />
                <p className={styles.methodText}>{method.name}</p>
                {index === methodIndex && (
                  <img
                    src="/images/loans/yellow_check.png"
                    alt="loan logo"
                    className={styles.methodCheck}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.amountTotalBox}>
            <div className={styles.paramBox}>
              <p className={styles.paramLabel}>Amount to borrow:</p>
              <p className={styles.paramValue}>{`$ ${totalAmount.toFixed(
                2
              )}`}</p>
            </div>
            <img
              src="/images/loans/dot_border.png"
              alt="loan logo"
              className={styles.dotBorder}
            />
            <div className={styles.paramBox}>
              <p className={styles.paramLabel}>Loan term:</p>
              <p className={styles.paramValue}>{`${days[dayIndex]} days`}</p>
            </div>
            <img
              src="/images/loans/dot_border.png"
              alt="loan logo"
              className={styles.dotBorder}
            />
            <div className={styles.paramBox}>
              <p className={styles.paramLabel}>Payment method:</p>
              <p className={styles.paramValue}>{methods[methodIndex].name}</p>
            </div>
            <img
              src="/images/loans/dot_border.png"
              alt="loan logo"
              className={styles.dotBorder}
            />
            <div className={styles.paramBox}>
              <p className={styles.paramLabel}>Payback amount:</p>
              <p className={styles.paramValue}>$ 3.99</p>
            </div>
            <img
              src="/images/loans/dot_border.png"
              alt="loan logo"
              className={styles.dotBorder}
            />
            <div className={styles.paramBox}>
              <p className={styles.paramLabel}>Payback until:</p>
              <p className={styles.paramValue}>22.08.2024</p>
            </div>
            <img
              src="/images/loans/dot_border.png"
              alt="loan logo"
              className={styles.dotBorder}
            />
            <div className={styles.amountTotal}>
              <p className={styles.totalLabel}>TOTAL AMOUNT</p>
              <p className={styles.totalValue}>{`$ ${totalAmount.toFixed(
                2
              )}`}</p>
            </div>
          </div>
          <div className={styles.cashButton}>
            <p className={styles.cashText}>GET CASH</p>
          </div>
          <div className={styles.amountFooterBox}>
            {amountFooters.map((item, index) => (
              <div className={styles.row16} key={index}>
                <div className={styles.footerIconBox}>
                  <img src={item.url} alt="loan logo" />
                </div>
                <p className={styles.footerName}>{item.name}</p>
              </div>
            ))}
            <div className={styles.row16}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
