import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '../../../components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import styles from './UserDecorationsPopup.module.scss';
import { Title28 } from '@/components/Typography/Typography';
import { Spacer } from '@/components/Spacer/Spacer';
import { UserDecorationsLibrary } from './components/UserDecorationsLibrary/UserDecorationsLibrary';

type TFormValues = {
  amount: number;
};

const DEFAULT_AMOUNT = 10;

export const UserDecorationsPopup = () => {
  const show = true;



  // const [tipRainApi, tipRainResult] = useTipRainMutation();
  // useHandleApiError({
  //   data: tipRainResult.data,
  //   isError: tipRainResult.isError,
  //   error: tipRainResult.error,
  // });

  // const schema = useMemo(() => {
  //   return yup.object({
  //     amount: yup
  //       .number()
  //       .typeError('Amount is required')
  //       .required('Amount is required')
  //       .min(0.01, 'Amount must be greater than 0.01')
  //       .max(1000, 'Amount must be less than 1000'),
  //   });
  // }, []);

  const { handleSubmit, control, reset, formState } = useForm<TFormValues>({
    mode: 'onChange',
    // resolver: yupResolver(schema),
    defaultValues: {

    },
  });

  useEffect(() => {
    if (show) {
      reset({ amount: DEFAULT_AMOUNT });
    }
  }, [show, reset]);

  const handleFormSubmit = async (values: TFormValues) => {
    try {
      throw new Error('Not implemented yet');
    } catch (error) {
      // error is handled by error hook
    }

  };

  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          return;
        }}
        className={styles.modal}
      >
        <Title28>User Decorations</Title28>

        <Spacer y={20} />

        <UserDecorationsLibrary />

      </Modal>
    </>
  );
};
