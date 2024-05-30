import Loader from '../../../../components/Loader/Loader';
import { STEAM_APP_ID } from '../../../../constants';
import { useGetSteamItemsQuery } from '../../../../store/slices/steamItemsSlice';
import { SteamInventory } from '../SteamInventory/SteamInventory';
import { TradeOfferModal } from '../WithdrawItems/TradeOfferModal';
import { useWithdrawRust } from '../WithdrawItems/useWithdrawRust';

export const DepositRustItems = () => {
  const { currentData, isFetching, error, isSuccess } = useGetSteamItemsQuery({
    appId: STEAM_APP_ID,
    forceNew: false,
    isBot: false,
  });

  // TODO: rename withdraw rust
  const { clearResult, handleSubmit, result, submitting } = useWithdrawRust({
    appId: STEAM_APP_ID,
    type: 'deposit',
  });

  // currentData = { 'success': true, 'items': [], 'msg': '', 'minValue': 0 };
  return (
    <>
      <Loader loading={submitting} position="absolute" zIndex={100} backdrop />
      <SteamInventory
        itemsList={currentData?.items}
        error={error}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="deposit"
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

// const mockData = [
//   {
//     'addedPricePercentage': 0,
//     'amount': 1,
//     'appId': '252490',
//     'assetId': '3087701287418293744',
//     'classId': '1150043638',
//     'color': '',
//     'id': 'ae6c852d-9956-4653-922f-f4dc6d8f1c97',
//     'image': 'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GDHfDY0jhyo8DEiv5daPqg8q7w0RfC9VlEhwOE',
//     'instanceId': '0',
//     'isForSale': false,
//     'name': 'Tan Boots',
//     'nametag': '',
//     'owner': '76561197980435117',
//     'salePrice': 0,
//     'stickers': [],
//     'tradableAfter': 0,
//     'price': 0.06,
//     'fee': 0.05
//   },
//   {
//     'addedPricePercentage': 0,
//     'amount': 1,
//     'appId': '252490',
//     'assetId': '2036125825793919509',
//     'classId': '1129415388',
//     'color': '',
//     'id': '1ec65001-facd-4985-aad3-678de1ee289c',
//     'image': 'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GLDfDY0jhyo8DEiv5dROq8-q7c2Qv7B0EpJxA',
//     'instanceId': '0',
//     'isForSale': false,
//     'name': 'Orange Longsleeve T-Shirt',
//     'nametag': '',
//     'owner': '76561197980435117',
//     'salePrice': 0,
//     'stickers': [],
//     'tradableAfter': 0,
//     'price': 0.06,
//     'fee': 0.05
//   },
//   {
//     'addedPricePercentage': 0,
//     'amount': 1,
//     'appId': '252490',
//     'assetId': '1948269215514249068',
//     'classId': '1368124330',
//     'color': '',
//     'id': '36bfc436-0399-4c12-93f8-035da2aeac81',
//     'image': 'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5GvEfDY0jhyo8DEiv5ddOag8qL02QPu8RhB_c8E',
//     'instanceId': '0',
//     'isForSale': false,
//     'name': 'Large Banner Hanging',
//     'nametag': '',
//     'owner': '76561197980435117',
//     'salePrice': 0,
//     'stickers': [],
//     'tradableAfter': 0,
//     'price': 0.2025,
//     'fee': 0.05
//   }
// ];
