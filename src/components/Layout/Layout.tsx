import { selectIsLoggedIn } from "@/store/slices/userSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { LoginPopup } from "../../screens/modals/LoginPopup/LoginPopup";
import { ROUTE } from "../../types/routeTypes";
import { SystemNotificationController } from "../SystemNotificationController/SystemNotificationController";
import { ContentContainer } from "./ContentContainer/ContentContainer";
import { Header } from "./Header/Header";
import styles from "./Layout.module.scss";

export const Layout = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isCaseBattlePage = Boolean(useMatch(ROUTE.CASE_BATTLE));

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
