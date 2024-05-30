export type TWaxpeerItem = {
  count: number;
  id: string;
  img: string;
  min: number;
  name: string;
  rarity_color: string;
  steam_price: number;
  type: string;
  updated_at: number;
  amount: number; // this property is only for typescript
  exterior?: WAXPEER_ITEM_EXTERIOR | undefined;
};

export enum WAXPEER_ITEM_EXTERIOR {
  FACTORY_NEW = 'FN',
  MINIMAL_WEAR = 'MW',
  WELL_WORN = 'WW',
  BATTLE_SCARRED = 'BS',
  FIELD_TESTED = 'FT',
}
