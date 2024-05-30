import clsx from "clsx";
import { useSelector } from "react-redux";
import {
  selectChatOpen,
  selectSidebarExpanded,
} from "../../../store/slices/appSlice";
import styles from "./ContentContainer.module.scss";

export const ContentContainer = (props: React.HTMLAttributes<HTMLElement>) => {
  const sidebarExpanded = useSelector(selectSidebarExpanded);
  const chatOpened = useSelector(selectChatOpen);

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
