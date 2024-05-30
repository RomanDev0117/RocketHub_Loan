import { useSelector } from "react-redux";
import { Truncate } from "@components/Truncate/Truncate";
import styles from "./UserInfo.module.scss";
import {
  selectLevelIcon,
  selectUserAvatar,
  selectUserLevel,
  selectUserName,
  selectUserWagered,
} from "@store/slices/userSlice";
import { useRef, useState } from "react";
import { CaretDownIcon } from "@icons/CaretDownIcon";
import { HeaderDropdownMenu } from "../HeaderDropdownMenu/HeaderDropdownMenu";
import { useClickAway } from "react-use";
import { useIsMobileHeader } from "@hooks/useMediaHooks";
import { UserProgressBar } from "@/components/UserProgressBar/UserProgressBar";
import { getLevelColor } from "@/utils/level.utils";
import { Avatar } from "@/components/Avatar/Avatar";

export const UserInfo = () => {
  const avatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const levelIcon = useSelector(selectLevelIcon);
  const isMobileHeadder = useIsMobileHeader();
  const lvl = useSelector(selectUserLevel);
  const wagered = useSelector(selectUserWagered);
  const progressBarColor = getLevelColor(lvl);

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
