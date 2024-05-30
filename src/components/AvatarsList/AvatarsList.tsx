import { TDuelPlayer } from '../../types/caseTypes';
import { Avatar } from '../Avatar/Avatar';
import styles from './AvatarsList.module.scss';

type TProps = {
  players: Array<TDuelPlayer | undefined>;
  gap?: number;
  avatarSize?: number;
};

export const AvatarsList = ({ players, avatarSize, gap = 0 }: TProps) => {
  return (
    <div style={{ gap }} className={styles.container}>
      {players.map((player) => {
        if (!player) return null;
        return (
          <Avatar
            key={player.steamid}
            src={player.avatar}
            alt={player.name}
            size={avatarSize}
            className={styles.avatar}
            level={player.level}
          />
        );
      })}
    </div>
  );
};
