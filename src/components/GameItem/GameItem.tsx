import clsx from 'clsx';
import placeholder from '../../assets/images/games/placeholder.v2.png';
import { ID } from '../../types/commonTypes';
import styles from './GameItem.module.scss';
import { Link } from 'react-router-dom';

type TProps = {
  game: TGame;
};

export type TGame = {
  id: ID;
  name: string;
  type?: string;
  image?: string;
  shadowColor?: string;
  textBg?: string;
  to?: string;
  className?: string;
};

export const GameItem = ({ game }: TProps) => {
  const {
    shadowColor = 'rgba(110, 121, 135, 0.45)',
    name,
    type,
    image = placeholder,
    textBg,
    to,
  } = game;
  const isPlaceholder = type === 'placeholder';

  const Component = to ? Link : 'div';
  const rootProps = {
    style: { '--shadow': shadowColor } as React.CSSProperties,
    ...(to ? { to } : undefined),
  } as any;

  return (
    <Component
      {...rootProps}
      className={clsx(
        game.className,
        styles.root,
        isPlaceholder && styles.placeholder,
        Boolean(to) && styles.clickable
      )}
    >
      <img src={image} className={styles.image} />
      <div className={styles.textContainer} style={{ background: textBg }}>
        <h4 className={styles.title}>{name}</h4>
        {!isPlaceholder && (
          <div className={styles.creator}>
            {/* <VectorIcon /> */}
            Rockethub
          </div>
        )}
      </div>
    </Component>
  );
};
