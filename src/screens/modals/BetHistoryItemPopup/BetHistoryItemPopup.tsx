import { Modal } from '@/components/Modal/Modal';
import styles from './BetHistoryItemPopup.module.scss';
import { BetHistoryType, TBetHistoryItem } from '@/types/betHistory.types';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ContentUpgrader } from './components/ContentUpgrader/ContentUpgrader';
import { ContentCaseOpening } from './components/ContentCaseOpening/ContentCaseOpening';
import { ContentCaseBattle } from './components/ContentCaseBattle/ContentCaseBattle';

type TProps = {
  item: TBetHistoryItem | null;
  onClose: () => void;
}

export const BetHistoryItemPopup = ({ item, onClose }: TProps) => {
  const [show, setShow] = useState(Boolean(item));

  useEffect(() => {
    setShow(Boolean(item));
  }, [item]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      className={clsx(styles.modal, 'v2Variables')}
      contentClassName={styles.modalContent}
      stickyCloseButton="sm"
    >
      <ModalContent item={item} />
    </Modal>
  );
};


const ModalContent = ({ item }: { item: TBetHistoryItem | null }) => {
  switch (item?.itemType) {
    case BetHistoryType.CASE_BATTLES:
      return <ContentCaseBattle item={item} />;
    case BetHistoryType.CASE_OPENING:
      return <ContentCaseOpening item={item} />;
    case BetHistoryType.UPGRADER:
      return <ContentUpgrader item={item} />;
    default:
      return null;
  }
};