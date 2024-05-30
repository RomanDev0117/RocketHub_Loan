import { CSSProperties } from 'react';
import { TOption } from '../components/Dropdown/Dropdown';
import { EthereumCircleIcon } from '../components/icons/EthereumCircleIcon';
import {
  CRYPTO_CURRENCY_MAP,
  CRYPTO_NAME_MAP,
  DEPOSIT_CRYPTO,
  WITHDRAW_CRYPTO,
} from '../constants';
import { CRYPTO_CURRENCY } from '../types/payment.types';

export const useCryptoDropdown = ({
  selected,
  method,
}: {
  selected: CRYPTO_CURRENCY;
  method: 'deposit' | 'withdraw';
}) => {
  const style: CSSProperties = {
    width: 24,
    height: 24,
    objectFit: 'contain',
  };

  const styleBig: CSSProperties = {
    width: 30,
    maxWidth: 30,
    height: 30,
    maxHeight: 30,
    flex: '0 0 30px',
    objectFit: 'contain',
  };

  const cryptoIcon =
    selected === CRYPTO_CURRENCY.ETHEREUM ? (
      <EthereumCircleIcon style={style} />
    ) : (
      <img src={CRYPTO_CURRENCY_MAP[selected].img} style={style} />
    );

  const opt = method === 'withdraw' ? WITHDRAW_CRYPTO : DEPOSIT_CRYPTO;
  const cryptoOptions: TOption<CRYPTO_CURRENCY>[] = opt.map(
    (crypto) => ({
      label: CRYPTO_NAME_MAP[crypto],
      value: crypto,
      icon:
        crypto === CRYPTO_CURRENCY.ETHEREUM ? (
          <EthereumCircleIcon style={styleBig} />
        ) : (
          <img src={CRYPTO_CURRENCY_MAP[crypto].img} style={styleBig} />
        ),
    })
  );

  return {
    icon: cryptoIcon,
    options: cryptoOptions,
  };
};
