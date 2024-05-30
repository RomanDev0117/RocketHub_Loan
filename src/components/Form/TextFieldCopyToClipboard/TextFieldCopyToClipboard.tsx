import { toast } from 'react-hot-toast';
import useTranslation from '../../../hooks/useTranslation';
import { TTextFieldProps, TextField } from '../TextField/TextField';
import { CopyIcon } from '../../icons/CopyIcon';
import { useCopyToClipboard } from 'react-use';
import styles from './TextFieldCopyToClipboard.module.scss';
import { CopyIconGreen } from '@/components/icons/CopyIconGreen';

type TProps = {
  copySuccessText?: string;
  Component?: any;
  control?: any;
  variant?: 'green' | 'normal';
} & Omit<TTextFieldProps, 'variant'>;

export const TextFieldCopyToClipboard = ({
  copySuccessText,
  Component,
  valuePrefix,
  variant,
  ...rest
}: TProps) => {
  const { t } = useTranslation();
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopyClick = () => {
    const valueToccopy = valuePrefix
      ? `${valuePrefix}${rest.value}`
      : rest.value;
    copyToClipboard(valueToccopy);
    const message =
      copySuccessText ||
      t({
        id: 'common.CopiedToClipboard',
        defaultMessage: 'Copied to clipboard!',
      });

    toast.success(message);
  };

  const C = Component || TextField;

  return (
    <C
      {...rest}
      valuePrefix={valuePrefix}
      append={
        variant === 'green' ? (
          <CopyIconGreen
            className={styles.copyIconGreen}
            onClick={handleCopyClick}
          />
        ) : (
          <CopyIcon className={styles.copyIcon} onClick={handleCopyClick} />
        )
      }
    />
  );
};
