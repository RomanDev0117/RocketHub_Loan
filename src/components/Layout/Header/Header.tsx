import { AccountUnlockPopup } from "@/screens/modals/AccountUnlockPopup/AccountUnlockPopup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STEAM_AUTH_URL } from "../../../constants";
import { useLoginPopup } from "../../../hooks/useLoginPopup";
import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { ROUTE } from "../../../types/routeTypes";
import { Logo } from "../../Logo/Logo";
import styles from "./Header.module.scss";
import { UserInfo } from "./UserInfo/UserInfo";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginPopup = useLoginPopup();

  const loginButton = (
    <a
      className={styles.signButton}
      href={STEAM_AUTH_URL}
      onClick={() => loginPopup.open()}
    >
      <img src="/images/loans/steam_log.png" alt="Sign Up" />
      <p className={styles.buttonText}>Sign up with steam</p>
    </a>
  );

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to={ROUTE.HOME} className={styles.logo}>
          <Logo className={styles.desktopLogo} />
        </Link>
        <div className={styles.tabs}>
          <div className={styles.tabLoan}>
            <img
              src="/images/loans/ticket.png"
              alt="loan ticket"
              className={styles.tabImg}
            />
            <p className={styles.tabText}>Loan</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.currencyBox}>
          <img
            src="/images/loans/uk_flag.png"
            className={styles.flag}
            alt="loan flag"
          />
          <div className={styles.currencyDivider}></div>
          <p className={styles.currencyText}>$ USD</p>
        </div>
        {!isLoggedIn && loginButton}

        {isLoggedIn && (
          <>
            <div className={styles.divider} />
            <UserInfo />
          </>
        )}
      </div>
      <AccountUnlockPopup />
    </header>
  );
};
