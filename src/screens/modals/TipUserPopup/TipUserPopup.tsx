import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldController } from '../../../components/Form/TextField/TextField';
import { Modal } from '../../../components/Modal/Modal';
import styles from './TipUserPopup.module.scss';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { TextTitle1 } from '../../../components/Typography/Typography';
import { CoinIcon } from '../../../components/icons/CoinIcon';
import { parseNumber } from '../../../utils/validation.utils';
import { useLazyGetUserDataBySteamIdQuery } from '../../../store/slices/rockethubApi/user.endpoints';
import { Truncate } from '../../../components/Truncate/Truncate';
import { useTipPopup } from '../../../hooks/useTipPopup';
import { useSelector } from 'react-redux';
import {
  selectTipPopupShow,
  selectTipPopupUser,
} from '../../../store/slices/tipPopup.slice';
import { getLevelColor } from '../../../utils/level.utils';
import { CheckboxController } from '../../../components/Form/Checkbox/Checkbox';
import { useEffect, useMemo, useState } from 'react';
import { TipUserPopupConfirm } from '../TipUserPopup.Confirm/TipUserPopup.Confirm';

type TFormValues = {
  amount: number;
  steamid: string;
  doNotShowTipInChat: boolean | undefined;
};

export const TipUserPopup = () => {
  const { close } = useTipPopup();
  const show = useSelector(selectTipPopupShow);
  const user = useSelector(selectTipPopupUser);
  const nameColor = getLevelColor(user?.level);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [getUser, { data: validationUserData }] =
    useLazyGetUserDataBySteamIdQuery();

  const _user =
    user || (validationUserData?.success ? validationUserData.user : null);

  const schema = useMemo(() => {
    return yup.object({
      doNotShowTipInChat: yup.bool(),
      amount: yup
        .number()
        .typeError('Amount is required')
        .required('Amount is required'),
      steamid: yup
        .string()
        .required('Steam ID is required')
        .test(
          'checkIfUserExist',
          'User with this steam id is missing',
          async (steamId: string) => {
            if (!steamId) {
              return false;
            }

            try {
              const result = await getUser(steamId).unwrap();
              return Boolean(result.success);
            } catch (e) {
              return false;
            }
          }
        ),
    });
  }, []);

  const { handleSubmit, control, watch, reset } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 10,
      steamid: user?.steamid || '',
      doNotShowTipInChat: false,
    },
  });

  useEffect(() => {
    if (show) {
      reset({
        amount: 10,
        steamid: user?.steamid || '',
        doNotShowTipInChat: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reset]);

  const handleFormSubmit = () => {
    setConfirmModalVisible(true);
  };

  const amount = watch('amount');
  const doNotShowTipInChat = watch('doNotShowTipInChat');

  return (
    <>
      <Modal
        show={show && !confirmModalVisible}
        onClose={close}
        className={styles.modal}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <TextTitle1 className={styles.title}>
            Send a Tip{' '}
            {user ? (
              <>
                to <Truncate style={{ color: nameColor }}>{user.name}</Truncate>
              </>
            ) : (
              ''
            )}
          </TextTitle1>

          {!user && (
            <TextFieldController
              name="steamid"
              control={control}
              placeholder="Player Steam ID"
              height={60}
              label="Send to"
            />
          )}

          <TextFieldController
            name="amount"
            control={control}
            placeholder="amount"
            height={60}
            label="Amount"
            prepend={<CoinIcon shine className={styles.coinIcon} />}
            format={(value, prev) => {
              return parseNumber(value, prev, { decimals: 2 });
            }}
          />

          <CheckboxController
            name="doNotShowTipInChat"
            control={control}
            className={styles.policyCheckbox}
            label="Don’t show Tip in chat"
          />

          <Button type="submit" pressable fullWidth size="huge">
            Send Tip
          </Button>
        </form>
      </Modal>
      {_user && (
        <TipUserPopupConfirm
          show={confirmModalVisible}
          onClose={() => {
            setConfirmModalVisible(false);
            close();
          }}
          user={_user}
          amount={amount}
          doNotShowTipInChat={doNotShowTipInChat}
        />
      )}
    </>
  );
};
