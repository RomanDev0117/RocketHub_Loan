import { Avatar } from '../Avatar/Avatar';
import { TGlobalUser } from '../../types/userTypes';
import styles from './UserDetails.Line.module.scss';
import { UserName } from '../User.Name/User.Name';
import { UserLevelIcon } from '../User.LevelIcon/User.LevelIcon';
import { Truncate } from '../Truncate/Truncate';
import clsx from 'clsx';

type TProps = {
  user: TGlobalUser;
  center?: boolean;
  className?: string;
};

export const UserDetailsLine = ({ user, center, className }: TProps) => {
  return (
    <div
      className={clsx(styles.container, className, {
        [styles.center]: center,
      })}
    >
      <Avatar size={36} src={user.avatar} level={user.level} />
      <UserLevelIcon size={25} user={user} />
      <Truncate>
        <UserName user={user} className={styles.userName} />
      </Truncate>
    </div>
  );
};
