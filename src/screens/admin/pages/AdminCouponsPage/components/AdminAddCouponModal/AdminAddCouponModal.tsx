import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@/components/Modal/Modal';
import { useMemo } from 'react';
import {
  useCreateCouponMutation,
  useGetCouponsQuery,
} from '@/store/slices/rockethubApi/admin.endpoints';
import { Button } from '@/components/Button/Button';
import { Spacer } from '@/components/Spacer/Spacer';
import { TextFieldController } from '@/components/Form/TextField/TextField';
import { CoinIcon } from '@/components/icons/CoinIcon';
import { parseNumber } from '@/utils/validation.utils';
import { Title28 } from '@/components/Typography/Typography';
import { useHandleApiError } from '@/hooks/useHandleApiError';

type TProps = {
  show: boolean;
  onClose: () => void;
};

type TFormValues = {
  code: string;
  rewardAmount: number;
  uses: number;
};

export const AdminAddCouponModal = ({ show, onClose }: TProps) => {
  const { data } = useGetCouponsQuery();
  const [createCouponApi, { data: createApiData, error, isError }] =
    useCreateCouponMutation();
  useHandleApiError({ error, isError, data: createApiData as any });

  const schema = useMemo(() => {
    const coupons = data?.success ? data.coupons : [];

    return yup.object({
      code: yup
        .string()
        .required('Code is missing')
        .test('code', 'Code already exists', (code) => {
          return !coupons.some(
            (c) => c.code.toLowerCase() === code.toLowerCase()
          );
        })
        .test('not empty', 'Code is missing', (code) => {
          return code.trim().length > 0;
        }),
      rewardAmount: yup
        .number()
        .typeError('Reward amount is missing')
        .required('Reward amount is missing')
        .min(0.01)
        .max(100000),
      uses: yup
        .number()
        .typeError('Uses is missing')
        .required('Uses is missing')
        .min(1)
        .max(100000),
    });
  }, [data]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      code: '',
      rewardAmount: 0,
      uses: 1,
    },
  });

  const onSubmit = async (values: TFormValues) => {
    try {
      const result = await createCouponApi(values).unwrap();

      if (result?.success) {
        onClose();
        reset();
      }
    } catch (e) {
      // errors are handled by the hook
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title28>New coupon</Title28>

        <Spacer y={20} />

        <TextFieldController
          name="code"
          control={control}
          placeholder="Code"
          label="Code"
          height={52}
        />

        <Spacer y={20} />

        <TextFieldController
          name="rewardAmount"
          control={control}
          placeholder="Reward amount"
          label="Reward amount"
          height={52}
          prepend={<CoinIcon shine />}
          format={(value, prev) => {
            return parseNumber(value, prev, { decimals: 2 });
          }}
        />

        <Spacer y={20} />

        <TextFieldController
          name="uses"
          control={control}
          placeholder="Uses"
          label="Uses"
          height={52}
          format={(value, prev) => {
            return parseNumber(value, prev, { decimals: 0 });
          }}
        />

        <Spacer y={33} />

        <Button
          pressable
          fullWidth
          type="submit"
          loading={isSubmitting}
          size="l"
        >
          Add coupon
        </Button>
      </form>
    </Modal>
  );
};
