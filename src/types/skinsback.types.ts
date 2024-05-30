
export type TSkinsBackCsGoItem = {
  id: string;
  appId: number;
  assetid: string;
  border_color: string;
  classid: string;
  extra: {
    exterior: string;
    quality: string; // TODO: enum
    rarity: string; // TODO: enum
    sticker_collection: string;
    type: string; // TODO: enum
  };
  image: string;
  instanceid: string;
  link: string;
  name: string;
  price: number;
  steamid: string;
  stickers: any[];

  // added on frontend side 
  amount: number; // this propery will not be always availble
};

export type TSkinsBackCsGoResponse = {
  data: TSkinsBackCsGoItem[];
  total: number;
  page: number;
  per_page: number;
};

export type TSkinsBackFilterOption = {
  type: SkinsBackGameType
  minPrice: number;
  maxPrice: number;
  sortOrder: string;
  searchTerm: string;
  page: number;
  per_page: number;
};

export enum SkinsBackGameType {
  CSGO = 'csgo',
  // DOTA2 = 'dota2',
  RUST = 'rust',
}
