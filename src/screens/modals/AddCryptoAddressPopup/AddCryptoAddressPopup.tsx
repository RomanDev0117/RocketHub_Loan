import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { TextTitle1 } from '../../../components/Typography/Typography';
import styles from './AddCryptoAddressPopup.module.scss';
import { useForm } from 'react-hook-form';
import { CRYPTO_CURRENCY } from '../../../types/payment.types';
import { TextFieldController } from '../../../components/Form/TextField/TextField';
import { Button } from '../../../components/Button/Button';
import { useCryptoDropdown } from '../../../hooks/useCryptoDropdown';
import { Dropdown } from '../../../components/Dropdown/Dropdown';
import {
  useAddUserCryptoAddressMutation,
  useGetUserCryptoAddressListQuery,
} from '../../../store/slices/rockethubApi/crypto.endpoints';
import toast from 'react-hot-toast';

type TProps = {
  open: boolean;
  defaultCrypto: CRYPTO_CURRENCY;
  defaultAddress: string;
  onClose: () => void;
  onSuccess: (name: string, type: CRYPTO_CURRENCY) => void;
};

type FormValues = {
  name: string;
  crypto: CRYPTO_CURRENCY;
  address: string;
};

export const AddCryptoAddressPopup = ({
  defaultCrypto,
  defaultAddress,
  open,
  onClose,
  onSuccess,
}: TProps) => {
  const { data: wallets } = useGetUserCryptoAddressListQuery();
  const [addCryptoAddressApi] = useAddUserCryptoAddressMutation();

  const schema = useMemo(() => {
    return yup.object({
      name: yup
        .string()
        .required('Name is required')
        .test('checkIfUnique', 'Name already exists', (value) => {
          const exists = (wallets?.data?.addresses || []).some(
            (wallet) => wallet.label === value
          );
          return !exists;
        }),
      crypto: yup.string<CRYPTO_CURRENCY>().required(),
      address: yup.string().required('Address is required'),
    });
  }, [wallets]);

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
    control,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      crypto: defaultCrypto,
      address: defaultAddress || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: '',
        crypto: defaultCrypto,
        address: defaultAddress || '',
      });
    }
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await addCryptoAddressApi({
        type: values.crypto,
        label: values.name,
        address: values.address,
      }).unwrap();

      if (result.success) {
        onClose();
        onSuccess(values.name, values.crypto);
        toast.success('Address added successfully');
      }
    } catch (error: any) {
      const message: string = error?.data?.msg || 'Unexpected error happened';
      toast.error(message);
    }
  };

  const selected = watch('crypto');
  const { options } = useCryptoDropdown({ selected: selected, method: 'withdraw' });

  return (
    <Modal show={open} onClose={onClose} className={styles.modal}>
      <TextTitle1 style={{ justifyContent: 'center' }} mb={56}>
        Add a new address
      </TextTitle1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldController
          name="name"
          control={control}
          placeholder="Enter your address name"
          height={60}
          label="Address name"
          appearance="lightGrey"
        />

        <Dropdown
          label="Select cryptocurrency"
          options={options}
          value={selected}
          labelContainerClassName={styles.dropdownLabel}
          placeholderProps={{
            className: styles.dropdown,
          }}
          height={60}
          placeholderTextClassName={styles.placeholderText}
          zIndex={2000}
          onChange={(s) => {
            if (s !== selected) {
              setValue('crypto', s);
            }
          }}
        />

        <div>
          <TextFieldController
            appearance="lightGrey"
            name="address"
            control={control}
            placeholder="Enter your address"
            height={60}
            label="Your address"
          />
          <p className={styles.warningText}>
            Always double-check the address you enter. We cannot recover funds
            sent to the wrong address.
          </p>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          pressable
          fullWidth
          size="huge"
          loading={isSubmitting}
        >
          Save address
        </Button>
      </form>
    </Modal>
  );
};
