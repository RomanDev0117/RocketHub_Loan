import { startCase, toLower } from 'lodash';
import { TCase } from '../../types/caseTypes';
import { getSteamImageUrl, getUploadUrl } from '../../utils/url.utils';
import { Truncate } from '../Truncate/Truncate';
import styles from './SidebarItem.module.scss';
import { XCircleIcon } from '../icons/XCircleIcon';
import { TSteamItem } from '../../types/steam.types';
import { TWaxpeerItem } from '../../types/waxpeer.types';
import { getWaxpeerItemPrice } from '../../utils/waxpeer.utils';
import { isSteamItem, isWaxpeerItem } from '../../utils/app.utils';
import { TSkinsBackCsGoItem } from '../../types/skinsback.types';
import { PriceWithCoin } from '../PriceWithCoin/PriceWithCoin';

type TProps<T> = {
  data: T;
  amount?: number;
  imageSize?: number;
  onDelete?: () => void;
};

type TData = {
  image: string | undefined;
  title: string;
  price?: number;
};

export const SidebarItem = <T extends TCase | TSteamItem | TWaxpeerItem | TSkinsBackCsGoItem>({
  data,
  amount,
  imageSize = 64,
  onDelete,
}: TProps<T>) => {
  let _data: TData;

  if ('items' in data) {
    _data = caseDataToData(data);
  } else if (isSteamItem(data)) {
    _data = steamDataToData(data);
  } else if (isWaxpeerItem(data)) {
    _data = waxpeerDataToData(data);
  } else {
    _data = skinsBackCsGoItemToData(data);
  }

  const amountVisible = typeof amount === 'number' && amount > 1;
  const hasAmountContainer = Boolean(onDelete) || amountVisible;

  return (
    <div
      className={styles.container}
      style={{ '--image-size': `${imageSize}px` } as any}
    >
      <div className={styles.imageContainer}>
        <img src={_data.image} className={styles.thumbnail} />
      </div>

      <div className={styles.content}>
        <h5 className={styles.title}>
          <Truncate>{startCase(toLower(_data.title))}</Truncate>
        </h5>
        <PriceWithCoin className={styles.price} fontWeight={500}>
          {_data.price || 0}
        </PriceWithCoin>
      </div>
      {hasAmountContainer && (
        <div className={styles.amountContainer}>
          {amountVisible && <div className={styles.amount}>{amount}x</div>}
          {onDelete && (
            <XCircleIcon
              className={styles.deleteButton}
              onClick={() => onDelete()}
            />
          )}
        </div>
      )}
    </div>
  );
};

const caseDataToData = (caseData: TCase): TData => {
  return {
    image: getUploadUrl(caseData.image),
    title: caseData.title,
    price: caseData.price,
  };
};

const steamDataToData = (item: TSteamItem): TData => {
  return {
    image: getSteamImageUrl(item.image),
    title: item.name,
    price: item.price,
  };
};

const waxpeerDataToData = (item: TWaxpeerItem): TData => {
  return {
    image: item.img,
    title: item.name,
    price: getWaxpeerItemPrice(item),
  };
};

const skinsBackCsGoItemToData = (item: TSkinsBackCsGoItem): TData => {
  return {
    image: item.image,
    title: item.name,
    price: item.price,
  };
};
