import clsx from 'clsx';
import { useGameItemData } from '../../../hooks/useGameItemData';
import { TSteamItem } from '../../../types/steam.types';
import { TWaxpeerItem } from '../../../types/waxpeer.types';
import { Truncate } from '../../Truncate/Truncate';
import styles from './Upgrader.Item.module.scss';
import { GlowIcon } from '../../icons/GlowIcon';
import { PriceWithCoin } from '../../PriceWithCoin/PriceWithCoin';
import { StarsIcon } from '@/components/icons/StarsIcon';

type TProps = {
  item: TWaxpeerItem | TSteamItem;
  selected: boolean;
  onClick?: () => void;
};

export const UpgraderItem = ({ onClick, selected, item }: TProps) => {
  const { imageUrl, color, price } = useGameItemData({
    item,
  });

  return (
    <div
      className={clsx(styles.container, {
        [styles.clickable]: Boolean(onClick),
        [styles.selected]: selected,
      })}
      style={
        {
          '--itemColor': color,
        } as any
      }
      onClick={onClick}
    >
      <img src={imageUrl} alt="Item image" className={styles.image} />

      <Truncate className={styles.itemName}>{item.name}</Truncate>
      <PriceWithCoin coinProps={{ shine: true }} className={styles.price}>{price}</PriceWithCoin>

      <div className={styles.elipseContainer}>
        <GlowIcon
          className={styles.glow}
          style={{ color: 'var(--itemColor)' }}
          lineColor={'transparent'}
        />
      </div>
      <div className={styles.line} />
      <StarsIcon className={styles.stars} />
    </div>
  );
};
