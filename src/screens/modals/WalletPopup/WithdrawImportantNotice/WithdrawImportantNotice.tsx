import { useState } from 'react';
import coin from '../../../../assets/images/coin.png';
import { Button } from '../../../../components/Button/Button';
import { Flex } from '../../../../components/Flex/Flex';
import { Checkbox } from '../../../../components/Form/Checkbox';
import { Modal } from '../../../../components/Modal/Modal';
import { PriceWithCoin } from '../../../../components/PriceWithCoin/PriceWithCoin';
import { Title1 } from '../../../../components/Typography/Typography';
import { MAX_WITHDRAWAL } from '../../../../constants';
import { T } from '../../../../i18n/translate';
import styles from './WithdrawImportantNotice.module.scss';
import { toast } from 'react-hot-toast';

type TProps = {
  onConfirm: () => void;
  onClose: () => void;
}

export const WithdrawImportantNotice = ({ onConfirm, onClose }: TProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleConfirm = () => {
    if (!accepted) {
      toast.error('Please select checkbox');
      return;
    }

    onConfirm();
  };

  return (
    <Modal show={true} onClose={onClose} className={styles.modal}>
      <Flex container flexDirection="column" gap={21} alignItems="center">
        <img
          src={coin}
          alt="Coupon"
          className={styles.couponImg}
          style={{ width: 134, height: 127 }}
        />
        <Title1 className={styles.title}>
          <T id="withdraw.ImportantNotice" defaultMessage="Important Notice!" />
        </Title1>
        <div className={styles.limitText}>
          <T
            id="withdraw.LimitPer1Request"
            defaultMessage="Withdrawal Limit per 1x Request: "
          />{' '}
          <PriceWithCoin>{MAX_WITHDRAWAL}</PriceWithCoin>
        </div>

        <div>
          <p className={styles.greyText}>
            <T
              id="withdraw.withdrawalManualApprovalNotice"
              defaultMessage="Withdrawals are subject to manual approval by Admin for security reasons. For faster processing, open a support ticket on Discord or use the self-ban option on your profile page"
            />
          </p>
          <div className={styles.checkboxContainer}>
            <Checkbox
              className={styles.checkbox}
              checked={accepted}
              label="I have read and understood"
              name="legal"
              onChange={(e) => setAccepted(e.target.checked)}
            />
          </div>
        </div>

        <Button pressable className={styles.button} onClick={handleConfirm}>
          <T id="common.Confirm" defaultMessage="Confirm" />
        </Button>
      </Flex>
    </Modal>
  );
};
