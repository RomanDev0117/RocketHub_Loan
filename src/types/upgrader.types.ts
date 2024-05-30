import { TSteamItem } from './steam.types';
import { TWaxpeerItem } from './waxpeer.types';

export enum RollType {
  'Over' = 'over',
  'Under' = 'under'
}

export type TUpgraderItem = TWaxpeerItem | TSteamItem