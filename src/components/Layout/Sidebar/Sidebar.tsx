import { UpgraderIcon } from "@/components/icons/UpgarderIcon";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faCommentsQuestionCheck,
  faFerrisWheel,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { DISCORD_CHANNEL_URL } from "../../../constants";
import { useIsMobileHeader } from "../../../hooks/useMediaHooks";
import useTranslation from "../../../hooks/useTranslation";
import { useUpgraderPopup } from "../../../hooks/useUpgraderPopup";
import {
  collapseSidebar,
  toggleSidebarOpen,
} from "../../../store/actions/appActions";
import { selectSidebarExpanded } from "../../../store/slices/appSlice";
import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { ROUTE } from "../../../types/routeTypes";
import { List } from "../../List/List";
import { CaseBattleIcon } from "../../icons/CaseBattleIcon";
import { CaseOpeningIcon } from "../../icons/CaseOpeningIcon";
import { LeaderboardIcon } from "../../icons/LeaderboardIcon";
import { SidebarToggleIcon } from "../../icons/SidebarToggleIcon";
import { TrophyIcon } from "../../icons/TrophyIcon";
import { UserInfo } from "../Header/UserInfo/UserInfo";
import { GamesDropdown } from "./GamesDropdown";
import styles from "./Sidebar.module.scss";
import { SidebarTitle } from "./SidebarTitle";

export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const upgraderPopup = useUpgraderPopup();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const expanded = useSelector(selectSidebarExpanded);
  const isMobileHeadder = useIsMobileHeader();

  useEffect(() => {
    if (isMobileHeadder) {
      collapseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const rewards = [
    {
      label: t({ id: "common.Rewards", defaultMessage: "Rewards" }),
      icon: <TrophyIcon />,
      to: ROUTE.REWARDS,
    },
    {
      label: t({ id: "common.DailyRace", defaultMessage: "Daily race" }),
      icon: <LeaderboardIcon />,
      to: ROUTE.DAILY_RACE,
    },
  ];

  const community = [
    // {
    //   label: t({ id: 'common.Shop', defaultMessage: 'Shop' }),
    //   icon: <ShopIcon />,
    //   to: ROUTE.SHOP,
    // },
    {
      label: t({ id: "common.Discord", defaultMessage: "Discord" }),
      icon: (
        <FontAwesomeIcon
          icon={faDiscord}
          style={{ width: 22, height: "auto", padding: "0px 1px" }}
        />
      ),

      to: DISCORD_CHANNEL_URL,
      target: "_blank",
    },
    {
      label: t({ id: "common.Support", defaultMessage: "Support" }),
      icon: (
        <FontAwesomeIcon
          icon={faCommentsQuestionCheck}
          style={{ width: 22, height: "auto", padding: "0px 1px" }}
        />
      ),
      to: "",
    },
  ];

  const games = [
    // { label: 'Jackpot', icon: <JackpotIcon />, to: getGamePath('jackpot') },
    {
      label: "Case Battle",
      icon: <CaseBattleIcon />,
      to: ROUTE.CASE_BATTLES,
    },
    {
      label: "Upgrader",
      icon: <UpgraderIcon className={styles.upgraderIcon} />,
      to: ROUTE.UPGRADER,
      onClick: (e: any) => {
        if (![ROUTE.UPGRADER, ROUTE.HOME].includes(location.pathname)) {
          e.preventDefault();
          upgraderPopup.open();
        }
      },
    },

    {
      icon: (
        <FontAwesomeIcon icon={faFerrisWheel} className={styles.upgraderIcon} />
      ),
      label: "Wheel",
      // icon: <CaseBattleIcon />,
      to: ROUTE.WHEEL_OF_FORTUNE,
    },
    {
      label: "Case Opening",
      icon: <CaseOpeningIcon />,
      to: ROUTE.CASE_OPENING,
    },
  ];

  return (
    <aside className={clsx(styles.sidebar, !expanded && styles.collapsed)}>
      <button
        className={styles.toggleSidebarButton}
        onClick={toggleSidebarOpen}
      >
        <SidebarToggleIcon className={styles.arrow} />
      </button>

      {isMobileHeadder && isLoggedIn && <UserInfo />}

      <div>
        <AnimateHeight height={expanded ? "auto" : 0} duration={150}>
          <SidebarTitle title="Games" mb="4px" />
        </AnimateHeight>
        <div className={expanded ? undefined : styles.collapsedSeparator} />
        <GamesDropdown onlyIcons={!expanded} games={games} />

        <List
          className={styles.list}
          items={games}
          listItemClassName={clsx(styles.listItem, styles.gamesMobileList)}
          onlyIcons={!expanded}
          Component={NavLink}
        />
      </div>

      <div>
        <AnimateHeight height={expanded ? "auto" : 0} duration={150}>
          <SidebarTitle title="REWARDS" mb="4px" />
        </AnimateHeight>
        <div className={expanded ? undefined : styles.collapsedSeparator} />
        <List
          className={styles.list}
          items={rewards}
          listItemClassName={styles.listItem}
          onlyIcons={!expanded}
          Component={NavLink}
        />
      </div>

      <div>
        <AnimateHeight height={expanded ? "auto" : 0} duration={150}>
          <SidebarTitle
            title={t({
              id: "common.Community",
              defaultMessage: "Community",
            })}
            mb="4px"
          />
        </AnimateHeight>
        <div className={expanded ? undefined : styles.collapsedSeparator} />
        <List
          className={styles.list}
          items={community}
          listItemClassName={styles.listItem}
          onlyIcons={!expanded}
          Component={NavLink}
        />
      </div>

      <div className={expanded ? undefined : styles.collapsedSeparator} />
      {/* <SidebarBonus /> */}
    </aside>
  );
};
