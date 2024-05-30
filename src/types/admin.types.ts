export type TAdminCaseItem = {
  border_color: string;
  id: string;
  image: string;
  market_hash_name: string;
  market_name: string;
  nameID: string;
  prices: {
    avg: number;
    first_seen: number;
    latest: number;
    max: number;
    mean: number;
    median: number;
    min: number;
    safe: number;
    safe_ts: {
      last_24h: number;
      last_30d: number;
      last_7d: number;
      last_90d: number;
    };
    sold: {
      avg_daily_volume: number;
      last_24h: number;
      last_30d: number;
      last_7d: number;
      last_90d: number;
    };
    unstable: boolean;
    unstable_reason: boolean;
  };
  updated_at: number;
};

export type TAdminCaseItemEditable = TAdminCaseItem & {
  percentage: number;
};

export type TAdminCoupon = {
  code: string;
  rewardAmount: number;
  users: string[]; // steam ids
  uses: number;
};
