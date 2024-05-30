import clsx from 'clsx';
import { T } from '../../i18n/translate';
import { TUser } from '../../types/userTypes';
import { Avatar } from '../Avatar/Avatar';
import { Truncate } from '../Truncate/Truncate';
import styles from './UserShortInfo.module.scss';
import { TChatUser } from '../../types/chatTypes';
import { getLevelIcon } from '../../utils/level.utils';
import { TDuelPlayer } from '../../types/caseTypes';

type TProps = {
  user: TUser | TChatUser | TDuelPlayer;
  withRank?: boolean;
};

export const UserShortInfo = ({ user, withRank }: TProps) => {
  // const userRank = getUserRank(user);
  const levelIcon = getLevelIcon(user.level);

  return (
    <div className={clsx(styles.container, withRank && styles.withRank)}>
      <Avatar src={user.avatar} level={user.level} />
      <div className={styles.contentContainer}>
        <div className={styles.userName}>
          {withRank && <img src={levelIcon} className={styles.rankIcon} />}
          <Truncate>{user.name}</Truncate>
        </div>
        <div className={styles.level}>
          <T id="common.Level" defaultMessage="Level" /> {user.level}
        </div>
      </div>
    </div>
  );
};
