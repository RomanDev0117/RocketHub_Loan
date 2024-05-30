import { NavLink } from "react-router-dom";
import { T } from "../../../../i18n/translate";
import {
  getProfileBetHistoryPath,
  getProfilePath,
  getProfileReferralsPath,
  getProfileTransactionsPath,
} from "@utils/url.utils";
import styles from "./HeaderDropdownMenu.module.scss";
import { selectIsAdmin, selectUserSteamId } from "@store/slices/userSlice";
import { useSelector } from "react-redux";
import { logout } from "@utils/auth.utils";
import clsx from "clsx";
import { PeopleGroupIconV2 } from "@icons/PeopleGroupIconV2";
import { TwoCoinsIcon } from "@icons/TwoCoinsIcon";
import { AccountIcon } from "@icons/AccountIcon";
import { SupportIcon } from "@icons/SupportIcon";
import { LogoutIconV2 } from "@icons/LogoutIconV2";
import { DISCORD_CHANNEL_URL } from "../../../../constants";
import { ROUTE } from "../../../../types/routeTypes";
import { CreditCardIcon } from "@/components/icons/CreditCardIcon";
import { useVaultPopup } from "@/hooks/useVaultPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVault } from "@fortawesome/pro-solid-svg-icons";

export const HeaderDropdownMenu = ({ onClose }: { onClose: () => void }) => {
  const vaultPopp = useVaultPopup();
  const steamId = useSelector(selectUserSteamId);
  const isAdmin = useSelector(selectIsAdmin);

  const menuLinks = [
    ...(isAdmin
      ? [
          {
            to: ROUTE.ADMIN_DASHBOARD,
            label: "admin",
          },
        ]
      : []),
    {
      to: getProfilePath(steamId),
      label: <T id="headerMenu.Account" defaultMessage="Account" />,
      icon: <AccountIcon />,
    },
    {
      label: <T id="headerMenu.Vault" defaultMessage="Vault" />,
      icon: <FontAwesomeIcon icon={faVault} fontSize={14} />,
      onClick: () => vaultPopp.open(),
    },
    {
      to: getProfileTransactionsPath(steamId),
      label: <T id="headerMenu.Transactions" defaultMessage="Transactions" />,
      icon: <TwoCoinsIcon />,
    },
    {
      to: getProfileBetHistoryPath(steamId),
      label: <T id="headerMenu.BetHistory" defaultMessage="Bet history" />,
      icon: <CreditCardIcon />,
    },
    {
      to: getProfileReferralsPath(steamId),
      label: <T id="headerMenu.Referrals" defaultMessage="Referrals" />,
      icon: <PeopleGroupIconV2 />,
    },
    {
      to: DISCORD_CHANNEL_URL,
      target: "_blank",
      label: <T id="headerMenu.Support" defaultMessage="Support" />,
      icon: <SupportIcon />,
    },
  ];

  return (
    <div className={styles.dropdown} onClick={onClose}>
      <span
        onClick={() => logout()}
        className={clsx(styles.link, styles.logoutLink)}
      >
        <LogoutIconV2 />
        <T id="common.Logout" defaultMessage="Log out" />
      </span>
    </div>
  );
};
