import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { T } from '../../../../i18n/translate';
import useTranslation from '../../../../hooks/useTranslation';
import styles from './DepositGiftCard.module.scss';
import { GiftCardLogoList } from './GiftCardLogoList';
import { TextField } from '../../../../components/Form/TextField/TextField';
import { GiftCardAmountSelector } from './GiftCardAmountSelector';
import { GiftIconV2 } from '../../../../components/icons/GiftIconV2';

export const DepositGiftCard = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(
    undefined
  );

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        {t({ id: 'deposit.Giftcards', defaultMessage: 'Giftcards' })}
      </h4>

      <GiftCardLogoList />

      <GiftCardAmountSelector
        selectedAmount={selectedAmount}
        onChange={(amount: number) => setSelectedAmount(amount)}
      />

      <TextField
        value={code}
        height={52}
        placeholder={t({
          id: 'depost.giftCard.EnterYourCode ',
          defaultMessage: 'Enter your code ',
        })}
        fontStyle="light"
        className={styles.input}
        label={t({
          id: 'depost.giftCard.GiftcardCode',
          defaultMessage: 'Giftcard code',
        })}
        onChange={(e) => {
          const code = e.target.value.toUpperCase();
          setCode(code);
        }}
      />

      <Button
        pressable
        fullWidth
        size="huge"
        className={styles.submitButton}
        prepend={<GiftIconV2 />}
        gap={10}
      >
        <T
          id="depost.giftCard.RedeemGiftcard"
          defaultMessage="Redeem Giftcard"
        />
      </Button>
    </div>
  );
};
