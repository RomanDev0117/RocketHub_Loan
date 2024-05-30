import styles from './GameList.module.scss';
import { GameItem, TGame } from '../GameItem/GameItem';

type TProps = {
  games: TGame[];
};

export const GameList = ({ games }: TProps) => {
  return (
    <div className={styles.root}>
      {games.map((game) => {
        return <GameItem game={game} key={game.id} />;
      })}
    </div>
  );
};
