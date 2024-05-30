import { Fragment, ReactNode } from 'react';
import customEmojis from '../EmojiPicker/customEmojis';
import styles from './ChatMessage.module.scss';
import { ROUTE } from '@/types/routeTypes';
import { Link } from 'react-router-dom';

type TProps = {
  content: string;
};

export const ChatMessageContent = ({ content }: TProps) => {
  const regex = /(:[a-zA-Z0-9-_]+:)/g;
  let match;
  let lastIndex = 0;
  const segments = [];

  while ((match = regex.exec(content))) {
    const segment = content.slice(lastIndex, match.index);
    const emoji = match[0];

    if (segment) {
      segments.push(segment);
    }
    segments.push(emoji);

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    const segment = content.slice(lastIndex);
    segments.push(segment);
  }

  const renderedContent = segments.map((segment, index) => {
    if (segment.startsWith(':') && segment.endsWith(':')) {
      const emojiName = segment.slice(1, -1);
      const emoji = customEmojis.find((emoji) => emoji.name === emojiName);
      if (emoji) {
        const hasText = segments.length > 1;
        const emojiClassName = hasText ? styles.smallEmoji : styles.bigEmoji;
        return (
          <img
            key={index}
            src={emoji.image}
            alt={emoji.name}
            className={emojiClassName}
          />
        );
      }
    }
    return <Fragment key={index}>{parseMessageUrls(segment)}</Fragment>;
  });

  return renderedContent;
};

const parseMessageUrls = (message: string): ReactNode => {
  const splitByURL = (str: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.split(urlRegex);
  };

  const segments = splitByURL(message);

  const renderedSegments = segments.map((segment, index) => {
    if (segment.startsWith(location.origin)) {
      const url = new URL(segment);

      const isCaseBattleUrl = url.pathname.startsWith(ROUTE.CASE_BATTLES + '/');
      const isNotCreateCasseBattleUrl =
        url.pathname !== ROUTE.CASE_BATTLE_CREATE;
      if (isCaseBattleUrl && isNotCreateCasseBattleUrl) {
        return (
          <Link key={index} to={segment} className={styles.caseBattleLink}>
            <img
              src="/images/case-battle-icon-92.png"
              alt="case image"
              className={styles.caseBattleImage}
            />
            Case battle
          </Link>
        );
      }
    }

    return segment;
  });

  return renderedSegments;
};
