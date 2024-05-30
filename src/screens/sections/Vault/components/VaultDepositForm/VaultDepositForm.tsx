import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldController } from '@/components/Form/TextField/TextField';
import styles from './VaultDepositForm.module.scss';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CoinIcon } from '@/components/icons/CoinIcon';
import { parseNumber } from '@/utils/validation.utils';
import { Spacer } from '@/components/Spacer/Spacer';
import { Button } from '@/components/Button/Button';
import popupStyles from '../../Vault.module.scss';
import { useUpdateVaultMutation } from '@/store/slices/rockethubApi/vault.endpoints';
import { useSelector } from 'react-redux';
import { selectUserBalance } from '@/store/slices/userSlice';
import { formatCoins, toFixed } from '@/utils/number.utils';
import { MAX_VAULT_DEPOSIT_AMOUNT } from '@/constants';
import toast from 'react-hot-toast';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { Flex } from '@/components/Flex/Flex';
import { LockToggle } from '@/components/LockToggle/LockToggle';
import Transition from '@/components/Transition';
import { TUpdateVaultRequestData } from '@/types/api/api.types';
import { Dropdown, TOption } from '@/components/Dropdown/Dropdown';

export const HOUR_IN_SECONDS = 60 * 60;
export const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;

type TFormValues = {
  amount: number;
  lock: boolean;
  lockDuration: number | undefined;
};

type TProps = {
  hideLock?: boolean;
};

export const lockDurationOptions: TOption<number>[] = [
  {
    label: <span className={styles.timeText}>hour</span>,
    icon: <span className={styles.time}>1</span>,
    value: 1 * HOUR_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>2</span>,
    label: <span className={styles.timeText}>hours</span>,
    value: 2 * HOUR_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>4</span>,
    label: <span className={styles.timeText}>hours</span>,
    value: 4 * HOUR_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>8</span>,
    label: <span className={styles.timeText}>hours</span>,
    value: 8 * HOUR_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>12</span>,
    label: <span className={styles.timeText}>hours</span>,
    value: 12 * HOUR_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>1</span>,
    label: <span className={styles.timeText}>day</span>,
    value: 1 * DAY_IN_SECONDS,
  },
  {
    icon: <span className={styles.time}>7</span>,
    label: <span className={styles.timeText}>days</span>,
    value: 7 * DAY_IN_SECONDS,
  },
];

export const VaultDepositForm = ({ hideLock }: TProps) => {
  const userBalance = useSelector(selectUserBalance);
  const [updateVaultApi, { isError, error, data }] = useUpdateVaultMutation();

  useHandleApiError({
    data,
    isError,
    error,
  });

  const schema = useMemo(() => {
    return yup.object({
      amount: yup
        .number()
        .typeError('Amount is required')
        .required('Amount is required')
        .min(0.01, 'Amount must be greater than 0.01')
        .test(
          'maxBalance',
          'Amount is bigger than your available coins',
          (value) => {
            return parseFloat(`${value}`) <= userBalance;
          }
        )
        .max(
          MAX_VAULT_DEPOSIT_AMOUNT,
          'Max amount is ' + formatCoins(MAX_VAULT_DEPOSIT_AMOUNT)
        ),
      lock: yup.boolean().required(),
      lockDuration: yup
        .number()
        .nullable()
        .transform((curr: number) => curr || null),
      // .when('lock', {
      //   is: true,
      //   then: (schema) =>
      //     schema
      //       .typeError('Lock duration is required')
      //       .min(1, 'Min lock duration is 1 hour')
      //       .max(
      //         MAX_VAULT_LOCK_DURATION_HOURS,
      //         `Max lock duration is ${MAX_VAULT_LOCK_DURATION_HOURS} hours`
      //       )
      //       .required('Lock duration is required'),
      // }),
    });
  }, [userBalance]);

  const { handleSubmit, control, reset, setValue, formState, watch } =
    useForm<TFormValues>({
      mode: 'onChange',
      resolver: yupResolver(schema) as any,
      defaultValues: {
        amount: '' as any,
        lock: false,
        lockDuration: 1 * HOUR_IN_SECONDS,
      },
    });

  const onSubmit = async (data: TFormValues) => {
    try {
      const lockDuration = data.lock
        ? toFixed(data.lockDuration || 0)
        : undefined;

      const reqData: TUpdateVaultRequestData = {
        amount: data.amount,
        action: 'deposit',
      };

      if (data.lock) {
        (reqData.lock = data.lock), (reqData.lockDuration = lockDuration);
      }

      const result = await updateVaultApi(reqData).unwrap();

      if (result.success) {
        toast.success(result.msg || 'Deposit successful.');
        reset();
      }
    } catch (error) {
      // error is handled by useHandleApiError hook
    }
  };

  const handleMaxClick = () => {
    const amount = Math.min(userBalance, MAX_VAULT_DEPOSIT_AMOUNT);
    if (amount > 0) {
      setValue('amount', amount, { shouldValidate: true, shouldDirty: true });
    } else {
      toast.error('You have no coins to deposit');
    }
  };

  const locked = watch('lock');
  const lockDuration = watch('lockDuration');



  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Flex container gap={16}>
        <TextFieldController
          name="amount"
          control={control}
          label="Amount"
          height={52}
          prepend={<CoinIcon shine />}
          fullWidth
          inputProps={{
            className: styles.input,
            autoComplete: 'off',
          }}
          placeholder="0.00"
          format={(value, prev) => {
            return parseNumber(value, prev, {
              decimals: 2,
              max: MAX_VAULT_DEPOSIT_AMOUNT,
            });
          }}
          append={
            <button
              type="button"
              className={popupStyles.maxButton}
              onClick={handleMaxClick}
            >
              MAX
            </button>
          }
        />

        {!hideLock && (
          <div>
            <Spacer y={21} />
            <div className={styles.lockContainer}>
              <LockToggle
                locked={locked}
                onChange={(newLock) => setValue('lock', newLock)}
              />
            </div>
          </div>
        )}
      </Flex>

      <Transition show={locked}>
        <div>
          <Spacer y={20} />

          <Dropdown
            label="Lock vault for"
            options={lockDurationOptions}
            value={watch('lockDuration')}
            labelContainerClassName={styles.dropdownLabel}
            placeholderProps={{
              className: styles.dropdown,
            }}
            height={52}
            placeholderTextClassName={styles.placeholderText}
            zIndex={2000}
            variant="dark-bordered"
            onChange={(s) => {
              if (s !== lockDuration) {
                setValue('lockDuration', s);
              }
            }}
          />
        </div>
      </Transition>

      <Spacer y={28} />

      <Button
        type="submit"
        pressable
        fullWidth
        size="huge"
        loading={formState.isSubmitting}
      >
        Deposit Vault
      </Button>
    </form>
  );
};
