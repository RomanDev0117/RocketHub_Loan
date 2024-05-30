export type TLastBets = {
  red: number;
  green: number;
  black: number;
  yellow: number;
};

export enum WOFColor {
  RED = 'red',
  GREEN = 'green',
  BLACK = 'black',
  YELLOW = 'yellow',
}

export enum WOFWinType {
  x2 = '2x',
  x3 = '3x',
  x5 = '5x',
  x50 = '50x',
}

export type TWOFHistory = TWOFHistoryItem[];

export type TWOFHistoryItem = {
  players: {
    red: unknown;
    black: unknown;
    green: unknown;
    yellow: unknown;
  };
  status: string; // closed // TODO: enum
  counter: number;
  fairRound: TWOFHistoryFairRound;
  end: number;
  type: WOFWinType;
};

export type TWOFHistoryFairRound = {
  type: string; // 'teamup' // TODO: enum
  hash: string;
  ticket: number;
  secret: string;
  color: WOFColor;
}


export type TWOFPlayers = {
  [key in WOFColor]: Record<string, TWOFPlayer>;
}

export type TWOFPlayer = {
  id: string;
  steamid: string;
  avatar: string;
  bet: number;
  level: number;
  name: string;
}
