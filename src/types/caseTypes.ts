import { RewardType } from './app.types';
import { ID } from './commonTypes';

export type TCaseItem = {
  color: string; // #FFD700
  image: string; // full url
  name: string;
  percentage: number; // 0.25
  price: string; // "99.35"
};

export const CASE_TYPE = {
  FEATURED: 'featured',
  TICKET: 'ticket',
  ALL_CASES: 'all',
  DAILY: 'dailyCase',
};

export type TCase = {
  id: ID;
  amount: number; // how many cases?
  featured: boolean;
  image: string; // "1681995208463-800045480.png",
  category: string; // 'bonus'
  items: TCaseItem[];
  price: number;
  time: number; // 1655487963
  title: string;
  type: GAME_TYPE; //string; // TODO: maybe enum? "rust", "csgo"
  rewardType?: RewardType;

  // check if next properties always exist on the case when case is part of case battle
  ticketCase?: boolean;
  dailyCase?: boolean;
  level?: number;
};

export enum BATTLE_TYPE {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  '4-way' = '4-way',
}

export type TCasePlayer = {
  avatar: string; // "https://avatars.steamstatic.com/95d8f1c00bbdc43e289e494f3dad027a6f930ac4.jpg"
  deposited: number;
  exp: number;
  isInDiscord: boolean;
  join_date: number; // 1688574012
  level: number;
  name: string;
  positionIdx: number;
  profit: number;
  rank: number;
  steamid: string; // "76561198133018762"
  team: number;
  tickets: number;
  wagered: number;
  withdrawn: number;
};

export enum CASE_BATTLE_STATUS {
  WAITING = 0,
  IN_PROGRESS = 1,
  OVER = 2,
}

export type TCaseGame = {
  id: string; // "5ed80bb0-142e-4d3b-9b94-20f1ebcf539d"

  battleType: BATTLE_TYPE;
  cases: TCase[];
  currentCaseTime: number; // 1689242503926
  currentRound: number; // 4
  currentRoundTimeLeft: number; // -800
  cursed: boolean;
  eos_block_id: string; // "131489ef218fa6c200e946e47e3c83880032a2704a74db0432c40ea831257bc7"
  flare_id: number; // 320113135
  numberOfPlayersInDuel: number; // 4
  player1: TCasePlayer;
  price: number;
  public_server_seed: string; // "d8a4c6f5f4235a274dad2fb56b1631d7ffb285c287482c7203e8b63c49a5934c"
  server_seed: string; // "06450fbf5e3486c72adc688076248168cc4bb8bc003b069c707da8cd840a35b4"
  status: number; // 2 -> TODO: enum here?
  time: number; // 1689242503926
  time_now: number; // 1689245229220
  time_start: number; // 1689242507937
  winningTeam: string; // "2"
  winners: TWinner[];
  totalValueUnboxedPerPlayer: TTotalValueUnboxedOfPlayer[];
  playersInDuel: TDuelPlayer[];

  // string in this case 'player1', 'player2', 'player3', ...
  playerItemsUnboxedPerCase: Record<
    string,
    {
      items: TPlayerUnboxedItem[];
      position: number;
      steamid: string; // '76561198133018762'
      team: number;
    }
  >[];
};

export type TPlayerUnboxedItem = {
  case: string; // '1681995208463-800045480.png'
  hash: string; // '1a545a40e1fb71e456ab945bb0ef8a803edd2a7b176d7ce7e1097fa46513d951'
  res: number; // 35745;
  item: TPlayerUnboxedItemDetails;
};

export type TPlayerUnboxedItemDetails = {
  chance: number[];
  color: string; // '#a7ec2e'
  image: string; // 'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Bb4mLCfCk4nReh8DEiv5dYPKw9rbUySPG3Zg2gMYs'
  name: string;
  percentage: number;
  price: string; // '1.20'
};

export type TDuelPlayer = TDuelPlayerFull | TDuelPlayerShort;

export enum GAME_TYPE {
  ALL = 'all',
  RUST = 'rust',
  CSGO = 'csgo',
}

export enum CASE_SORT_BY {
  PRICE_DESC = 'price_desc',
  PRICE_ASC = 'price_asc',
}

export enum SORT_BY {
  PRICE_DESC = 'price_desc',
  PRICE_ASC = 'price_asc',
}

type TDuelPlayerFull = {
  avatar: string; // 'https://avatars.steamstatic.com/95d8f1c00bbdc43e289e494f3dad027a6f930ac4.jpg'
  deposited: number;
  exp: number;
  isInDiscord: boolean;
  join_date: number; // 1688574012
  level: number;
  name: string;
  positionIdx: number;
  profit: number;
  rank: number;
  steamid: string; // '76561198133018762',
  team: number;
  tickets: number;
  wagered: number;
  withdrawn: number;
};

type TDuelPlayerShort = {
  avatar: string; // 'https://wikibioage.com/uploads/2020/08/valtteri-bottas-27113.jpg'
  level: number;
  name: string;
  positionIdx: number;
  steamid: string;
  team: number;
};

export type TTotalValueUnboxedOfPlayer = {
  player: string; // "player1", "player2", "player3", "player4"
  steamid: string | number; // "76561198133018762" | 2 | 3
  team: number;
  totalItemPrice: number;
};

export type TWinner = {
  amount: number;
  player: string; // "player1", "player2", "player3", "player4"
  steamid: string | number; // "76561198133018762" | 2 | 3
  team: number;
};

