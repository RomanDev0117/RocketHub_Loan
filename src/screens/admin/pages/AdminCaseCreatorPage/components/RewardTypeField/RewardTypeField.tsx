import { useFormContext } from 'react-hook-form';
import { useCasesOptions } from '../../../../../../hooks/useCasesOptions';
import { Dropdown } from '../../../../../../components/Dropdown/Dropdown';
import { ErrorText } from '../../../../../../components/ErrorText/ErrorText';

export const RewardTypeField = () => {
  const { watch, setValue, formState } = useFormContext();
  const { rewardTypeOptionsOnly } = useCasesOptions();

  const rewardType = watch('rewardType');

  return (
    <div>
      <Dropdown
        label="Type"
        options={rewardTypeOptionsOnly}
        value={rewardType}
        onChange={(t) =>
          setValue('rewardType', t, { shouldDirty: true, shouldValidate: true })
        }
      />
      {formState.errors.rewardType && (
        <ErrorText>{formState.errors.rewardType.message?.toString()}</ErrorText>
      )}
    </div>
  );
};
