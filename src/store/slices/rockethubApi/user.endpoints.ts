import { rockethubApi } from ".";
import {
  TErrorResponse,
  TGetUserDataBySteamIdResponse,
  TGetUserRewardsResponse,
  TGetUserRewardsResponseMapped,
  TRotateServerSeedSuccessResponse,
  TSimpleSuccessResponse,
  TTipUserSuccessResponse,
} from "../../../types/api/api.types";
import { RewardsAmountMap, TUser } from "../../../types/userTypes";

export const extendedUserApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<{ user: TUser }, void>({
      query: () => ({
        url: "/user",
      }),
    }),
    tipUser: builder.mutation<
      TTipUserSuccessResponse | TErrorResponse,
      { steamid: string; amount: number; displayInChat: boolean }
    >({
      query: ({ steamid, amount, displayInChat }) => ({
        url: "/user/tip",
        body: {
          steamid,
          amount,
          displayInChat,
        },
      }),
    }),
    rotateServerSeed: builder.mutation<
      TRotateServerSeedSuccessResponse | TErrorResponse,
      void
    >({
      query: () => ({
        url: "/user/rotateServerSeed",
      }),
    }),
    getUserDataBySteamId: builder.query<
      TGetUserDataBySteamIdResponse | TErrorResponse,
      string
    >({
      query: (steamId) => ({
        url: `/user/${steamId}`,
      }),
    }),
    getUserRewards: builder.query<TGetUserRewardsResponseMapped, void>({
      query: () => ({
        url: "/user/rewards",
        method: "GET",
      }),
      transformResponse: (response: TGetUserRewardsResponse) => {
        // nextClaim: 1702425600

        const rewardsAmountMap = Object.values(
          response?.userRewards || {}
        ).reduce((acc, reward) => {
          acc[reward.reward_type] = reward.amount;
          return acc;
        }, {} as RewardsAmountMap);

        return {
          userRewards: rewardsAmountMap,
          wagered: response.wagered,
          nextClaim: response.nextClaim,
          bonusRewards: response.bonusRewards,
          rakebackRewards: response.rakebackRewards,
          // nextClaim: Math.random() > 0.5 ? Date.now() / 1000 + 10 : 100, // TODO: remove mock data after testing

          // bonusRewards: [
          //   {
          //     'amount': 0.99,
          //     'category': 'bonus',
          //     'id': '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     'reward_type': 'bitinvestor',
          //     'steamid': '76561197980435117'
          //   },
          //   {
          //     'amount': 10.99,
          //     'category': 'bonus',
          //     'id': '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     'reward_type': 'bitinvestor',
          //     'steamid': '76561197980435117'
          //   },
          //   {
          //     'amount': 100.99,
          //     'category': 'bonus',
          //     'id': '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     'reward_type': 'bitinvestor',
          //     'steamid': '76561197980435117'
          //   }
          // ]
          // rakebackRewards: [
          //   {
          //     amount: 0.99,
          //     category: 'rakeback',
          //     id: '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     reward_type: RewardType.Daily,
          //     steamid: '76561197980435117',
          //   },
          //   {
          //     amount: 10.99,
          //     category: 'rakeback',
          //     id: '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     reward_type: 'weekly',
          //     steamid: '76561197980435117',
          //   },
          //   {
          //     amount: 100.99,
          //     category: 'rakeback',
          //     id: '3732f56f-71d4-4b84-b6bb-5204d3ec0b2f',
          //     reward_type: RewardType.Monthly,
          //     steamid: '76561197980435117',
          //   },
          // ],
        };
      },
      providesTags: ["UserRewards"],
    }),
    redeemUserReward: builder.mutation<
      TSimpleSuccessResponse | TErrorResponse,
      { id: string; amount: number }
    >({
      query: (data) => ({
        url: "/user/rewards/redeem",
        body: data,
      }),
    }),
    claimCoupon: builder.mutation<
      TSimpleSuccessResponse | TErrorResponse,
      string
    >({
      query: (code) => ({
        url: `/coupons/claim/${code}`,
      }),
    }),
    toggleNotifications: builder.mutation<
      TSimpleSuccessResponse | TErrorResponse,
      boolean
    >({
      query: (enabled) => ({
        url: "/user/notifications",
        method: "PUT",
        body: {
          enabled,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetCurrentUserQuery,
  useTipUserMutation,
  useRotateServerSeedMutation,
  useGetUserDataBySteamIdQuery,
  useLazyGetUserDataBySteamIdQuery,
  useGetUserRewardsQuery,
  useClaimCouponMutation,
  useToggleNotificationsMutation,
  useRedeemUserRewardMutation,
} = extendedUserApi;
