import { Tooltip } from '@/components/Tooltip/Tooltip';
import styles from './FreeCrateBadge.module.scss';

export const FreeCrateBadge = () => {
  const badgeTooltipTitle = (
    <div className={styles.tooltipTextContainer}>
      {/* <h4 className={styles.badgeTitle}>
        INSTANT & DAILY CASE up to <CoinIcon shine /> 50 !
      </h4>
      <p className={styles.badgeText}>Rewards are based on deposit amount! </p>
      <p className={styles.badgeText}>
        Rewards are up to <CoinIcon shine /> 50!
      </p>
      <p className={styles.badgeTextThin}>
        Additional bonuses applied after KYC with Bitinvestor, to claim message
        support!
      </p> */}

      <p className={styles.text1}>
        Deposit at least <strong>$25</strong> to receive free case!
      </p>
      <p className={styles.text2}>Max 1 per day & non-stackable</p>
    </div>
  );

  return (
    <Tooltip title={badgeTooltipTitle}>
      <div className={styles.badge}>
        <img src="/images/wallet/free-crate-badge.png" />
      </div>
    </Tooltip>
  );
};
