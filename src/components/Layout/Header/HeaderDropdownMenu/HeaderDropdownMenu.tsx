import { LogoutIconV2 } from "@icons/LogoutIconV2";
import { logout } from "@utils/auth.utils";
import clsx from "clsx";
import { T } from "../../../../i18n/translate";
import styles from "./HeaderDropdownMenu.module.scss";

export const HeaderDropdownMenu = ({ onClose }: { onClose: () => void }) => {
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
