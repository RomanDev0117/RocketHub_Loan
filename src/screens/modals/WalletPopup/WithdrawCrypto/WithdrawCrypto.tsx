import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { ExchangeCalculatorController } from '../../../../components/ExchangeCalculator/ExchangeCalculator';
import { CoinIcon } from '../../../../components/icons/CoinIcon';
import { T } from '../../../../i18n/translate';
import { Button } from '../../../../components/Button/Button';
import { useSelector } from 'react-redux';
import { selectSelectedPaymentMethod } from '../../../../store/slices/walletPopupSlice';
import { CRYPTO_CURRENCY } from '../../../../types/payment.types';
import { Dropdown } from '../../../../components/Dropdown/Dropdown';
import styles from './WithdrawCrypto.module.scss';
import { useCryptoDropdown } from '../../../../hooks/useCryptoDropdown';
import { useFetchCryptoInfo } from '../../../../hooks/useFetchCryptoInfo';
import Loader from '../../../../components/Loader/Loader';
import toast from 'react-hot-toast';
import { useWithdrawCryptoMutation } from '../../../../store/slices/rockethubApi/crypto.endpoints';
import { captureException } from '@sentry/react';
import { formatPrice, toFixed } from '../../../../utils/number.utils';
import {
  CRYPTO_WITHDRAWAL_MAX_USD_AMOUNT,
  CRYPTO_WITHDRAWAL_MIN_USD_AMOUNT,
} from '../../../../constants';
import CryptoWalletDropdown from '../../../../components/Form/CryptoWalletDropdown/CryptoWalletDropdown';
import { useForm } from 'react-hook-form';
import { selectUserBalance } from '@/store/slices/userSlice';
import { getAppState } from '@/store';

type TProps = {
  onCryptoChange: (crypto: CRYPTO_CURRENCY) => void;
};

type TFormValues = {
  exchangeValues: {
    usd: number;
    crypto: number;
  };
  cryptoAddress: string;
};

export const WithdrawCrypto = ({ onCryptoChange }: TProps) => {
  const selected = useSelector(selectSelectedPaymentMethod) as CRYPTO_CURRENCY;

  const minUsdAmount = CRYPTO_WITHDRAWAL_MIN_USD_AMOUNT[selected];
  const maxUsdAmount = CRYPTO_WITHDRAWAL_MAX_USD_AMOUNT[selected];

  const { icon, options } = useCryptoDropdown({ selected, method: 'withdraw' });

  const [withdrawCryptoMutation] = useWithdrawCryptoMutation();
  const { isFetching, error, exchangeRate } = useFetchCryptoInfo(selected, 'withdrawal');

  const schema = useMemo(() => {
    const minMaxError = `Min: $${minUsdAmount}.00, max: $${maxUsdAmount}.00`;

    return yup.object({
      exchangeValues: yup.object({
        usd: yup
          .number()
          .typeError(minMaxError)
          .min(minUsdAmount, minMaxError)
          .max(maxUsdAmount, minMaxError)
          .required(minMaxError),
        crypto: yup
          .number()
          .typeError('Value is required')
          .required('Value is required'),
      }),
      cryptoAddress: yup
        .string()
        .typeError('Address is required')
        .required('Address is required'),
    });
  }, [minUsdAmount, maxUsdAmount]);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      exchangeValues: {
        usd: minUsdAmount,
        crypto: 1,
      },
      cryptoAddress: '',
    },
  });

  useEffect(() => {
    handleUsdChange(minUsdAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate]);

  useEffect(() => {
    if (selected) {
      setValue('cryptoAddress', '');
    }
  }, [selected]);

  const handleUsdChange = (usdAmount: number) => {
    if (!exchangeRate) return;
    const cryptoAmount = toFixed(usdAmount / exchangeRate, 6);

    setValue(
      'exchangeValues',
      { usd: usdAmount, crypto: cryptoAmount },
      { shouldValidate: true }
    );
    // setValue('exchangeValues.crypto', cryptoAmount, { shouldValidate: true });
  };

  const withdrawCrypto = async ({
    exchangeValues: { crypto },
    cryptoAddress,
  }: TFormValues) => {
    try {
      const res = await withdrawCryptoMutation({
        amount: crypto,
        currency: selected,
        address: cryptoAddress,
      }).unwrap();

      if (res.success) {
        toast.success('Crypto withdrawal successful!');
        setValue('cryptoAddress', '');
      } else {
        toast.error('Error withdrawing crypto: ' + (res.msg || ''));
      }
    } catch (e: any) {
      captureException(e);
      const message = 'Error withdrawing crypto: ' + e?.data?.msg || '';
      toast.error(message);
    }
  };

  const cryptoAmount = watch('exchangeValues')?.crypto || 0;
  const calculatedExchangeRate = 1 / (exchangeRate || 1);

  const handleMaxClick = () => {
    const userBalance = selectUserBalance(getAppState());
    const max = Math.min(maxUsdAmount, userBalance);

    setValue('exchangeValues', {
      crypto: toFixed(calculatedExchangeRate * max, 6) || ('' as any),
      usd: max,
    }, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };



  return (
    <form className={styles.container} onSubmit={handleSubmit(withdrawCrypto)}>
      <Dropdown
        label={
          <T
            id="withdrawCrypto.SelectCryptocurrency"
            defaultMessage="Select cryptocurrency"
          />
        }
        options={options}
        value={selected}
        labelContainerClassName={styles.dropdownLabel}
        placeholderProps={{
          className: styles.dropdown,
        }}
        placeholderTextClassName={styles.placeholderText}
        zIndex={2000}
        onChange={(s) => {
          if (s !== selected) {
            onCryptoChange(s);
          }
        }}
      />

      <ExchangeCalculatorController
        name="exchangeValues"
        control={control}
        textFieldProps={{
          // appearance: 'lightGrey',
          height: 52,
        }}
        data={[
          {
            name: 'crypto',
            label: (
              <T id="exchangeInput.YouWillGet" defaultMessage="You will get" />
            ),
            icon: icon,
            decimals: 6,
          },
          {
            name: 'usd',
            label: (
              <T
                id="exchangeInput.AmountToWithdraw"
                defaultMessage="Amount to withdraw"
              />
            ),
            icon: <CoinIcon shine />,
            textFieldProps: {
              append: (
                <button type="button" className={styles.maxButton} onClick={handleMaxClick}>Max</button>
              )
            }
          },
        ]}
        exchangeRate={calculatedExchangeRate}
      />

      <CryptoWalletDropdown
        cryptoType={selected}
        watch={watch}
        name="cryptoAddress"
        setValue={setValue}
        error={errors['cryptoAddress']}
      />

      <Button
        pressable
        className={styles.submitButton}
        size="huge"
        fullWidth
        disabled={Boolean(error)}
        type="submit"
        loading={isSubmitting}
      >
        Withdraw {formatPrice(cryptoAmount)} {selected.toUpperCase()}
      </Button>

      <Loader loading={isFetching} zIndex={30} position="absolute" backdrop />
    </form>
  );
};
