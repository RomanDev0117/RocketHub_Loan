import { TSteamItem } from '../steam.types';

export type GetSteamItemsResponse = {
  success: boolean;
  items: TSteamItem[];
  msg: string;
  minValue: number;
};