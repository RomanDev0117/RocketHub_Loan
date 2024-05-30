import { useGetBitInvestorQuery } from '@store/slices/rockethubApi/bitinvestor.endpoints';

export const DepositBitInvestor = () => {
  const { data } = useGetBitInvestorQuery();

  return (
    <div style={{ display: 'flex' }}>
      <iframe
        allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment; clipboard-read; clipboard-write"
        src={data?.url || ''}
        title="Buy crypto with Bitnvestor"
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
