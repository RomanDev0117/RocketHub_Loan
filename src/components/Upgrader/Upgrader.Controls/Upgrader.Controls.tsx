import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { UpgraderControlsDisplay } from '../Upgrader.Controls.Display/Upgrader.Controls.Display';
import { UpgraderControlsFooter } from '../Upgrader.Controls.Footer/Upgrader.Controls.Footer';
import styles from './Upgrader.Controls.module.scss';
import { memo, useEffect, useMemo } from 'react';
import { UpgradeControlsChanceSelection } from '../Upgrade.Controls.ChanceSelection/Upgrade.Controls.ChanceSelection';
import { useUpgradeMutation } from '../../../store/slices/rockethubApi/upgrader.endpoints';
import {
  selectUpgraderRollType,
  selectUpgraderSelectedItems,
  upgraderActions,
} from '../../../store/slices/upgrader.slice';
import { getAppState } from '../../../store';
import { useLoginPopup } from '../../../hooks/useLoginPopup';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../store/slices/userSlice';
import toast from 'react-hot-toast';
import {
  calculateBetAmount,
  calculateChanceFromBetAmount,
  calculateValidationBetAmount,
  getItemsTotalPrice,
  normalizeBetAmount,
} from '../upgrader.utils';
import {
  UPGRADER_ANIMATION_DURATION_MS,
  UPGRADER_MAX_CHANCE,
  UPGRADER_MAX_ITEMS_PRICE,
  UPGRADER_MIN_BET,
  UPGRADER_MIN_CHANCE,
  UPGRADER_MIN_ITEMS_TOTAL_PRICE,
  UPGRADER_TICKETS_AMOUNT,
} from '../../../constants';
import { getWaxpeerItemPrice } from '../../../utils/waxpeer.utils';
import { isWaxpeerItem, wait } from '../../../utils/app.utils';
import { isEmpty } from 'lodash';
import { formatCoins } from '../../../utils/number.utils';
import clsx from 'clsx';

type TFormValues = {
  chance: number;
  rotate: number;
  betAmount: number;
  win: boolean | null | undefined; // false when loose, true when win, null when not yet decided
  winTicket: number | null | undefined;
};

type TProps = {
  isModal?: boolean;
  className?: string;
};

export const UpgraderControls = ({ className, isModal }: TProps) => {
  const dispatch = useDispatch();
  const [upgradeApi] = useUpgradeMutation();
  const loginPopup = useLoginPopup();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedItems = useSelector(selectUpgraderSelectedItems);

  const schema = useMemo(() => {
    const minMaxChanceError = `Min: ${UPGRADER_MIN_CHANCE}, max: ${UPGRADER_MAX_CHANCE}`;
    const minMaxBet = calculateValidationBetAmount();
    const minMaxBetError = `Min: ${formatCoins(
      minMaxBet.min
    )}, max: ${formatCoins(minMaxBet.max)}`;

    return yup.object({
      chance: yup
        .number()
        .typeError(minMaxChanceError)
        .min(UPGRADER_MIN_CHANCE, minMaxChanceError)
        .max(UPGRADER_MAX_CHANCE, minMaxChanceError)
        .required(minMaxChanceError),
      rotate: yup.number().required(), // how much do we want to rotate the arrow
      betAmount: yup
        .number()
        .typeError(minMaxBetError)

        .test('minItemsTotalPrice', (_, context) => {
          const items = selectUpgraderSelectedItems(getAppState());
          const totalPrice = getItemsTotalPrice(items);

          // if (totalPrice < UPGRADER_MIN_ITEMS_TOTAL_PRICE) {
          //   return context.createError({
          //     message: `Min items total price is ${UPGRADER_MIN_ITEMS_TOTAL_PRICE}`,
          //   });
          // }

          if (totalPrice > UPGRADER_MAX_ITEMS_PRICE) {
            return context.createError({
              message: `Max items total price can not exceed ${UPGRADER_MAX_ITEMS_PRICE}`,
            });
          }

          return true;
        })
        .min(minMaxBet.min, minMaxBetError)
        .max(minMaxBet.max, minMaxBetError)
        .required(minMaxBetError),
      win: yup.boolean().nullable(),
      winTicket: yup.number().nullable(),
    });
  }, [selectedItems]);

  const formMethods = useForm<TFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      chance: 10,
      rotate: 0,
      betAmount: UPGRADER_MIN_BET,
      win: null,
      winTicket: null,
    },
  });
  const onSubmit = async ({ rotate, betAmount }: TFormValues) => {
    if (!isLoggedIn) {
      loginPopup.open();
      return;
    }

    const items = selectUpgraderSelectedItems(getAppState());

    if (isEmpty(items)) {
      toast.error('Please select items to upgrade');
      return;
    }

    const totalPrice = getItemsTotalPrice(items);
    if (totalPrice < UPGRADER_MIN_ITEMS_TOTAL_PRICE) {
      toast.error(
        `Min price for all selected items is ${formatCoins(
          UPGRADER_MIN_ITEMS_TOTAL_PRICE
        )}`
      );
      return;
    }

    formMethods.setValue('win', null);
    formMethods.setValue('winTicket', null);
    const rotateToFullCircle = 360 - (rotate % 360);
    const threeCircles = 360 * 3;
    let nextRotate = rotateToFullCircle + rotate + threeCircles;

    const rollType = selectUpgraderRollType(getAppState());
    const itemsWithPrice = items.map((item) => {
      return isWaxpeerItem(item)
        ? {
          itemData: item,
          price: getWaxpeerItemPrice(item),
        }
        : {
          price: item.price,
          itemData: item,
        };
    });

    try {
      dispatch(upgraderActions.setIsRotating(true));
      const result = await upgradeApi({
        roll: rollType,
        betAmount,
        items: itemsWithPrice,
      }).unwrap();

      if ((result as any).error?.error) {
        toast.error('Error happened while upgrading. Please try again');
        return;
      }

      if (result.success) {
        const percentage = result.result / UPGRADER_TICKETS_AMOUNT;
        const deltaRotate = percentage * 360;
        nextRotate += deltaRotate;
        formMethods.setValue('rotate', nextRotate);

        await wait(UPGRADER_ANIMATION_DURATION_MS);

        formMethods.setValue('win', result.win);
        formMethods.setValue('winTicket', result.result);
      }
    } catch (error: any) {
      const message: string =
        error?.data?.error ||
        'Error happened while upgrading. Please try again';
      toast.error(message);
    }

    dispatch(upgraderActions.setIsRotating(false));
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={clsx(styles.container, className, {
          [styles.isModal]: isModal,
        })}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.containerInner}>
          <UpgraderControlsDisplay isModal={isModal} />
          <div>
            <UpgradeControlsChanceSelection />
            <UpgraderControlsFooter
              isModal={isModal}
              onSubmit={formMethods.handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>

      <RecalculateBetAmountAfterItemsChange />
      <DisableWinAfterStateChange />
    </FormProvider>
  );
};

const RecalculateBetAmountAfterItemsChange = memo(() => {
  const { watch, setValue } = useFormContext();
  const selectedItems = useSelector(selectUpgraderSelectedItems);

  const chance = watch('chance', 0);
  // const betAmount = watch('betAmount', 0);

  useEffect(() => {
    if (!isEmpty(selectedItems)) {
      let betAmount = calculateBetAmount(chance as number);
      betAmount = normalizeBetAmount(betAmount);

      const newChance = calculateChanceFromBetAmount(betAmount); // recalculate chance
      setValue('betAmount', betAmount, { shouldValidate: true });
      setValue('chance', newChance, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return null;
});

const DisableWinAfterStateChange = memo(() => {
  const { watch, setValue } = useFormContext();
  const selectedItems = useSelector(selectUpgraderSelectedItems);
  const rolltype = useSelector(selectUpgraderRollType);
  const { chance, rotate, betAmount, win } = watch();

  useEffect(() => {
    if (typeof win === 'boolean') {
      setValue('win', null);
      setValue('winTicket', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chance, rotate, betAmount, rolltype, selectedItems]);

  return null;
});
