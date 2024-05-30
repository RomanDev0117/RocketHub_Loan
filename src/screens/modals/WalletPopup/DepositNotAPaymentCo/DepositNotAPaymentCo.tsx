import Loader from '@/components/Loader/Loader';
import { useGetNotapaymentDataQuery } from '@/store/slices/rockethubApi/app.endpoints';
import { getNotAPaymentUrl } from '@/utils/url.utils';

export const DepositNotAPaymentCo = () => {
  const { data, isFetching } = useGetNotapaymentDataQuery();

  if (isFetching) {
    return <Loader loading />;
  }
  const url = getNotAPaymentUrl(data, 'buy');

  return (
    <div style={{ display: 'flex' }}>
      <iframe
        allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment; clipboard-read; clipboard-write"
        src={url}
        title="Sell items"
        style={{
          height: '620px',
          width: '460px',
          borderRadius: '0.75rem',
          margin: 'auto',
        }}
      />
    </div>
  );
};
