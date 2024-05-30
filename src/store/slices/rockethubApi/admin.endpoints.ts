import { rockethubApi } from '.';
import { TAdminCaseItem } from '../../../types/admin.types';
import {
  TAdminGetCouponsSuccess,
  TCreateNewCaseRequestData,
  TErrorResponse,
  TSuccessResponse,
} from '../../../types/api/api.types';
import { TCase } from '../../../types/caseTypes';

type TGetAllItemsSuccessResponse = {
  success: true;
  items: TAdminCaseItem[];
};

type TGetAdminCasesSuccessResponse = TSuccessResponse<TCase[]>;

const extendedApi = rockethubApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCase: builder.query<
      TSuccessResponse<TCase> | TErrorResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/getCase/${id}`,
      }),
      providesTags: ['AdminCase'],
    }),
    getAllCases: builder.query<
      TGetAdminCasesSuccessResponse | TErrorResponse,
      void
    >({
      query: () => ({
        url: '/admin/cases',
        method: 'GET',
      }),
    }),
    getAllItems: builder.query<
      TGetAllItemsSuccessResponse | TErrorResponse,
      'getCsgoItems' | 'getRustItems'
    >({
      query: (itemsApiEnpoint) => ({
        url: `/admin/${itemsApiEnpoint}`,
        method: 'GET',
      }),
    }),
    adminFeatureCase: builder.mutation<
      TSuccessResponse<any> | TErrorResponse,
      { id: string; featured: boolean }
    >({
      query: ({ id, featured }) => ({
        url: `/admin/featureCase/${id}/${featured}`,
      }),
    }),
    adminDeleteCase: builder.mutation<
      TSuccessResponse<any> | TErrorResponse,
      string
    >({
      query: (id) => ({
        url: `admin/deleteCase/${id}`,
      }),
      invalidatesTags: ['AdminCase', 'Cases'],
    }),
    createNewCase: builder.mutation<
      { success: true } | TErrorResponse,
      TCreateNewCaseRequestData
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append('items', JSON.stringify(data.items));
        formData.append('title', data.title);
        formData.append('price', `${data.price}`);
        formData.append('isEdit', data.isEdit ? 'true' : 'false');
        formData.append('type', data.type);
        formData.append('rewardType', data.rewardType || '');
        formData.append('id', data.id || '');
        formData.append('image', data.image);

        return {
          url: '/admin/createNewCase',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Cases'],
    }),

    // coupons
    getCoupons: builder.query<TAdminGetCouponsSuccess | TErrorResponse, void>({
      query: () => ({
        url: '/coupons',
        method: 'GET',
      }),
      providesTags: ['Coupons'],
    }),
    createCoupon: builder.mutation<
      { success: true } | TErrorResponse,
      { code: string; rewardAmount: number, uses: number }
    >({
      query: (body) => ({
        url: '/coupons',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Coupons'],
    }),
    deleteCoupon: builder.mutation<{ success: true } | TErrorResponse, string>({
      query: (code) => ({
        url: `/coupons/${code}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupons'],
    }),

    // user decorations
    getUploads: builder.query<void, void>({
      query: () => ({
        url: '/admin/uploads',
        method: 'GET',
      }),
    }),
    getUserDecorations: builder.query<void, void>({
      query: () => ({
        url: '/admin/users/userDecorations/{steamid}',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllItemsQuery,
  useCreateNewCaseMutation,
  useGetAdminCaseQuery,
  useAdminFeatureCaseMutation,
  useAdminDeleteCaseMutation,
  useGetAllCasesQuery: useAdminGetAllCasesQuery,
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useCreateCouponMutation,
  useGetUserDecorationsQuery,
  useGetUploadsQuery,
} = extendedApi;
