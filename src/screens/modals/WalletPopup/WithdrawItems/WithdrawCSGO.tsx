import { SteamPaginationInventory } from '../SteamInventory/SteamPaginationInventory';
import { WithdrawCSGOLoader } from './WithdrawCSGOLoader';
import { useWithdrawCSGO } from './useWithdrawCSGO';

export const WithdrawCSGO = () => {

  const { handleSubmit, submitting } = useWithdrawCSGO();

  return (
    <>
      <WithdrawCSGOLoader
        loading={submitting}
      />
      <SteamPaginationInventory
        error={undefined}
        type="withdraw"
        onSubmit={handleSubmit}
      />
    </>
  );
};
