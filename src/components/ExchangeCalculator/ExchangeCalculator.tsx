import { FieldError, useController } from 'react-hook-form';
import { toFixed } from '../../utils/number.utils';
import { Badge } from '../Badge/Badge';
import { TTextFieldProps, TextField } from '../Form/TextField/TextField';
import styles from './ExchangeCalculator.module.scss';

type TExchangeCalculatorProps = {
  data: [TDataItem, TDataItem];
  onChange?: (values: Record<string, number>) => void;
  exchangeRate?: number;
  textFieldProps?: Partial<TTextFieldProps>;
  errors?: Record<string, FieldError | undefined>;
};

type TDataItem = {
  name: string;
  value: number;
  height?: number;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  quickActions?: number[];
  bonus?: string;
  decimals?: number;
  textFieldProps?: Partial<TTextFieldProps>;
};

export const ExchangeCalculator = ({
  data,
  onChange,
  exchangeRate,
  textFieldProps,
  errors,
}: TExchangeCalculatorProps) => {
  const input1 = data[0];
  const input2 = data[1];

  const handleInput1Change = (value: number) => {
    if (!exchangeRate) return;
    onChange?.({
      [input1.name]: value,
      [input2.name]: toFixed((value / exchangeRate), input2.decimals) || ('' as any),
    });
  };

  const handleInput2Chagne = (value: number) => {
    if (!exchangeRate) return;

    onChange?.({
      [input1.name]: toFixed(exchangeRate * value, input1.decimals) || ('' as any),
      [input2.name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <div className={styles.label}>{input1.label}</div>
        <span className={styles.equalSignPlaceholder}></span>
        <div className={styles.label}>{input2.label}</div>
      </div>
      <div className={styles.inputsContainer}>
        <TextField
          {...textFieldProps}
          value={`${input1.value}`}
          type="number"
          height={input1.height || 44}
          fullWidth
          fontStyle="light"
          onChange={() => { }}
          prepend={input1.icon}
          hasError={Boolean(errors?.[input1.name])}
          error={errors?.[input1.name]}
          inputProps={{
            disabled: !exchangeRate,
            decimalScale: input1.decimals || 2,
            onValueChange: (values, sourceInfo) => {
              if (sourceInfo.source === ('event' as any)) {
                handleInput1Change(values.floatValue!);
              }
            },
          }}
          {...input1.textFieldProps as any}
        />

        <span className={styles.equalSign}>≈</span>
        <TextField
          {...textFieldProps}
          value={`${input2.value}`}
          type="number"
          fullWidth
          height={input2.height || 44}
          fontStyle="light"
          className={styles.input}
          prepend={input2.icon}
          // onChange={handleCryptoChange}
          hasError={Boolean(errors?.[input2.name])}
          error={errors?.[input2.name]}
          onChange={() => { }}
          inputProps={{
            disabled: !exchangeRate,
            decimalScale: input2.decimals || 2,
            onValueChange: (values, sourceInfo) => {
              if (sourceInfo.source === ('event' as any)) {
                handleInput2Chagne(values.floatValue!);
              }
            },
          }}
          {...input2.textFieldProps as any}
        />
      </div>
      {(input1.quickActions || input2.bonus) && <div className={styles.footer}>
        {input1.quickActions && (
          <div className={styles.footerColumn}>
            {input1.quickActions?.map((value) => {
              return (
                <button
                  key={value}
                  onClick={() => handleInput1Change(value)}
                  type="button"
                  className={styles.quickAction}
                >
                  ${value}
                </button>
              );
            })}
          </div>
        )}

        <span className={styles.equalSignPlaceholder}></span>

        <div className={styles.footerColumn}>
          <Badge color="success" height={26} className={styles.badge} >
            {input2.bonus}
          </Badge>
        </div>
      </div>
      }
    </div>
  );
};

type TDataItemController = Omit<TDataItem, 'value'>;
export type TExchangeCalculatorControllerProps = {
  control: any;
  name: string;
  data: [TDataItemController, TDataItemController];
} & Omit<TExchangeCalculatorProps, 'data'>;

// react-hook-form wrapper for the field
export const ExchangeCalculatorController = ({
  control,
  name,
  data,
  ...rest
}: TExchangeCalculatorControllerProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // const hasError = Boolean(error?.message);

  return (
    <ExchangeCalculator
      {...rest}
      data={[
        { ...data[0], value: value[data[0].name] },
        { ...data[1], value: value[data[1].name] },
      ]}
      onChange={(data) => onChange(data)}
      errors={error as any}
    />
  );
};
