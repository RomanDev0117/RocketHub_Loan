import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldController } from '../../../components/Form/TextField/TextField';
import { Modal } from '../../../components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { CoinIcon } from '../../../components/icons/CoinIcon';
import { parseNumber } from '../../../utils/validation.utils';
import { useEffect, useMemo } from 'react';
import styles from './RainTipPopup.module.scss';
import { Title28 } from '@/components/Typography/Typography';
import { Spacer } from '@/components/Spacer/Spacer';
import { useTipRainMutation } from '@/store/slices/rockethubApi/rain.endpoints';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectRainTipPopupShow } from '@/store/slices/rainTipPopup.slice';
import { closeRainTipPopup } from '@/store/actions/appActions';

type TFormValues = {
  amount: number;
};

const DEFAULT_AMOUNT = 10;

export const RainTipPopup = () => {
  const show = useSelector(selectRainTipPopupShow);
  const [tipRainApi, tipRainResult] = useTipRainMutation();
  useHandleApiError({
    data: tipRainResult.data,
    isError: tipRainResult.isError,
    error: tipRainResult.error,
  });

  const schema = useMemo(() => {
    return yup.object({
      amount: yup
        .number()
        .typeError('Amount is required')
        .required('Amount is required')
        .min(0.01, 'Amount must be greater than 0.01')
        .max(1000, 'Amount must be less than 1000'),
    });
  }, []);

  const { handleSubmit, control, reset, formState } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      amount: DEFAULT_AMOUNT,
    },
  });

  useEffect(() => {
    if (show) {
      reset({ amount: DEFAULT_AMOUNT });
    }
  }, [show, reset]);

  const handleFormSubmit = async (values: TFormValues) => {
    try {
      const result = await tipRainApi(values.amount).unwrap();

      if (result?.success) {
        toast.success('Tip rain success');
        closeRainTipPopup();
      }
    } catch (error) {
      // error is handled by error hook
    }

  };

  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          closeRainTipPopup();
        }}
        className={styles.modal}
      >
        <Title28>Tip rain</Title28>

        <Spacer y={20} />

        <p className={styles.text}>
          Add coins to the public rain pool. It will be added on top of
          everyone’s rewards.
        </p>

        <Spacer y={40} />

        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <TextFieldController
            name="amount"
            control={control}
            placeholder="amount"
            height={60}
            label="Tip amount"
            // appearance='default'
            
            labelContainerClassName={styles.label}
            prepend={<CoinIcon shine className={styles.coinIcon} />}
            format={(value, prev) => {
              return parseNumber(value, prev, { decimals: 2 });
            }}
          />

          <Spacer y={20} />

          <Button
            type="submit"
            pressable
            fullWidth
            size="huge"
            loading={formState.isLoading}
          >
            Tip rain
          </Button>
        </form>
      </Modal>
    </>
  );
};
