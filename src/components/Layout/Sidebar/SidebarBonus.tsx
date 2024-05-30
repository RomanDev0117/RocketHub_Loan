import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/pro-solid-svg-icons';
import { selectSidebarExpanded } from '../../../store/slices/appSlice';
import clsx from 'clsx';
import styles from './SidebarBonus.module.scss';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../types/routeTypes';

export const SidebarBonus = () => {
  const expanded = useSelector(selectSidebarExpanded);

  return (
    <Link to={ROUTE.REWARDS} className={styles.root}>
      <button className={clsx(styles.collapsedButton, !expanded && styles.visible)}>
        <FontAwesomeIcon icon={faHandHoldingHeart} fontSize={24} />
      </button>
      <div className={clsx(styles.bonusFull, expanded && styles.visible)}>
        <div className={styles.innerContainer}>
          NEW <br />
          BONUS!
          <button className={styles.button}>Claim</button>
        </div>
      </div>
    </Link>
  );
};
