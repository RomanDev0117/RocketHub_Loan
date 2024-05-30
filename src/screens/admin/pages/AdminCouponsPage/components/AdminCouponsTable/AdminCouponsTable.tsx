import { Button } from '@/components/Button/Button';
import { Columns } from '@/components/GenericTable/genericTable.types';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { TableSection } from '@/components/TableSection/TableSection';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { TAdminCoupon } from '@/types/admin.types';
import { useMemo } from 'react';

type TProps = {
  coupons: TAdminCoupon[];
  loading: boolean;
  onAdd: () => void;
  onDelete: (code: string) => Promise<void>;
};

export const AdminCouponsTable = ({
  coupons,
  loading,
  onAdd,
  onDelete,
}: TProps) => {
  const couponsWithIds = useMemo(() => {
    return coupons.map((c, idx) => ({ ...c, id: `${idx}` }));
  }, [coupons]);

  const headers = ['Code', 'Reward Amount', 'Uses', 'Users', ' '];

  const columns: Columns<TAdminCoupon> = {
    code: 'code',
    rewardAmount: ({ rewardAmount }) => {
      return <PriceWithCoin>{rewardAmount}</PriceWithCoin>;
    },
    uses: 'uses',
    users: ({ users }) => {
      return (
        <>
          {users.map((steamId, idx) => {
            return <div key={idx}>{steamId}</div>;
          })}
        </>
      );
    },
    actions: ({ code }) => {
      return (
        <Button
          color="danger"
          onClick={async () => {
            if (window.confirm('Do you really want to delete this coupon?')) {
              await onDelete(code);
            }
          }}
          icon
          style={{ marginLeft: 'auto' }}
        >
          <DeleteIcon />
        </Button>
      );
    },
  };

  return (
    <TableSection
      title="Coupons"
      rightSlot={
        <>
          <Button pressable onClick={onAdd}>
            Add new
          </Button>
        </>
      }
      items={couponsWithIds}
      loading={loading}
      columnNames={headers}
      columns={columns}
      // initialLimit={999}
      disablePagination
      noData={'No coupons'}
    />
  );
};
