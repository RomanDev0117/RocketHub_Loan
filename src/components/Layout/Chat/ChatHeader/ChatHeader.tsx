import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/pro-solid-svg-icons';
import styles from './ChatHeader.module.scss';
import { Button } from '../../../Button/Button';
// import usFlag from '../../../../assets/images/icons/us-flag.svg';
import { closeChat } from '../../../../store/actions/appActions';
import { ChatICon } from '../../../icons/ChatIcon';
import clsx from 'clsx';

type TProps = {
  className?: string;
}

export const ChatHeader = ({ className }: TProps) => {
  // const flagImg = <img src={usFlag} alt="US flag" />;

  return (
    <header className={clsx(styles.chatHeader, className)}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <ChatICon />
          Chat
        </div>

        {/* <Button
          append={flagImg}
          color="secondary"
          gap={6}
          rounded={200}
          className={styles.button}
          px={12}
        >
          EN
        </Button> */}
      </div>

      <Button
        color="secondary"
        gap={6}
        rounded={10}
        className={styles.closeButton}
        onClick={() => closeChat()}
      >
        <FontAwesomeIcon icon={faClose} fontSize={24} />
      </Button>
    </header>
  );
};
