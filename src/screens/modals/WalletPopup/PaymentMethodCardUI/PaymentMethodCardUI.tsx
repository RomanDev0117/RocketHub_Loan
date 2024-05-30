import { ReactNode } from 'react';
import styles from './PaymentMethodCardUI.module.scss';
import clsx from 'clsx';
import { FreeCrateBadge } from './components/FreeCrateBadge/FreeCrateBadge';
import { PaymentBadge } from '@/types/payment.types';

type TProps = {
  className?: string;
  image: ReactNode;
  title: ReactNode;
  gradientColor?: string;
  glowImage?: string;
  rotate?: boolean;
  onClick: () => void;
  children?: ReactNode;
  badge?: PaymentBadge | null;
};

export const PaymentMethodCardUI = ({
  className,
  image,
  title,
  rotate,
  onClick,
  glowImage,
  badge,
  children,
}: TProps) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <div className={clsx(styles.container, className)}>
        <div
          className={clsx(styles.imageContainer, {
            [styles.rotate]: rotate,
          })}
        >
          <span className={styles.innerImageContainer}>{image}</span>
          {glowImage && <img src={glowImage} className={styles.glow} />}

        </div>

        <h4 className={styles.title}>{title}</h4>
      </div>
      {children}

      {badge === PaymentBadge.FREE_CRATE && <FreeCrateBadge />}
    </div>
  );
};
