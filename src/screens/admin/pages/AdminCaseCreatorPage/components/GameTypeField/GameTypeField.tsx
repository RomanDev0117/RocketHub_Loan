import { useFormContext } from 'react-hook-form';
import { useCasesOptions } from '../../../../../../hooks/useCasesOptions';
import { Dropdown } from '../../../../../../components/Dropdown/Dropdown';

export const GameTypeField = () => {
  const { watch, setValue } = useFormContext();
  const { gameTypeOptionsOnly } = useCasesOptions();

  const gameType = watch('gameType');

  return (
    <Dropdown
      label="Type"
      options={gameTypeOptionsOnly}
      value={gameType}
      onChange={(t) => setValue('gameType', t)}
    />
  );
};