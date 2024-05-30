import { EthereumCircleIcon } from '../components/icons/EthereumCircleIcon';
import { CRYPTO_CURRENCY_MAP } from '../constants';
import { CRYPTO_CURRENCY, CRYPTO_CURRENCY_U } from '../types/payment.types';

export const getCryptoIcon = (crypto: CRYPTO_CURRENCY) => {
  return crypto === CRYPTO_CURRENCY.ETHEREUM
    ? <EthereumCircleIcon />
    : <img src={CRYPTO_CURRENCY_MAP[crypto].img} />;
};

export const cryptoTypeToCrypto = (type: CRYPTO_CURRENCY_U) => {
  return type.toLowerCase() as CRYPTO_CURRENCY;
};