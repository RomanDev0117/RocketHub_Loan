import { T } from '../../../../i18n/translate';
import { useSelector } from 'react-redux';
import { selectSelectedPaymentMethod } from '../../../../store/slices/walletPopupSlice';
import {
  CRYPTO_CONFIRMATIONS_REQUIRED,
  CRYPTO_DEPOSIT_PROCESSING_TIME_MIN,
  CRYPTO_DEPOST_MIN_AMOUNT,
  CRYPTO_NAME_MAP,
} from '../../../../constants';
import { useState } from 'react';
import Loader from '../../../../components/Loader/Loader';
import { Flex } from '../../../../components/Flex/Flex';
import clsx from 'clsx';
import { Modal } from '../../../../components/Modal/Modal';
import { TextFieldCopyToClipboard } from '../../../../components/Form/TextFieldCopyToClipboard/TextFieldCopyToClipboard';
import { ExchangeCalculator } from '../../../../components/ExchangeCalculator/ExchangeCalculator';
import { CRYPTO_CURRENCY } from '../../../../types/payment.types';
import { useCryptoDropdown } from '../../../../hooks/useCryptoDropdown';
import { Dropdown } from '../../../../components/Dropdown/Dropdown';
import { CoinIcon } from '../../../../components/icons/CoinIcon';
import styles from './DepositCrypto.module.scss';
import { useFetchCryptoInfo } from '../../../../hooks/useFetchCryptoInfo';
import { CheckCircleIconV2 } from '../../../../components/icons/CheckCircleIconV2';
import { DangerIcon } from '../../../../components/icons/DangerIcon';

type TProps = {
  onCryptoChange: (crypto: CRYPTO_CURRENCY) => void;
};

export const DepositCrypto = ({ onCryptoChange }: TProps) => {
  const [qrCodeIsBig, setQrCodeIsBig] = useState(false);
  const selected = useSelector(selectSelectedPaymentMethod) as CRYPTO_CURRENCY;
  const [{ usdAmount, cryptoAmount }, setAmount] = useState({
    usdAmount: 0,
    cryptoAmount: 0,
  });

  const { icon: cryptoIcon, options: cryptoOptions } = useCryptoDropdown({
    selected,
    method: 'deposit',
  });

  const { isFetching, exchangeRate, address } = useFetchCryptoInfo(
    selected,
    'deposit'
  );

  const qrCodeUrl = `https://qrcode.tec-it.com/API/QRCode?data=${address || ''
    }`;

  const hasNetworkSelection = selected === CRYPTO_CURRENCY.USDT;
  return (
    <div className={styles.container}>
      <Dropdown
        label={
          <T
            id="withdrawCrypto.SelectCryptocurrency"
            defaultMessage="Select cryptocurrency"
          />
        }
        options={cryptoOptions}
        value={selected}
        labelContainerClassName={styles.dropdownLabel}
        placeholderProps={{
          className: styles.dropdown,
        }}
        placeholderTextClassName={styles.placeholderText}
        onChange={(s) => {
          if (s !== selected) {
            onCryptoChange(s);
          }
        }}
        zIndex={2000}
      />

      {hasNetworkSelection && (
        <div className={styles.networkContainer}>
          <div className={styles.text}>Select a network</div>
          <span className={styles.networkItem}>
            Tron (TRC-20) <CheckCircleIconV2 />
          </span>
        </div>
      )}

      <ExchangeCalculator
        textFieldProps={{
          // appearance: 'lightGrey',
          height: 52,
        }}
        data={[
          {
            name: 'cryptoAmount',
            value: cryptoAmount,
            label: (
              <>
                <T
                  id="exchangeInput.AmountToDeposit"
                  defaultMessage="Amount to deposit"
                />{' '}
                <span className={styles.minAmountText}>
                  (min. {CRYPTO_DEPOST_MIN_AMOUNT[selected]}{' '}
                  <span className="uppercase">{selected}</span>)
                </span>
              </>
            ),
            icon: cryptoIcon,
            decimals: 6,
          },
          {
            name: 'usdAmount',
            value: usdAmount,
            label: (
              <T id="exchangeInput.YouWillGet" defaultMessage="You will get" />
            ),
            icon: <CoinIcon shine />,
          },
        ]}
        exchangeRate={1 / (exchangeRate || 1)}
        onChange={({ usdAmount, cryptoAmount }) => {
          setAmount({ usdAmount, cryptoAmount });
        }}
      />
      <div className={styles.importantNotice}>
        <T
          id="deposit.crypto.TheValueOfCryptoMayChangeBetweenNowAndTheTimeWeReceivePayment"
          defaultMessage="The value of {cryptoName} may change between now and the time we receive your payment."
          values={{
            cryptoName: CRYPTO_NAME_MAP[selected],
          }}
        />
        <br />

        <div className={styles.pillsContainer}>
          <div className={styles.pill}>
            Confirmations required:{' '}
            <span>{CRYPTO_CONFIRMATIONS_REQUIRED[selected]}</span>
          </div>
          <div className={styles.pill}>
            Avg. proccesing time:{' '}
            <span>{CRYPTO_DEPOSIT_PROCESSING_TIME_MIN[selected]} mins</span>
          </div>
        </div>
      </div>

      <Flex container gap={20} justifyContent="space-between">
        <div>
          <h4 className={styles.bigTitle}>
            <T id="deposit.crypto.Deposit" defaultMessage="Deposit" />{' '}
            {CRYPTO_NAME_MAP[selected]}
          </h4>
          <div className={styles.depositText}>
            <T
              id="deposit.crypto.depositInfoText"
              defaultMessage="To deposit, scan QR code or copy the address and send funds."
            />
          </div>

          {hasNetworkSelection && (
            <div className={styles.disclaimer}>
              <DangerIcon />
              Only deposit over the Tron network!
            </div>
          )}
        </div>

        <div className={styles.qrWrapper}>
          {!address && (
            <Loader
              loading={isFetching}
              zIndex={30}
              position="absolute"
              backdropColor="rgba(0, 0, 0, 0.5)"
            />
          )}
          {address && (
            <>
              <img
                className={styles.qrImg}
                onClick={() => setQrCodeIsBig(true)}
                src={address ? qrCodeUrl : ''}
                alt={address ? qrCodeUrl : ''}
              />
              <p className={clsx(styles.smallText, styles.qrText)}>
                <T
                  id="deposit.crypto.qrCodeResizeText"
                  defaultMessage="Click on the code <new-line>new line</new-line> to make it {size}"
                  values={{
                    size: qrCodeIsBig ? 'smaller' : 'bigger',
                    'new-line': () => <br />,
                  }}
                />
              </p>
            </>
          )}
        </div>
      </Flex>

      <div style={{ marginTop: 26 }} />
      <h4 className={styles.blockTitle}>
        <T
          id="deposit.crypto.YourWalletAddress"
          defaultMessage="Your wallet address"
        />
        {/* {CRYPTO_NAME_MAP[selected]} */}
        {hasNetworkSelection && (
          <span className={styles.networkTagYellow}>TRC-20</span>
        )}
      </h4>
      <TextFieldCopyToClipboard
        value={address || ''}
        height={44}
        fontStyle="light"
        readOnly
        className={styles.walletAddress}
        maxLength={16}
      />

      <Modal
        show={qrCodeIsBig}
        onClose={() => setQrCodeIsBig(false)}
        className={styles.qrCodeModal}
      >
        <img
          className={styles.qrImgBig}
          onClick={() => setQrCodeIsBig(false)}
          src={qrCodeUrl}
          alt={qrCodeUrl}
        />
      </Modal>
    </div>
  );
};
