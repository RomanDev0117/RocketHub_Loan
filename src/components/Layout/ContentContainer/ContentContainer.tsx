import clsx from "clsx";
import styles from "./ContentContainer.module.scss";
import {
  selectChatOpen,
  selectSidebarExpanded,
} from "../../../store/slices/appSlice";
import { useSelector } from "react-redux";
import { ROUTE } from "../../../types/routeTypes";
import { useLocation, useMatch } from "react-router-dom";

export const ContentContainer = (props: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation();
  const isOpenCasePage = Boolean(useMatch(ROUTE.OPEN_CASE));
  const sidebarExpanded = useSelector(selectSidebarExpanded);
  const chatOpened = useSelector(selectChatOpen);

  const PAGE_WIDTH = {
    [ROUTE.HOME]: 1074,
    [ROUTE.CASE_BATTLE_CREATE]: 1124,
    [ROUTE.PROVABLY_FAIR]: 1024,
    [ROUTE.TERMS_OF_USE]: 1024,
    [ROUTE.PRIVACY_POLICY]: 1024,
    [ROUTE.REFUND_POLICY]: 1024,
    [ROUTE.AML_POLICY]: 1024,
    [ROUTE.WHEEL_OF_FORTUNE]: 1228,
    [ROUTE.REWARDS]: 1230,
    DEFAULT: 1370,
  };

  let maxWidth = PAGE_WIDTH[location.pathname] || PAGE_WIDTH.DEFAULT;

  if (isOpenCasePage) {
    maxWidth = 1124;
  }

  return (
    <div
      {...props}
      className={clsx(
        styles.root,
        props.className,
        !sidebarExpanded && styles.noSidebar,
        !chatOpened && styles.noChat
      )}
    >
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
