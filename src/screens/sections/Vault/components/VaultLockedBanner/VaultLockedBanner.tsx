import { LockIconV2 } from '@/components/icons/LockIconV2';
import styles from './VaultLockedBanner.module.scss';
import { useEffect, useMemo } from 'react';
import { useTimer } from 'react-timer-hook';
import { useLazyGetVaultQuery, vaultApi } from '@/store/slices/rockethubApi/vault.endpoints';
import { useDispatch } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import clsx from 'clsx';
import { TVault } from '@/types/vault.types';

type TProps = {
  vault: TVault;
  lockedUntil: number;
};

export const VaultLockedBanner = ({ lockedUntil, vault }: TProps) => {
  const dispatch = useDispatch();
  const [getVaultApi, { isFetching }] = useLazyGetVaultQuery();

  useEffect(() => {
    // refetch data just in case we have outdated data
    dispatch(vaultApi.util.invalidateTags(['Vault']));
  }, []);


  const expiryDate = useMemo(() => {
    return new Date(lockedUntil * 1000);
  }, [lockedUntil]);

  const { days, seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp: expiryDate,
    onExpire: () => {
      void getVaultApi();
      // dispatch(vaultApi.util.invalidateTags(['Vault']));
    },
  });

  useEffect(() => {
    // if after refetching the vault is still locked, stop the loading bar
    restart(expiryDate);
  }, [vault]);


  return (
    <div className={styles.container}>
      {isFetching && <Loader position="absolute" />}

      <div className={clsx(styles.content, {
        [styles.invisible]: isFetching,
      })}>
        <LockIconV2 className={styles.icon} />

        <p className={styles.text}>Withdraw will be available in</p>

        <div className={styles.timer}>
          {days ? `${days}d ` : ''} {hours}h {minutes}m {seconds}s
        </div>
      </div>
    </div >
  );
};
