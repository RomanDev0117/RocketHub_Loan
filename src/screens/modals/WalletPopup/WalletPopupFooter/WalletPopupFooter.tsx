
import { useSelector } from 'react-redux';
import { DEPOSIT_CRYPTO, PAYMENT_CRYPTO } from '../../../../constants';
import { selectSelectedPaymentMethod } from '../../../../store/slices/walletPopupSlice';
import { ModalFooter } from '../../../../components/Modal/Modal';
import { useCollapse } from 'react-collapsed';
import { Button } from '../../../../components/Button/Button';
import { PlusCircleIcon } from '../../../../components/icons/PlusCircleIcon';
import { T } from '../../../../i18n/translate';
import styles from './WalletPopupFooter.module.scss';
import { Flex } from '../../../../components/Flex/Flex';
import { ShieldKeyIcon } from '../../../../components/icons/ShieldKeyIcon';
import { CRYPTO_CURRENCY } from '../../../../types/payment.types';
import { useGetCryptoExchangeQuery } from '../../../../store/slices/rockethubApi/crypto.endpoints';

export const WalletPopupFooter = () => {
  const selected = useSelector(selectSelectedPaymentMethod);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { getCollapseProps } = useCollapse({
    isExpanded: DEPOSIT_CRYPTO?.includes(selected as CRYPTO_CURRENCY),
  });

  const { currentData } = useGetCryptoExchangeQuery(
    { crypto: selected as CRYPTO_CURRENCY },
    { skip: !PAYMENT_CRYPTO.includes(selected as CRYPTO_CURRENCY) }
  );

  const blockCyperLink = `https://live.blockcypher.com/${selected}/address/${currentData?.rocketBetsCoinAmount}`;

  return (
    <div {...getCollapseProps()}>
      <ModalFooter>
        <Flex container alignItems="center" gap={20}>
          <p className={styles.title}>
            <T
              id="payment.crypto.YouNeedMoreCrypto"
              defaultMessage="You need more currency?"
            />
          </p>
          <Button
            pressable
            color="secondary-v3"
            prepend={<PlusCircleIcon width={20} height={20} />}
          >
            <T id="payment.crypto.BuyCrypto" defaultMessage="Buy Crypto" />
          </Button>
          <Button
            Component="a"
            href={blockCyperLink}
            target="_blank"
            prepend={<ShieldKeyIcon />}
            pressable
          >
            <T
              id="payment.crypto.BlockchainExplorer"
              defaultMessage="Blockchain Explorer"
            />
          </Button>
        </Flex>
      </ModalFooter>
    </div>
  );
};
