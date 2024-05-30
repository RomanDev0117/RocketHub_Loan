import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldController } from '@/components/Form/TextField/TextField';
import styles from './VaultWithdrawForm.module.scss';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CoinIcon } from '@/components/icons/CoinIcon';
import { parseNumber } from '@/utils/validation.utils';
import { Spacer } from '@/components/Spacer/Spacer';
import { Button } from '@/components/Button/Button';
import popupStyles from '../../Vault.module.scss';
import { TVault } from '@/types/vault.types';
import { toFixed } from '@/utils/number.utils';
import { useUpdateVaultMutation } from '@/store/slices/rockethubApi/vault.endpoints';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import toast from 'react-hot-toast';

type TFormValues = {
  amount: number;
};

type TProps = {
  vault?: TVault;
}

export const VaultWithdrawForm = ({ vault }: TProps) => {
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
          'Amount is bigger than your vault balance',
          (value) => {
            return parseFloat(`${value}`) <= (vault?.amount || 0);
          }
        )
    });
  }, [vault?.amount]);

  const { handleSubmit, control, setValue, reset, formState } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      amount: '' as any,
    }
  });

  const onSubmit = async (data: TFormValues) => {
    try {
      const result = await updateVaultApi({
        amount: data.amount,
        action: 'withdraw',
      }).unwrap();

      if (result.success) {
        toast.success(result.msg || 'Withdrawal successful.');
        reset();
      }
    } catch (error) {
      // error is handled by useHandleApiError hook
    }
  };

  const handleMaxClick = () => {
    setValue('amount', toFixed(vault?.amount || 0), { shouldValidate: true });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextFieldController
        name="amount"
        control={control}
        label="Amount"
        height={52}
        prepend={<CoinIcon shine />}
        autoComplete="off"
        placeholder="0.00"
        format={(value, prev) => {
          return parseNumber(value, prev, { decimals: 2 });
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

      <Spacer y={28} />

      <Button
        type="submit"
        pressable
        fullWidth
        size="huge"
        loading={formState.isSubmitting}
      >
        Withdraw from Vault
      </Button>
    </form>
  );
};
