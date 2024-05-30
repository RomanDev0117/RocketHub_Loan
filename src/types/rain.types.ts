export type TRain = {
  active: boolean;
  createdAt: number;
  endingAt: number;
  id: string;
  players: TRainPlayer[];
  totalPot: number;
};

export type TRainPlayer = {
  level: number;
  steamid: string;
}