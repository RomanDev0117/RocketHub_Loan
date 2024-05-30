import { AccountUnlockPopup } from "@/screens/modals/AccountUnlockPopup/AccountUnlockPopup";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STEAM_AUTH_URL } from "../../../constants";
import { useLoginPopup } from "../../../hooks/useLoginPopup";
import { useIsMobileHeader } from "../../../hooks/useMediaHooks";
import { T } from "../../../i18n/translate";
import {
  closeNotifications,
  collapseSidebar,
  openChat,
  toggleSidebarOpen,
} from "../../../store/actions/appActions";
import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { ROUTE } from "../../../types/routeTypes";
import { Button } from "../../Button/Button";
import { Logo } from "../../Logo/Logo";
import { ChatIconV2 } from "../../icons/ChatIconV2";
import { MenuIcon } from "../../icons/MenuIcon";
import styles from "./Header.module.scss";
import { HeaderWallet } from "./HeaderWallet/HeaderWallet";
import { NotificationsBell } from "./NotificationsBell/NotificationsBell";
import { UserInfo } from "./UserInfo/UserInfo";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginPopup = useLoginPopup();

  const isMobileHeader = useIsMobileHeader();

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
