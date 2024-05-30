import { selectIsLoggedIn } from '@/store/slices/userSlice';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './BonusBanner.module.scss';
import { Link } from 'react-router-dom';
import { ROUTE } from '@/types/routeTypes';
import { useGetUserRewardsQuery } from '@/store/slices/rockethubApi/user.endpoints';

export const BonusBanner = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return <BonusBannerUI />;
});

const BonusBannerUI = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data } = useGetUserRewardsQuery(undefined, { skip: !isLoggedIn });

  if (!data || !data.userRewards) {
    return null;
  }

  const hasRewardCoin = Object.values(data.userRewards).some((v) => v > 0);

  if (!hasRewardCoin) {
    return null;
  }

  return (
    <Link to={ROUTE.REWARDS} className={styles.container}>
      <img src="/images/bonus/bonus-case.svg" alt="Bonus case" className={styles.caseImage} />
      <img src="/images/bonus/bonus-stars.png" alt="Bonus stars" className={styles.stars} />
      <span className={styles.text}>Rewards</span>
    </Link>
  );
};
