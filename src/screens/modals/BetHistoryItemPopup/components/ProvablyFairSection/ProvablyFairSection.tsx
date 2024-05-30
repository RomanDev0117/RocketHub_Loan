import { ProvablyFair } from '@/components/ProvablyFair/ProvablyFair';
import styles from './ProvablyFairSection.module.scss';
import { TextFieldCopyToClipboard } from '@/components/Form/TextFieldCopyToClipboard/TextFieldCopyToClipboard';
import {
  TTextFieldProps,
  TextField,
} from '@/components/Form/TextField/TextField';

export type TProvablyFairSectionProps = {
  items: Array<TProvablyFairItem | TProvablyFairItem[]>;
};

export type TProvablyFairItem = {
  label: string;
  value: string | number;
  canCopy?: boolean;
};

export const ProvablyFairSection = ({ items }: TProvablyFairSectionProps) => {
  return (
    <div className={styles.container}>
      <ProvablyFair />

      {items.map((item, idx) => {
        if (Array.isArray(item)) {
          return (
            <div className={styles.twoFields} key={idx}>
              <ItemField item={item[0]} />
              <ItemField item={item[1]} />
            </div>
          );
        }

        return <ItemField key={idx} item={item} />;
      })}
    </div>
  );
};

const ItemField = ({ item }: { item: TProvablyFairItem }) => {
  const { label, value, canCopy } = item;

  const props: TTextFieldProps = {
    label,
    value: value as string,
    height: 44,
    appearance: 'darkGrey',
    inputProps: {
      className: styles.input,
    },
    readOnly: true,
  };

  if (canCopy) {
    return <TextFieldCopyToClipboard {...props} variant="green" />;
  } else {
    return <TextField {...props} />;
  }
};
