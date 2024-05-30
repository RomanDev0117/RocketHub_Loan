import { T } from '../../i18n/translate';
import styles from './UserLevelDetails.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectUserWagered,
} from '@store/slices/userSlice';
import { TUser } from '../../types/userTypes';
import { FormattedPrice } from '../FormattedPrice/FormattedPrice';
import { getUserNextRank } from '@utils/rank.utils';
import { memo, useMemo } from 'react';
import {
  getLevelIcon,
  getLvlDetails,
  getNextLevelIcon,
} from '../../utils/level.utils';
import { UserProgressBar } from '../UserProgressBar/UserProgressBar';
import { positiveOrZero } from '@/utils/number.utils';

type TProps = {
  type?: 'flat' | 'default' | 'minimal';
  user?: TUser;
  showLevelIcon?: boolean;
  progressBarColor?: string;
};

export const UserLevelDetails = memo(({
  type = 'default',
  user,
  showLevelIcon = true,
  progressBarColor,
}: TProps) => {
  const currentUser = useSelector(selectUser);
  const wagered = useSelector(selectUserWagered);
  const _user = user || currentUser;

  const levelIcon = getLevelIcon(_user?.level);
  const nextLevelIcon = getNextLevelIcon(_user?.level);


  // const userRank = getUserRank(_user);
  const nextUserRank = getUserNextRank(_user);
  const lvlInfo = useMemo(() => {
    return getLvlDetails(_user?.level || 0);
  }, [_user?.level]);

  const isMinimal = type === 'minimal';
  const totalEarned = _user?.wagered || 0;
  const levelEarned = positiveOrZero(totalEarned - lvlInfo.minWager);
  const levelMaxEarned = (lvlInfo.maxWager - lvlInfo.minWager) || 999999999;

  return (
    <div
      className={clsx(styles.container, {
        [styles.flat]: type === 'flat',
        [styles.minimal]: isMinimal,
      })}
    >
      {/* <img src={rankImg} className={styles.rankImg} /> */}
      {/* <userRank.Icon className={styles.rankImg} /> */}
      {showLevelIcon && <img src={levelIcon} className={styles.rankImg} />}
      <div style={{ maxWidth: '100%', width: '100%' }}>
        <h4 className={styles.title}>
          {/* <T id="common.rank" defaultMessage="Rank" /> {userRank.rank} */}
          <T id="common.Level" defaultMessage="Level" /> {_user?.level}
        </h4>
        <UserProgressBar
          className={styles.progress}
          height={isMinimal ? 8 : 16}
          color={progressBarColor}
          wagered={wagered}
          userLevel={_user?.level}
        />
        <div className={styles.rankInfo}>
          <div className={styles.earned}>
            <FormattedPrice
              value={levelEarned}
              className={styles.totalEarned}
            />{' '}
            /{' '}
            <FormattedPrice value={levelMaxEarned} />
          </div>
          {!isMinimal && nextUserRank && (
            <div className={styles.nextRank}>
              <img
                src={nextLevelIcon as string}
                className={styles.nextRankImg}
              />
              {/* <nextUserRank.Icon className={styles.nextRankImg} /> */}
              <span className={styles.nextText}>
                <T id="common.next" defaultMessage="Next" />
              </span>
            </div>
          )}
        </div>
        {!isMinimal && (
          <div className={styles.totalRewarded}>
            <T id="common.TotalWagered" defaultMessage="Total Wagered" />{' '}
            <strong>
              <FormattedPrice value={totalEarned} />
            </strong>
          </div>
        )}
      </div>
    </div>
  );
});
