import { PAYMENT_CRYPTO } from '../constants';
import { CRYPTO_CURRENCY } from '../types/payment.types';
import useTranslation from './useTranslation';
import { useGetCryptoAddressAndExchangeQuery, useGetCryptoPayAddressAndExchangeQuery } from '../store/slices/rockethubApi/crypto.endpoints';
import { useHandleApiError } from './useHandleApiError';

export const useFetchCryptoInfo = (crypto: CRYPTO_CURRENCY, transactionType: 'deposit' | 'withdrawal') => {
  const { t } = useTranslation();

  const { currentData, isFetching, error, isError } =
    (crypto == CRYPTO_CURRENCY.LITECOIN && transactionType == 'deposit') ?
      useGetCryptoPayAddressAndExchangeQuery(
        { crypto: crypto, transactionType },
        { skip: !PAYMENT_CRYPTO.includes(crypto) }
      ) : useGetCryptoAddressAndExchangeQuery(
        { crypto: crypto, transactionType },
        { skip: !PAYMENT_CRYPTO.includes(crypto) }
      );

  useHandleApiError({
    data: currentData as any,
    error,
    isError,
    defaultError: t({
      id: 'api.error.UnableToFetchCryptoAddress',
      defaultMessage: 'Error happened while fetching cryptocurrency data',
    }),
  });

  return {
    currentData,
    isFetching,
    error,
    address: currentData?.address,
    exchangeRate: currentData?.price,
  };
};
