import { TAdminCaseItem } from '../types/admin.types';
import { TCaseItem, TPlayerUnboxedItemDetails } from '../types/caseTypes';
import { TSkinsBackCsGoItem } from '../types/skinsback.types';
import { TSteamItem } from '../types/steam.types';
import { TWaxpeerItem } from '../types/waxpeer.types';
import {
  isAdminCaseItem,
  isSkinsBackCsGoItem,
  isSteamItem,
  isWaxpeerItem,
} from '../utils/app.utils';
import { getItemColorByPrice } from '../utils/item.utils';
import { getImageUrl, getSteamImageUrl } from '../utils/url.utils';
import { getWaxpeerItemPrice } from '../utils/waxpeer.utils';

type TArgs = {
  item:
  | TPlayerUnboxedItemDetails
  | TCaseItem
  | TSteamItem
  | TWaxpeerItem
  | TSkinsBackCsGoItem
  | TAdminCaseItem
  | null;
};

export const useGameItemData = ({ item }: TArgs) => {
  if (!item) {
    return {
      isWaxpeer: false,
      isSteam: false,
      isSkinsBackCsGoItem: false,
      imageUrl: '',
      color: undefined,
      price: undefined,
      exterior: undefined,
      type: undefined,
      itemName: '',
    };
  }

  const isWaxpeer = isWaxpeerItem(item);
  const isSteam = isSteamItem(item);
  const isSkinsBackCsGo = isSkinsBackCsGoItem(item);
  const isAdminCase = isAdminCaseItem(item);

  const imageUrl = isSteam
    ? getSteamImageUrl(item.image)
    : isWaxpeer
      ? item.img
      : getImageUrl(item.image);

  let price: number;

  if (isWaxpeer) {
    price = getWaxpeerItemPrice(item);
  } else if (isAdminCase) {
    price = item.prices.safe;
  } else {
    price =
      typeof item.price === 'number'
        ? item.price
        : parseFloat(item.price || '0');
  }

  const color = isWaxpeer
    ? item.rarity_color
    : isSteam
      ? getItemColorByPrice(price)
      : isSkinsBackCsGoItem(item) || isAdminCase
        ? item.border_color
        : item.color;

  const exterior = isWaxpeer
    ? item.exterior
    : isSkinsBackCsGo
      ? item.extra.exterior
      : undefined;
  const type = isWaxpeer
    ? item.type
    : isSkinsBackCsGo
      ? item.extra.type
      : undefined;

  const itemName = isAdminCase ? item.market_hash_name : item.name;

  return {
    isWaxpeer,
    isSteam,
    imageUrl,
    color,
    price,
    exterior,
    type,
    itemName,
  };
};
