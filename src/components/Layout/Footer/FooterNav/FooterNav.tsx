import { useSelector } from 'react-redux';
import { ROUTE } from '../../../../types/routeTypes';
import { getProfileReferralsPath } from '../../../../utils/url.utils';
import { List } from '../../../List/List';
import styles from './FooterNav.module.scss';
import { selectUserSteamId } from '../../../../store/slices/userSlice';
import { FooterSocialLinks } from '../FooterSocialLinks/FooterSocialLinks';

export const FooterNav = () => {
  const steamId = useSelector(selectUserSteamId);

  const links1 = [
    { label: 'Rewards', Component: 'h4', className: styles.title },
    steamId ? { label: 'Affiliates', to: getProfileReferralsPath(steamId) } : null,
    { label: 'Rewards', to: ROUTE.REWARDS },
    { label: 'Leaderboard', to: ROUTE.DAILY_RACE },
  ];

  const links2 = [
    { label: 'Games', Component: 'h4', className: styles.title },
    // { label: 'Jackpot', to: ROUTE.HOME },
    { label: 'Case Opening', to: ROUTE.CASE_OPENING },
    { label: 'Case Battles', to: ROUTE.CASE_BATTLES },
  ];

  const links3 = [
    { label: 'Other', Component: 'h4', className: styles.title },
    // { label: 'FAQ', to: ROUTE.HOME },
    { label: 'Terms of Service', to: ROUTE.TERMS_OF_USE },
    { label: 'Refund Policy', to: ROUTE.REFUND_POLICY },
    { label: 'Privacy Policy', to: ROUTE.PRIVACY_POLICY },
    { label: 'Provably fair', to: ROUTE.PROVABLY_FAIR },
    { label: 'AML Policy', to: ROUTE.AML_POLICY },
    { label: 'For Kinguin', to: '#' },
  ];

  return (
    <nav className={styles.nav}>
      <List items={links1} gap={12} listItemClassName={styles.navItem} />
      <List items={links2} gap={12} listItemClassName={styles.navItem} />
      <List items={links3} gap={12} listItemClassName={styles.navItem} />
      <FooterSocialLinks className={styles.mobileOnly} />
    </nav>
  );
};
