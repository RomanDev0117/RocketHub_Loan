import Loader from '../../../../components/Loader/Loader';
import { STEAM_APP_ID } from '../../../../constants';
import { useGetSteamItemsQuery } from '../../../../store/slices/steamItemsSlice';
import { SteamInventory } from '../SteamInventory/SteamInventory';
import { TradeOfferModal } from './TradeOfferModal';
import { useWithdrawRust } from './useWithdrawRust';

export const WithdrawRust = () => {
  const { currentData, isFetching, error } = useGetSteamItemsQuery({
    appId: STEAM_APP_ID,
    forceNew: false,
    isBot: true,
  });

  const { clearResult, handleSubmit, result, submitting } = useWithdrawRust({
    appId: STEAM_APP_ID,
    type: 'withdraw',
  });

  return (
    <>
      <Loader
        loading={submitting}
        position="absolute"
        zIndex={100}
        backdrop
      />
      <SteamInventory
        itemsList={currentData?.items}
        error={error}
        isFetching={isFetching}
        type="withdraw"
        onSubmit={handleSubmit}
      />
      <TradeOfferModal
        show={Boolean(result)}
        onClose={() => clearResult()}
        result={result}
        type="withdraw"
      />
    </>
  );
};
