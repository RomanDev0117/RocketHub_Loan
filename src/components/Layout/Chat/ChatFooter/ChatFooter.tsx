import { useSelector } from 'react-redux';
import { ChatForm } from '../ChatForm/ChatForm';
import styles from './ChatFooter.module.scss';
import {
  selectIsLoggedIn,
} from '../../../../store/slices/userSlice';
import { ChatMenuButton } from '../ChatMenuButton/ChatMenuButton';



type TProps = {
  usersOnlineCount: number;
  onMessageSend: (message: string) => any;
};

export const ChatFooter = ({ usersOnlineCount, onMessageSend }: TProps) => {
  // const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <div className={styles.chatFooter}>
      {/* this element exist as a portal for emojies, do not delete it */}
      <div id="emojie-list-portal" />
      <ChatMenuButton />

      <ChatForm onSubmit={onMessageSend} />
      <div className={styles.online}>
        <span className={styles.dot} />
        {usersOnlineCount || 0} online
      </div>
    </div>
  );
};
