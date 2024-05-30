import { useFormContext } from 'react-hook-form';
import { TextField } from '../../../../../../components/Form/TextField/TextField';
import { PriceWithCoin } from '../../../../../../components/PriceWithCoin/PriceWithCoin';
import { Truncate } from '../../../../../../components/Truncate/Truncate';
import styles from './AdminCaseItem.module.scss';
import { CrossIcon } from '../../../../../../components/icons/CrossIcon';
import { parseNumber } from '../../../../../../utils/validation.utils';
import { ChangeEvent } from 'react';
import { TCreateNewCaseItem } from '@/types/api/api.types';
import { getImageUrl } from '@/utils/url.utils';

type TProps = {
  item: TCreateNewCaseItem;
};

export const AdminCaseItem = ({ item }: TProps) => {
  const { watch, setValue } = useFormContext();
  // const { itemName, imageUrl, price } = useGameItemData({ item });
  const itemName = item.name;
  const imageUrl = getImageUrl(item.image);
  const price = item.price;

  const handleDeleteClick = () => {
    const items = watch('selectedItems');
    setValue(
      'selectedItems',
      items.filter((i: TCreateNewCaseItem) => i.name !== item.name)
    );
  };

  const handleChange = (data: ChangeEvent<HTMLInputElement>) => {

    const parsedValue = parseNumber(data.target.value, `${item.percentage}`, {
      decimals: 2,
      max: 100,
    });

    const items = watch('selectedItems');
    setValue(
      'selectedItems',
      items.map((i: TCreateNewCaseItem) => {
        if (i.name !== item.name) return i;
        return {
          ...i,
          percentage: parsedValue,
        };
      }),
      { shouldValidate: true }
    );
  };

  return (
    <div className={styles.container}>
      <span className={styles.deleteButton} onClick={handleDeleteClick}>
        <CrossIcon />
      </span>

      <img src={imageUrl} alt="image" className={styles.image} />
      <div className={styles.content}>
        <Truncate>{itemName}</Truncate>
        <PriceWithCoin>{price}</PriceWithCoin>
        <TextField
          height={32}
          value={`${item.percentage}`}
          suffix="%"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
