import { useState, useEffect, useRef } from 'react';
import customEmojis from './customEmojis';
import styles from './index.module.scss';
import pepe from './pepe.png';
import { Portal } from '../../../Portal/Portal';

type TProps = {
  onEmojiSelect: (emoji: string) => void;
};

const EmojiPicker = ({ onEmojiSelect }: TProps) => {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleEmojiClick = (emojiName: string) => {
    const updatedMessage = `:${emojiName}:`;
    onEmojiSelect(updatedMessage);
    setPickerOpen(false);
  };

  const handleOutsideClick: EventListener = (event) => {
    const target: any = event.target;
    if (
      pickerRef.current &&
      !pickerRef.current.contains(target as Node) &&
      !popupRef.current?.contains?.(target as Node)
    ) {
      setPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.emojiPicker} ref={pickerRef}>
      <button
        type="button"
        className={styles.opener}
        onClick={() => setPickerOpen(!isPickerOpen)}
      >
        <span>
          <img src={pepe} alt="Emoji placeholder" />
        </span>
      </button>
      {isPickerOpen && (
        <Portal selectorOrRef="#emojie-list-portal">
          <div className={styles.emojiPopup} ref={popupRef}>
            {customEmojis.map((emoji, index) => (
              <img
                key={index}
                src={emoji.image}
                alt={emoji.name}
                className={styles.emoji}
                onClick={() => handleEmojiClick(emoji.name)}
              />
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default EmojiPicker;
