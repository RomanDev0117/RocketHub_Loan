import { useFormContext } from 'react-hook-form';
import { TextFieldController } from '../../Form/TextField/TextField';
import styles from './Upgrade.Controls.ChanceSelection.module.scss';
import { CoinIcon } from '../../icons/CoinIcon';
import { Button } from '../../Button/Button';
import clsx from 'clsx';
import {
  calculateBetAmount,
  calculateChanceFromBetAmount,
  calculateValidationBetAmount,
  getMinMaxPercentageBasedOnTotalPrice,
} from '../upgrader.utils';
import {
  UPGRADER_MAX_BET_AMOUNT,
  UPGRADER_MAX_CHANCE,
  UPGRADER_MIN_BET,
} from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUpgraderSelectedItems } from '../../../store/slices/upgrader.slice';
import { parseNumber } from '../../../utils/validation.utils';
import { isEmpty } from 'lodash';
import { getAppState } from '../../../store';
import { toFixed } from '../../../utils/number.utils';
import { RangeSlider } from '../../RangeSlider/RangeSlider';
import { useCallback, useMemo } from 'react';
import { useLatest } from 'react-use';
import { selectUserBalance } from '../../../store/slices/userSlice';

export const UpgradeControlsChanceSelection = () => {
  const { control, watch, setValue, formState } = useFormContext();
  const currentChance = parseFloat(watch('chance', 0) as string);
  const currentBetAmount = watch('betAmount', '');
  const selectedItems = useSelector(selectUpgraderSelectedItems); // we need it to correctly calculate chancePerMaxBetAmount;
  const userBalance = useSelector(selectUserBalance);

  const sliderValueChanged = useCallback(
    (val: number) => {
      setValue('chance', val, { shouldValidate: true });

      if (isEmpty(selectedItems)) {
        return;
      }

      const betAmount = calculateBetAmount(val);
      setValue('betAmount', betAmount, { shouldValidate: true });
    },
    [setValue, selectedItems]
  );

  const { min: minChance, max: maxChance } = useMemo(() => {
    return getMinMaxPercentageBasedOnTotalPrice(selectedItems);
  }, [selectedItems, userBalance]);

  const latestChance = useLatest(currentChance);
  const sliderProps = useMemo(() => {


    return {
      min: minChance,
      max: maxChance,
      value: currentChance,
      step: 0.01,
      onChange: (value: number) => sliderValueChanged(value),
      onAfterChange: () => {
        if (isEmpty(selectedItems)) {
          return;
        }

        // on blur normalize values
        const betAmount = calculateBetAmount(latestChance.current);
        const chance = calculateChanceFromBetAmount(betAmount);
        setValue('betAmount', betAmount, { shouldValidate: true });
        setValue('chance', chance, { shouldValidate: true });
      },
    };
  }, [sliderValueChanged, minChance, maxChance, currentChance, selectedItems, userBalance]);

  const betAmountMinMax = useMemo(() => {
    return calculateValidationBetAmount();
  }, [selectedItems, userBalance]);

  return (
    <div className={styles.container}>
      <div className={styles.fieldsContainer}>
        <TextFieldController
          name="betAmount"
          control={control}
          placeholder="Bet amount"
          label="Bet amount"
          inputProps={{
            className: styles.textInput,
          }}
          readOnly={formState.isSubmitting}
          fullWidth
          maxLength={6}
          prepend={<CoinIcon shine />}
          customOnChange
          onChange={(e) => {
            const items = selectUpgraderSelectedItems(getAppState());
            // if (isEmpty(items)) {
            //   setError('betAmount', { message: 'Please select items first' });
            //   return;
            // }

            const betAmount = parseNumber(
              e.target.value,
              currentBetAmount as string,
              { decimals: 2, max: betAmountMinMax.max }
            );
            setValue('betAmount', betAmount, { shouldValidate: true });
            const betAmountFloat = parseFloat(betAmount);

            if (!isEmpty(items)) {
              const chance =
                calculateChanceFromBetAmount(betAmountFloat).toFixed(2);
              setValue('chance', chance, { shouldValidate: true });
            }
          }}
        />
        <TextFieldController
          name="chance"
          control={control}
          placeholder="Chance"
          customOnChange
          readOnly={formState.isSubmitting}
          inputProps={{
            className: styles.textInput,
          }}
          maxLength={6}
          label="Chance"
          fullWidth
          suffix="%"
          onBlur={() => {
            const items = selectUpgraderSelectedItems(getAppState());
            if (isEmpty(items)) {
              return;
            }

            const chance = calculateChanceFromBetAmount(
              parseFloat(currentBetAmount as string)
            ).toFixed(2);

            setValue('chance', chance, { shouldValidate: true });
          }}
          onChange={(e) => {
            const items = selectUpgraderSelectedItems(getAppState());
            // if (isEmpty(items)) {
            //   setError('betAmount', { message: 'Please select items first' });
            //   return;
            // }

            const chance = parseNumber(
              e.target.value,
              `${currentChance || ''}`,
              { decimals: 2, max: maxChance }
            );
            setValue('chance', chance, { shouldValidate: true });

            if (!isEmpty(items)) {
              const chanceFloat = parseFloat(chance);
              const betAmount = Math.max(
                calculateBetAmount(chanceFloat),
                UPGRADER_MIN_BET
              );
              setValue('betAmount', betAmount, { shouldValidate: true });
            }
          }}
        />
      </div>

      <RangeSlider
        {...(sliderProps as any)}
        className={styles.slider}
        disabled={formState.isSubmitting}
      />

      <div className={styles.buttons}>
        {[10, 25, 50, 'max'].map((chance) => {
          let chanceNumber =
            chance === 'min'
              ? UPGRADER_MIN_BET
              : chance === 'max'
                ? // ? Math.min(UPGRADER_MAX_CHANCE, chancePerMaxBetAmount)
                UPGRADER_MAX_CHANCE
                : parseFloat(chance as string);

          if (chanceNumber > maxChance) {
            chanceNumber = maxChance;
          }

          return (
            <Button
              key={chance}
              disabled={formState.isSubmitting}
              color="secondary"
              className={clsx(styles.button, {
                // [styles.active]: currentChance === chanceNumber,
              })}
              onClick={() => {
                if (isEmpty(selectedItems)) {
                  setValue('chance', chanceNumber, { shouldValidate: true });
                  return;
                }


                // this is bet amount based on the chance
                let betAmount = calculateBetAmount(chanceNumber);
                if (betAmount > UPGRADER_MIN_BET) {
                  betAmount = Math.min(betAmount, UPGRADER_MAX_BET_AMOUNT);
                } else {
                  betAmount = UPGRADER_MIN_BET;
                }

                // calculate chance from bet amount as it can be different than initial chance -> for example if user clicks 10% chance of 0.1$ it'll calculate 0.01 bet amount which is 6.75 chance
                const actualChance = toFixed(
                  calculateChanceFromBetAmount(betAmount)
                );

                setValue('chance', actualChance, { shouldValidate: true });
                setValue('betAmount', betAmount, { shouldValidate: true });
              }}
            >
              {chance}
              {typeof chance === 'number' ? '%' : ''}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
