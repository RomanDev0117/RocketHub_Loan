import { useDispatch, useSelector } from 'react-redux';
import {
  selectUpgraderSelectedItems,
  upgraderActions,
} from '../../../store/slices/upgrader.slice';
import styles from './Upgrader.Controls.Display.module.scss';
import { useGameItemData } from '../../../hooks/useGameItemData';
import { PriceWithCoin } from '../../PriceWithCoin/PriceWithCoin';

import { Truncate } from '../../Truncate/Truncate';
import { UpgraderControlsCircle } from '../Upgrader.Controls.Circle/Upgrader.Controls.Circle';
import { TextTitle1 } from '../../Typography/Typography';
import { isWaxpeerItem } from '../../../utils/app.utils';
import { getWaxpeerItemPrice } from '../../../utils/waxpeer.utils';
import { useMemo, useRef } from 'react';
import { isEmpty } from 'lodash';
import { UpgraderArrow } from '../Upgrader.Arrow/Upgrader.Arrow';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import Transition from '../../Transition';
import { getItemsTotalPrice } from '../upgrader.utils';

type TProps = {
  isModal?: boolean;
};

export const UpgraderControlsDisplay = ({ isModal }: TProps) => {
  const dispatch = useDispatch();
  const items = useSelector(selectUpgraderSelectedItems);
  const { watch, formState } = useFormContext();
  const win = watch('win', null);
  const winTicket = watch('winTicket', null);
  const chance = watch('chance', 0);
  // const betAmount = watch('betAmount', 0);
  // const rollType = useSelector(selectUpgraderRollType);

  const { mostExpensiveItem, totalPrice } = useMemo(() => {
    const mostExpensiveItem = [...items].sort((a, b) => {
      const priceA = isWaxpeerItem(a) ? getWaxpeerItemPrice(a) : a.price;
      const priceB = isWaxpeerItem(b) ? getWaxpeerItemPrice(b) : b.price;

      return priceB - priceA;
    })[0];

    const totalPrice = getItemsTotalPrice(items);

    return {
      mostExpensiveItem,
      totalPrice,
    };
  }, [items]);

  const isItemSelected = Boolean(mostExpensiveItem);
  const { color, imageUrl } = useGameItemData({
    item: mostExpensiveItem,
  });

  // const gameEnded = typeof win === 'boolean';
  const originalItemColor = color || '#de5000';
  let itemColor = originalItemColor;
  if (win === false) {
    itemColor = 'red';
  } else if (win === true) {
    itemColor = 'var(--green)';
  }

  // const ticket = getTicketByBetAmount(betAmount as number, items);
  // const calculatedTicket = rollType === RollType.Under ? UPGRADER_TICKETS_AMOUNT - ticket : ticket;

  const handleClearItemsClick = () => {
    if (formState.isSubmitting) {
      return;
    }
    dispatch(upgraderActions.clearItemsSelection());
  };

  return (
    <div
      className={clsx(styles.container, {
        // [styles.won]: gameEnded,
        [styles.isModal]: isModal,
      })}
      style={{ '--itemColor': itemColor, '--originalItemColor': originalItemColor } as any}
    >
      <div className={styles.content}>
        <Transition
          show={Boolean(mostExpensiveItem)}
          hideOverflow
          removeChildren
          opacity={false}
          scale={true}
          className={styles.contentTransition}
        >
          <div
            className={styles.contentInner}
            onClick={handleClearItemsClick}
          >
            <h4 className={styles.itemName}>
              <Truncate>{mostExpensiveItem?.name}</Truncate>
              {items.length > 1 && (
                <span style={{ marginLeft: 8 }}> +{items.length - 1}</span>
              )}
            </h4>
            <div className={styles.imageContainer}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Item image"
                  className={clsx(styles.image, {
                    [styles.steamImage]: !isWaxpeerItem(mostExpensiveItem),
                    [styles.withTicket]: Boolean(winTicket),
                  })}
                />
              )}
              <WinTicket />
            </div>
            {totalPrice > 0 && (
              <PriceWithCoin iconSize={28} className={styles.price} gap={10}>
                {totalPrice}
              </PriceWithCoin>
            )}

            {isItemSelected && (
              <>
                <span className={styles.chance}>
                  {chance}% chance
                </span>
                {/* <span className={styles.rollText}>
                  Roll {rollType} {calculatedTicket}
                </span> */}
              </>
            )}
          </div>
        </Transition>


      </div>

      {/* <Transition show={isEmpty(items)}> */}
      {isEmpty(items) && (
        <TextTitle1 className={styles.placeholderText}>
          Select an item
        </TextTitle1>
      )}
      {/* </Transition> */}

      <UpgraderControlsCircle isModal={isModal} />
      <UpgraderArrow isModal={isModal} />
    </div>
  );
};


const WinTicket = () => {
  const { watch } = useFormContext();
  const winTicket = watch('winTicket', null);

  const ticketRef = useRef(winTicket);

  if (winTicket && winTicket !== ticketRef.current) {
    ticketRef.current = winTicket;
  }

  return (
    <span className={clsx(styles.winTicket, {
      [styles.visible]: Boolean(winTicket),
    })}>
      Your Roll
      <span>{winTicket}</span>
    </span>
  );
};