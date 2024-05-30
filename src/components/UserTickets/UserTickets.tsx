import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/pro-solid-svg-icons';
import clsx from 'clsx';
import styles from './UserTickets.module.scss';

type TProps = { 
  tickets: number; 
  className?: string 
};

export const UserTickets = ({ tickets, className }: TProps) => {
  return (
    <div className={clsx(className, styles.container)}>
      <FontAwesomeIcon icon={faGem} fontSize={16} />
      {tickets}
    </div>
  );
};
