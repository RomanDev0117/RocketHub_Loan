import { VaultPopup } from "@/screens/modals/VaultPopup/VaultPopup";
import {
  selectIsAdmin,
  selectIsLoggedIn,
  selectIsModerator,
} from "@/store/slices/userSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { CaseDetailsPopup } from "../../screens/modals/CaseDetailsPopup/CaseDetailsPopup";
import { LoginPopup } from "../../screens/modals/LoginPopup/LoginPopup";
import { TipUserPopup } from "../../screens/modals/TipUserPopup/TipUserPopup";
import { UpgraderPopup } from "../../screens/modals/UpgraderPopup/UpgraderPopup";
import { UserDetailsPopup } from "../../screens/modals/UserDetailsPopup/UserDetailsPopup";
import { WalletPopup } from "../../screens/modals/WalletPopup/WalletPopup";
import { ROUTE } from "../../types/routeTypes";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { SystemNotificationController } from "../SystemNotificationController/SystemNotificationController";
import { Chat } from "./Chat/Chat";
import { ContentContainer } from "./ContentContainer/ContentContainer";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import styles from "./Layout.module.scss";
import { Sidebar } from "./Sidebar/Sidebar";

export const Layout = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isCaseBattlePage = Boolean(useMatch(ROUTE.CASE_BATTLE));
  const isModerator = useSelector(selectIsModerator);
  const isAdmin = useSelector(selectIsAdmin);

  const ClASS_NAMES = {
    [ROUTE.WHEEL_OF_FORTUNE]: styles.wofPage,
    [ROUTE.CASE_BATTLES]: styles.caseBattlesPage,
    [ROUTE.REWARDS]: styles.levelRewardsPage,
    [ROUTE.STAKING]: styles.stakingPage,
  };

  const className = isCaseBattlePage
    ? styles.caseBattlePage
    : ClASS_NAMES[location.pathname];

  return (
    <>
      <Header />

      {/* <Sidebar /> */}
      <div
        className={clsx(styles.pageContentContainer, className)}
        id="page-scrollable-content"
      >
        {isLoggedIn && <SystemNotificationController />}

        <ContentContainer className={styles.main}>
          <Outlet />
        </ContentContainer>
      </div>
      <LoginPopup />
      {/* {(isModerator || isAdmin) && <UserDecorationsPopup />} */}
    </>
  );
};
