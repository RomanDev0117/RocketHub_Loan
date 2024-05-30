import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import useTranslation from '../../../hooks/useTranslation';
import { logout } from '../../../utils/auth.utils';
import { ButtonMenu, TButtonMenuProps } from '../../ButtonMenu/ButtonMenu';
import styles from './Sidebar.module.scss';
import { getProfileBetHistoryPath, getProfilePath, getProfileReferralsPath, getProfileTransactionsPath } from '../../../utils/url.utils';
import { DocumentWithLinesIcon } from '../../icons/DocumentWithLinesIcon';
import { CreditCardIcon } from '../../icons/CreditCardIcon';
import { LogoutIcon } from '../../icons/LogoutIcon';
import { PeopleGroupIcon } from '../../icons/PeopleGroupIcon';
import { Dropdown } from '../../Dropdown/Dropdown';

export const Sidebar = () => {
  const { steamId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();


  const items: TButtonMenuProps['items'] = [
    {
      children: t({ id: 'common.Details', defaultMessage: 'Details' }),
      prepend: <DocumentWithLinesIcon className={styles.icon} />,
      Component: NavLink,
      href: getProfilePath(steamId),
      end: true,
    },
    {
      children: t({ id: 'common.Transactions', defaultMessage: 'Transactions' }),
      prepend: <CreditCardIcon />,
      Component: NavLink,
      href: getProfileTransactionsPath(steamId),
      end: true,
    },
    {
      children: t({ id: 'common.BetHistory', defaultMessage: 'Bet History' }),
      prepend: <CreditCardIcon />,
      Component: NavLink,
      href: getProfileBetHistoryPath(steamId),
      end: true,
    },
    {
      children: t({ id: 'common.Referrals', defaultMessage: 'Referrals' }),
      prepend: <PeopleGroupIcon className={styles.icon} />,
      Component: NavLink,
      href: getProfileReferralsPath(steamId),
      end: true,
    },
    {
      children: t({ id: 'common.Logout', defaultMessage: 'Log out' }),
      prepend: <LogoutIcon />,
      onClick: () => logout(),
      value: 'logout',
    }
  ];

  const options = items.map(item => ({
    label: item.children,
    value: item.href || item.value,
  }));

  const selected = items.find(item => item.href === location.pathname);

  return (
    <>
      <ButtonMenu items={items} color="secondary-v4" buttonClassName={styles.button} />
      <Dropdown
        value={selected?.href || selected?.value}
        options={options}
        className={styles.mobileMenu}
        onChange={(value) => {
          if (value === 'logout') {
            logout();
          } else {
            navigate(value as string);
          }
        }}
      />
    </>
  );
};