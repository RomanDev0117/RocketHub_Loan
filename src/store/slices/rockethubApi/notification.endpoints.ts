import {
  TErrorResponse,
  TGetNotificationsSuccessResponse,
} from '@/types/api/api.types';
import { rockethubApi } from '.';

export const notificationApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      TGetNotificationsSuccessResponse | TErrorResponse,
      void
    >({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    readAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications',
        method: 'PUT',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (notifications) => {
              if (notifications.success) {
                return {
                  ...notifications,
                  userNotifications: notifications.userNotifications.map(
                    (n) => ({ ...n, read: true })
                  ),
                };
              }
              return notifications;
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    deleteAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications',
        method: 'DELETE',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (notifications) => {
              if (notifications.success) {
                return {
                  ...notifications,
                  userNotifications: []
                };
              }
              return notifications;
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;
