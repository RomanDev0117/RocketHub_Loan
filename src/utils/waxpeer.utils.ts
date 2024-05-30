import { TSkinsBackCsGoItem } from '../types/skinsback.types';
import { TWaxpeerItem, WAXPEER_ITEM_EXTERIOR } from '../types/waxpeer.types';

export const getWaxpeerItemPrice = (item: TWaxpeerItem) => {
  return (item?.min / 1000) * 1.6;
};

export const getWaxpeerMinFromPrice = (price: number) => {
  return price / 1.6 * 1000;
};

const exteriors = Object.values(WAXPEER_ITEM_EXTERIOR);

export const getExterior = (item: TWaxpeerItem | TSkinsBackCsGoItem) => {
  const words = (item.name || '').split(' ');
  let exterior = words.pop();


  if (exterior && !exteriors.includes(exterior?.toUpperCase() as WAXPEER_ITEM_EXTERIOR)) {
    words.push(exterior);
    exterior = undefined;
  }

  return {
    name: words.join(' '),
    exterior: exterior as WAXPEER_ITEM_EXTERIOR,
  };
};