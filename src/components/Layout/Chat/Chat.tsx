import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/pro-solid-svg-icons';
import { ChatMessage } from './ChatMessage/ChatMessage';
import { ChatFooter } from './ChatFooter/ChatFooter';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { useChat } from './useChat';
import { selectChatOpen } from '../../../store/slices/appSlice';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { ChatICon } from '../../icons/ChatIcon';
import { closeChat, openChat } from '../../../store/actions/appActions';
import { Button } from '../../Button/Button';
import Loader from '../../Loader/Loader';
import { T } from '../../../i18n/translate';
import { useLayoutEffect, useRef } from 'react';
import styles from './Chat.module.scss';
import { useIsMobileHeader } from '../../../hooks/useMediaHooks';
import { selectIsLoggedIn } from '@/store/slices/userSlice';
import { Rain } from '@/screens/modals/Rain/Rain';

export const Chat = () => {
  const chatOpened = useSelector(selectChatOpen);
  const { messages, userCount, loading, send } = useChat();
  const chatRef = useRef<HTMLDivElement>(null);
  const scrolled = useRef(false);
  const isMobileHeader = useIsMobileHeader();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useLayoutEffect(() => {
    if (!loading && !scrolled.current) {
      const el = chatRef.current;
      el?.scrollTo(0, el.scrollHeight);
      scrolled.current = true;
    }
  }, [loading]);

  return (
    <>
      <aside
        className={clsx(styles.chat, chatOpened && styles.open)}
        ref={chatRef}
      >
        <ChatHeader
          className={messages.length > 0 ? styles.chatWithMessages : undefined}
        />

        {isLoggedIn && (
          <div className={styles.rainContainer}>
            <Rain />
          </div>
        )}
        <div className={styles.chatList}>
          {loading && (
            <Loader
              renderProgress={() => (
                <T id="common.Loading..." defaultMessage="Loading..." />
              )}
            />
          )}
          {messages.map((m, idx) => {
            const key = `${idx}${m.time}`;

            return <ChatMessage key={key} message={m} />;
          })}
        </div>
        <ChatFooter usersOnlineCount={userCount} onMessageSend={send} />
      </aside>
      {!isMobileHeader && (
        <Button
          rounded
          color="secondary"
          onClick={() => (chatOpened ? closeChat() : openChat())}
          className={clsx(styles.chatOpenButton, {
            [styles.chatOpened]: chatOpened,
          })}
        >
          {chatOpened ? (
            <FontAwesomeIcon icon={faClose} fontSize={20} />
          ) : (
            <ChatICon />
          )}
        </Button>
      )}
    </>
  );
};
