import { useGetVaultQuery } from '@/store/slices/rockethubApi/vault.endpoints';
import styles from './HeaderVault.module.scss';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVault } from '@fortawesome/pro-solid-svg-icons';
import { useVaultPopup } from '@/hooks/useVaultPopup';
import Transition from '@/components/Transition';
import clsx from 'clsx';
import { Button } from '@/components/Button/Button';

type TProps = {
  visible: boolean;
};

export const HeaderVault = ({ visible }: TProps) => {
  const vaultPopup = useVaultPopup();
  const { data, isLoading } = useGetVaultQuery();
  return (
    <Transition show={visible}>
      <div
        className={clsx(styles.container, {
          [styles.hidden]: !visible,
          [styles.loading]: isLoading,
        })}
        onClick={(e) => {
          e.stopPropagation();

        }}
      >
        <div className={styles.title}>Keep your coins safe</div>
        {/* <FontAwesomeIcon icon={faVault} fontSize={14} /> Vault */}

        <Button
          pressable
          loading={isLoading}
          prepend={<FontAwesomeIcon icon={faVault} fontSize={14} />}
          gap={6}
          onClick={() => vaultPopup.open()}
        >
          Vault
          <PriceWithCoin fontWeight="inherit">
            {data?.vault?.amount || 0}
          </PriceWithCoin>
        </Button>

        {/* <div className={styles.priceContainer}>
          <Loader loading={isLoading} position="absolute" size={20} thickness={2} />
          <PriceWithCoin coinProps={{ shine: true }} className={styles.price}>
            {data?.vault?.amount || 0}
          </PriceWithCoin>
        </div> */}
      </div>
    </Transition>
  );
};
