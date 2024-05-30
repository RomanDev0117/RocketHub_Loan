import { Avatar } from "@/components/Avatar/Avatar";
import { Truncate } from "@components/Truncate/Truncate";
import { useIsMobileHeader } from "@hooks/useMediaHooks";
import { selectUserAvatar, selectUserName } from "@store/slices/userSlice";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useClickAway } from "react-use";
import { HeaderDropdownMenu } from "../HeaderDropdownMenu/HeaderDropdownMenu";
import styles from "./UserInfo.module.scss";

export const UserInfo = () => {
  const avatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const isMobileHeadder = useIsMobileHeader();

  const [menuOpen, setMenuOpen] = useState(false);
  // click away for dropdown
  const menuRef = useRef(null);
  useClickAway(menuRef, () => {
    if (!open) return;
    if (isMobileHeadder) return;
    setMenuOpen(false);
  });

  return (
    <div className={styles.rootContainer} ref={menuRef}>
      <span className={styles.root} onClick={() => setMenuOpen(!menuOpen)}>
        <Avatar src={avatar} alt="Avatar" />
        <div className={styles.nameContainer}>
          <div className={styles.topContainer}>
            <Truncate className={styles.userName}>{userName}</Truncate>
          </div>
        </div>
      </span>
      {menuOpen && <HeaderDropdownMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
};
