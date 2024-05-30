import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from '@/store/slices/rockethubApi/admin.endpoints';
import { AdminCouponsTable } from './components/AdminCouponsTable/AdminCouponsTable';
import { AdminAddCouponModal } from './components/AdminAddCouponModal/AdminAddCouponModal';
import { useState } from 'react';

export const Component = () => {
  const { data, isFetching } = useGetCouponsQuery();
  const [deleteCouponApi] = useDeleteCouponMutation();
  const [addCouponModalVisible, setAddCouponModalVisible] = useState(false);

  const coupons = data?.success ? data.coupons : [];

  return (
    <>
      <AdminCouponsTable
        loading={isFetching}
        coupons={coupons}
        onAdd={() => {
          setAddCouponModalVisible(true);
        }}
        onDelete={async (code) => {
          await deleteCouponApi(code);
        }}
      />

      <AdminAddCouponModal
        show={addCouponModalVisible}
        onClose={() => {
          setAddCouponModalVisible(false);
        }}
      />
    </>
  );
};
