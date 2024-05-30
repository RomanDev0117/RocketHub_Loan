/* eslint-disable @typescript-eslint/unbound-method */
import { Avatar } from '../../../Avatar/Avatar';
import { Truncate } from '../../../Truncate/Truncate';
import styles from './ChatMessage.module.scss';
import {
  MessageType,
  TChatMessageExtended,
  TChatUser,
} from '../../../../types/chatTypes';
import clsx from 'clsx';
import { useCollapse } from 'react-collapsed';
import { useLayoutEffect, useState } from 'react';
import { getLevelColor, getLevelIcon } from '../../../../utils/level.utils';
import { useUserClick } from '../../../../hooks/useUserClick';
import { ChatMessageContent } from './ChatMessageContent';
import { UserName } from '../../../User.Name/User.Name';
import { CoinIcon } from '../../../icons/CoinIcon';
import { isAdmin, isModerator } from '@/utils/user.utils';

type TProps = {
  message: TChatMessageExtended;
};

export const ChatMessage = ({ message }: TProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { getCollapseProps } = useCollapse({ isExpanded });

  const levelIcon = getLevelIcon(message.user?.level);
  const color = getLevelColor(message.user?.level);

  useLayoutEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <div {...getCollapseProps()}>
      <ChatMessageUI
        content={message.content}
        avatar={message.user?.avatar}
        user={message.user}
        sender={message.user ? message.user.name : undefined}
        date={message.time}
        nicknameColor={color}
        isSystem={message.type === MessageType.System}
        levelIcon={levelIcon as string}
        message={message}
      />
    </div>
  );
};

type TPropsUI = {
  avatar?: string;
  sender?: string;
  date?: number;
  content: string;
  isSystem?: boolean;
  nicknameColor?: string;
  user: TChatUser;
  levelIcon: string;
  message: TChatMessageExtended;
};

const ChatMessageUI = ({
  avatar,
  sender,
  date,
  content,
  isSystem,
  nicknameColor,
  user,
  levelIcon,
  message,
}: TPropsUI) => {
  const showHeader = date || sender;
  const handleUserClick = useUserClick({ user });


  const isTip = message.type === MessageType.Tip;
  const isRainTip = message.type === MessageType.RainTip;

  const getMessageContent = () => {
    let messageContent: React.ReactNode;

    if (isTip || isRainTip) {
      if (message.data) {
        messageContent = (
          <>
            <span className={styles.coinContainer}>
              <CoinIcon shine />
              {message.data.tipAmount}
            </span>

            {/* normal tip text */}
            {isTip && (
              <>
                tip for <UserName user={message.data?.recipientUser} />
              </>
            )}

            {/* rain tip text */}
            {isRainTip && <>tip for rain</>}
          </>
        );
      } else {
        messageContent = '';
      }
    } else {
      messageContent = isSystem ? (
        content
      ) : (
        <ChatMessageContent content={content} />
      );
    }

    return messageContent;
  };

  return (
    <div className={clsx(styles.message, isSystem && styles.systemMessage)}>
      {avatar && (
        <Avatar
          src={avatar}
          onClick={handleUserClick}
          className={styles.avatar}
          size={28}
          rounded="var(--chat-avatar-border-radius)"
          level={user.level}
          showLevel
        />
      )}
      <div className={styles.content}>
        {showHeader && (
          <header className={styles.header}>
            {levelIcon && <img src={levelIcon} className={styles.icon} />}
            <p className={styles.senderText}>
              {sender && (
                <Truncate
                  className={styles.title}
                  style={{ color: nicknameColor }}
                  onClick={handleUserClick}
                >
                  {isAdmin(message.user) && (
                    <span className={clsx(styles.userTag, styles.adminTag)}>
                      Admin
                    </span>
                  )}
                  {isModerator(message.user) && (
                    <span className={clsx(styles.userTag, styles.moderatorTag)}>
                      MOD
                    </span>
                  )}

                  {sender}
                </Truncate>
              )}
              <span
                className={clsx(styles.text, {
                  [styles.tipText]: isTip,
                })}
              >
                {getMessageContent()}
              </span>
              {/* <span className={styles.date}>
              {typeof date === 'number' &&
                format(new Date(date * 1000), 'HH:mm')}
            </span> */}
            </p>
          </header>
        )}

        <span style={{ color: 'var(--error)' }}>{isSystem && content}</span>
      </div>
    </div>
  );
};


