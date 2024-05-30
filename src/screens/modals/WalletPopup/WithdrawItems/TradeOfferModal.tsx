import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Title1 } from '../../../../components/Typography/Typography';
import useTranslation from '../../../../hooks/useTranslation';
import { T } from '../../../../i18n/translate';
import styles from './TradeOfferModal.module.scss';
import { TResult } from './useWithdrawRust';

type TProps = {
  result: TResult | null;
  show: boolean;
  type: 'deposit' | 'withdraw';
  onClose: () => void;
};

export const TradeOfferModal = ({ show, onClose, result, type }: TProps) => {
  const { t } = useTranslation();

  const offerUrl = result?.offerId
    ? `https://steamcommunity.com/tradeoffer/${result?.offerId}`
    : '';

  return (
    <Modal show={show} onClose={onClose} className={styles.modal}>
      <div>
        {result?.reason && <p>{result.reason}</p>}
        {!result?.reason && (
          <>
            <Title1 mb={16}>
              <T
                id="steam.TradeOfferHasBeenSent"
                defaultMessage="Trade offer has been sent!"
              />
            </Title1>
            <p>
              Click the button below to open it.
              {type === 'deposit'
                ? t({
                  id: 'steam.withdraw.BalanceWillBeUpdatedAfterAccept',
                  defaultMessage:
                    'Your balance will be updated as soon as you accept the offer.',
                })
                : t({
                  id: 'steam.withdraw.BalanceWillBeUpdatedAfterCancel',
                  defaultMessage:
                    'Your balance will be returned if you cancel the trade.',
                })}
            </p>
            <Button
              className={styles.button}
              pressable
              fullWidth
              Component="a"
              target="_blank"
              href={offerUrl}
            >
              <T
                id="steam.ViewTradeOffer"
                defaultMessage="View trade offer"
              />
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
