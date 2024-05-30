import { Badge } from '../../../../components/Badge/Badge';
import styles from './PaymentMethodTitle.module.scss';

type TProps = {
  children: React.ReactNode;
  discounted?: string;
}

export const PaymentMethodTitle = ({ children, discounted }: TProps) => {
  return (
    <h4 className={styles.title}>
      <span className={styles.text}>{children}</span>
      {discounted && (
        <Badge color="success" height={24} className={styles.badge}>
          {discounted}
        </Badge>
      )}
    </h4>
  );
};