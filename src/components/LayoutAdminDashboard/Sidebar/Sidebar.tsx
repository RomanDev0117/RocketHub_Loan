import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useTranslation from '../../../hooks/useTranslation';
import { ButtonMenu, TButtonMenuProps } from '../../ButtonMenu/ButtonMenu';
import styles from './Sidebar.module.scss';
import { Dropdown } from '../../Dropdown/Dropdown';
import { ROUTE } from '../../../types/routeTypes.ts';
import { SettingsIcon } from '../../icons/SettingsIcon.tsx';
import { InfoCircleIconV2 } from '../../icons/InfoCircleIconV2.tsx';
import { CaseOpeningIcon } from '../../icons/CaseOpeningIcon.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/pro-solid-svg-icons';

// TODO: could probably be reused from LayoutProfile/Sidebar
export const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const items: TButtonMenuProps['items'] = [
    {
      children: t({
        id: 'common.featureFlagManagement',
        defaultMessage: 'Feature Flags',
      }),
      prepend: <SettingsIcon />,
      Component: NavLink,
      href: ROUTE.ADMIN_FEATURE_MANAGEMENT,
      end: true,
    },
    {
      children: t({
        id: 'common.ggrSectionTitle',
        defaultMessage: 'Gross Gaming Revenue',
      }),
      prepend: <InfoCircleIconV2 />,
      Component: NavLink,
      href: ROUTE.ADMIN_GGR,
      end: true,
    },
    {
      children: 'Cases',
      prepend: <CaseOpeningIcon />,
      Component: NavLink,
      href: ROUTE.ADMIN_CASES,
      end: true,
    },
    {
      children: 'Case Creator',
      prepend: <CaseOpeningIcon />,
      Component: NavLink,
      href: ROUTE.ADMIN_CASE_CREATOR,
      end: true,
    },
    {
      children: 'Coupons',
      prepend: <FontAwesomeIcon icon={faGift} />,
      Component: NavLink,
      href: ROUTE.ADMIN_COUPONS,
      end: true,
    }
  ];

  const options = items.map((item) => ({
    label: item.children,
    value: item.href || item.value,
  }));

  const selected = items.find((item) => item.href === location.pathname);

  return (
    <>
      <ButtonMenu
        items={items}
        color="secondary-v4"
        buttonGap={10}
        buttonClassName={styles.button}
      />
      <Dropdown
        value={selected?.href || selected?.value}
        options={options}
        className={styles.mobileMenu}
        onChange={(value) => navigate(value as string)}
      />
    </>
  );
};
