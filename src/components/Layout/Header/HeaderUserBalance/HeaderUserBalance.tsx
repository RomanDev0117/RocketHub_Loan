import { FormattedPrice } from '@/components/FormattedPrice/FormattedPrice';
import { CoinIcon } from '@/components/icons/CoinIcon';
import { useIsMobileHeader } from '@/hooks/useMediaHooks';
import { usePrevious } from '@/hooks/usePrevious';
import { useSounds } from '@/hooks/useSounds';
import { selectIsLoggedIn, selectUserBalance } from '@/store/slices/userSlice';
import { friendlyFormat } from '@/utils/number.utils';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './HeaderUserBalance.module.scss';

export const HeaderUserBalance = memo(() => {
  const [localBalance, setLocalBalance] = useState(0);
  const [deltaBalance, setDeltaBalance] = useState(0);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const balance = useSelector(selectUserBalance);
  const prevBalance = usePrevious(balance);
  const isMobile = useIsMobileHeader();

  // uncomment to debug balance animation
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     dispatch(userActions.setBalance(balance + 10.5));
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [balance]);

  // initial state
  useEffect(() => {
    if (!isLoggedIn) return;
    setLocalBalance(balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // sound logic
  const [playSound] = useSounds();
  useEffect(() => {
    if (prevBalance && prevBalance < balance) {
      playSound('coin');
    }
  }, [balance]);

  // animation logic
  useEffect(() => {
    const diff = balance - (prevBalance || balance);
    if (prevBalance && diff > 0) {
      setDeltaBalance(diff);
      setAnimationStep('new');

      const timerId = setTimeout(() => {
        setAnimationStep('normal');
        setLocalBalance(balance);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      setLocalBalance(balance);
    }
  }, [balance]);

  const [animationStep, setAnimationStep] = useState<'normal' | 'new'>(
    'normal'
  );

  return (
    <span className={styles.container}>
      <div
        className={clsx(styles.priceAnimationContainer, {
          [styles.flipHorizontalTop]: animationStep === 'new',
        })}
      >
        <div className={styles.normalPrice}>
          <CoinIcon />{' '}
          {isMobile && localBalance > 9999.99 ? (
            <span>{friendlyFormat(localBalance)}</span>
          ) : (
            <FormattedPrice value={localBalance} fontWeight={800} />
          )}
        </div>

        <FormattedPrice
          prefix="+"
          className={styles.newPrice}
          value={deltaBalance}
          fontWeight={900}
        />
      </div>
    </span>
  );
});
