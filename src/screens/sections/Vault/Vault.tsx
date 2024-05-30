import { useState } from 'react';
import { useGetVaultQuery } from '@/store/slices/rockethubApi/vault.endpoints';
import { VaultPopupTabs } from './components/VaultPopupTabs/VaultPopupTabs';
import { VaultLockedBanner } from './components/VaultLockedBanner/VaultLockedBanner';
import { VaultWithdrawForm } from './components/VaultWithdrawForm/VaultWithdrawForm';
import { PriceWithCoin } from '@/components/PriceWithCoin/PriceWithCoin';
import { VaultDepositForm } from './components/VaultDepositForm/VaultDepositForm';

import styles from './Vault.module.scss';


type TProps = {
  hideLock?: boolean;
}

export const Vault = ({ hideLock }: TProps) => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const { data } = useGetVaultQuery();


  return (
    <div className={styles.container}>
      <img
        src="/images/vault/vault1.png"
        alt="vault"
        className={styles.vaultImage}
      />

      <h4 className={styles.title}>
        <span className={styles.titleText}>Vault</span>
        <span className={styles.coinContainer}>
          <PriceWithCoin coinProps={{ shine: true, className: styles.coin }}>
            {data?.vault?.amount || 0}
          </PriceWithCoin>
        </span>
      </h4>

      <VaultPopupTabs tab={tab} setTab={setTab} />

      <div className={styles.tabContainer}>
        {tab === 'deposit' && <VaultDepositForm hideLock={hideLock} />}

        {tab === 'withdraw' &&
          (data?.vault?.locked ? (
            data?.vault?.lockedUntil ? (
              <VaultLockedBanner
                lockedUntil={data.vault.lockedUntil}
                vault={data.vault}
              />
            ) : null
          ) : (
            <VaultWithdrawForm vault={data?.vault} />
          ))}
      </div>
    </div>
  );
};