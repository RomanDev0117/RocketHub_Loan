/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEmailVerifyMutation } from '@/store/slices/rockethubApi/emails.endpoints';
import { useCreateZenCheckoutMutation } from '@/store/slices/rockethubApi/zen.endpoints';
import { selectUserEmailVerified, userActions } from '@/store/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Button } from '../../../../components/Button/Button';
import {
  ExchangeCalculatorController,
} from '../../../../components/ExchangeCalculator/ExchangeCalculator';
import { CheckboxController } from '../../../../components/Form/Checkbox/Checkbox';
import {
  TextFieldController,
} from '../../../../components/Form/TextField/TextField';
import { CoinIcon } from '../../../../components/icons/CoinIcon';
import {
  MAX_CARD_DEPOSIT,
  MIN_CARD_DEPOSIT,
  PAYMENT_BONUS_PERCENTAGE,
} from '../../../../constants';
import useTranslation from '../../../../hooks/useTranslation';
import { T } from '../../../../i18n/translate';
import { CARD_TYPE } from '../../../../types/payment.types';
import { ROUTE } from '../../../../types/routeTypes';
import { toFixed } from '../../../../utils/number.utils';
import styles from './DepositCreditCard.module.scss';
import { DepositCreditCardLogoList } from './DepositCreditCardLogoList';

type FormState = {
  email: string;
  exchangeValues: {
    usd: number;
    coins: number;
  };
  policyAccepted: boolean;
}

export const DepositCreditCard = () => {
  const { t } = useTranslation();

  const [createZenCheckout] =
    useCreateZenCheckoutMutation();

  const [emailVerify] = useEmailVerifyMutation();

  const emailVerified = useSelector(selectUserEmailVerified);

  const dispatch = useDispatch();

  const depositIncrease = PAYMENT_BONUS_PERCENTAGE[CARD_TYPE.CREDIT_CARD];
  const exchangeRate = (1 * 100) / (depositIncrease + 100);

  const schema = useMemo(() => {
    const minMaxError = `Min: $${MIN_CARD_DEPOSIT}.00, max: $${MAX_CARD_DEPOSIT}.00`;

    return yup.object({
      email: yup.string().email().default(''),
      exchangeValues: yup.object({
        usd: yup
          .number()
          .typeError(minMaxError)
          .min(MIN_CARD_DEPOSIT, minMaxError)
          .max(MAX_CARD_DEPOSIT, minMaxError)
          .required(minMaxError),
        coins: yup.mixed().transform((value, originalValue) => {
          if (originalValue === '' || typeof originalValue != 'number') {
            return null;
          }
          return value;
        }).nullable(),
      }),
      policyAccepted: yup.bool().oneOf(
        [true],
        t({
          id: 'deposit.card.error.policy',
          defaultMessage: 'Confirm that you agree with refund policy',
        })
      ),
    });
  }, [t]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    control,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      exchangeValues: {
        usd: 5,
        coins: toFixed(5 / exchangeRate),
      },
      policyAccepted: false,
    },
  });

  const deposit = async (values: FormState) => {
    if (!emailVerified) {
      toast.error('Email is not verified');
      return;
    }
    const result = await createZenCheckout({
      usdAmount: values.exchangeValues.usd,
      email: values.email,
      policyAccepted: values.policyAccepted,
    });

    if ('error' in result) {
      if ('data' in result.error) {
        const msg: string =
          (result.error.data as any).msg || (result.error.data as any).error;
        toast.error(msg);
        return;
      }
    }
    if ('success' in result) {

    }

    // if (result.data.success === false) {
    //   const msg: string = result.data.msg;
    //   toast.error(msg);
    //   return;
    // }

    // if (!result.data.sessionUrl) {
    //   captureException(
    //     'Session url is missing after creaion of the zen checkout'
    //   );
    //   toast.error('Something went wrong');
    //   return;
    // }
    //const redirectUrl: string = result.data.sessionUrl;
    if ('data' in result) {
    const redirectUrl: string = result.data;
    window.location.assign(redirectUrl);
    }
  };

  const verifyEmail = async () => {
    const result = await emailVerify(getValues().email);
    if ('error' in result) {
      const msg: string =
        (result.error as any).data.msg || (result.error as any).data.error;
      toast.error(msg);
      return;
    }
    toast.success('Email verification sent successfully!');
    dispatch(userActions.setEmailVerified(true));
  };

  return (
    // @ts-ignore
    <form className={styles.container} onSubmit={handleSubmit(deposit)}>
      <h4 className={styles.title}>
        {t({ id: 'deposit.CashDeposit', defaultMessage: 'Cash Deposit' })}
      </h4>

      <DepositCreditCardLogoList />

      <ExchangeCalculatorController
        name="exchangeValues"
        control={control}
        data={[
          {
            quickActions: [25, 50, 100, 250, 500],
            name: 'usd',
            icon: '$',
            height: 52,
            label: (
              <T
                id="creditCard.AmountToDeposit"
                defaultMessage="Amount to deposit"
              />
            ),
          },
          {
            name: 'coins',
            height: 52,
            icon: <CoinIcon shine className={styles.coinIcon} />,
            label: (
              <T id="creditCard.YouWillGet" defaultMessage="You will get" />
            ),
            bonus: `You receive +${depositIncrease}% bonus`,
          },
        ]}
        exchangeRate={exchangeRate}
      />

      {!emailVerified && <div className={styles.rowContainer}>
        <TextFieldController
          name="email"
          control={control}
          height={52}
          placeholder={t({
            id: 'depost.creditCard.EmailAddress',
            defaultMessage: 'Enter your email address',
          })}
          fontStyle="light"
          className={styles.emailInput}
          label={t({
            id: 'depost.zenForm.EmailAddress',
            defaultMessage: 'Email address',
          })}
        />
        <Button
          pressable
          size="l"
          height={52}
          type="button"
          onClick={verifyEmail}
        >
          <T id="deposit.zen.EmailVerify" defaultMessage="Verify" />
        </Button>
      </div>}
      <CheckboxController
        name="policyAccepted"
        control={control}
        className={styles.policyCheckbox}
        label={
          <>
            <T
              id="zen.checkbox.IAgreeToTheRefundPolicy"
              defaultMessage="I have read and agree to the <refund-policy>Refund Policy.</refund-policy>"
              values={{
                'refund-policy': (...chunks: any) => (
                  <a href={ROUTE.REFUND_POLICY} target="_blank">
                    {chunks}
                  </a>
                ),
              }}
            />
          </>
        }
      />

      <Button
        pressable
        fullWidth
        size="huge"
        className={styles.submitButton}
        gap={10}
        type="submit"
        loading={isSubmitting}
      >
        <T id="deposit.zen.GoToCheckout" defaultMessage="Go to Checkout" />
      </Button>
      <span className={styles.warningText}>
        <T
          id="creditCard.PaymentWarning"
          defaultMessage="Payments from Singapore, Netherlands, Belgium, Switzerland will not be accepted!"
        />
      </span>
    </form>
  );
};
