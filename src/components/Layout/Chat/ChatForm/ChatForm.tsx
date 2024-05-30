import { ChangeEvent, FormEvent, RefObject, useState } from 'react';
import { Button } from '../../../Button/Button';
import styles from './ChatForm.module.scss';
import { ChatArrowIcon } from '../../../icons/ChatArrowIcon';
import { CHAT_MESSAGE_MAX_LENGTH } from '../../../../constants';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import toast from 'react-hot-toast';
import { ChatCommand } from '../../../../types/chatTypes';
import { useTipPopup } from '../../../../hooks/useTipPopup';

type ChatFormRef = {
  linkUser: (name: string) => void;
};

type TProps = {
  onSubmit: (message: string) => any;
  formRef?: RefObject<ChatFormRef>;
};

export const ChatForm = ({ onSubmit }: TProps) => {
  const { openTipPopup } = useTipPopup();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (trimmedMessage === ChatCommand.TIP as string) {
      openTipPopup();
      setMessage('');
      return;
    }

    setSending(true);
    await onSubmit(trimmedMessage);

    setSending(false);
    setMessage('');
  };

  const changeValue = (newMessage: string, fallbackToPrev = false) => {
    if (newMessage.length >= CHAT_MESSAGE_MAX_LENGTH) {
      if (fallbackToPrev) {
        newMessage = message;
        toast('Message is too long');
      } else {
        newMessage = newMessage.substring(0, CHAT_MESSAGE_MAX_LENGTH);
      }
    }

    setMessage(newMessage);
  };

  // const linkUser = (name: string) => {

  // }

  // formRef.current = {
  //   ...formRef.current,
  //   linkUser,
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;

    changeValue(newMessage);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <input
            placeholder="Type message..."
            className={styles.input}
            value={message}
            onChange={handleChange}
            readOnly={sending}
          />
          <EmojiPicker
            onEmojiSelect={(emojie) => {
              changeValue(message + emojie);
            }}
          />
        </div>
        <Button
          type="submit"
          className={styles.button}
          rounded
          loading={sending}
        >
          <ChatArrowIcon />
        </Button>
      </div>
      <div className={styles.counter}>
        {message.length}/{CHAT_MESSAGE_MAX_LENGTH}
      </div>
    </form>
  );
};
