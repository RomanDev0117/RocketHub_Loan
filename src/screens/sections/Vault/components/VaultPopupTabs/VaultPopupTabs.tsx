import { TTabsHeaderItem, TabsHeader } from '@/components/TabsHeader/TabsHeader';
import useTranslation from '@/hooks/useTranslation';
import styles from './VaultPopupTabs.module.scss';

type TProps = {
  tab: 'deposit' | 'withdraw';
  setTab: (tab: 'deposit' | 'withdraw') => void;
}

export const VaultPopupTabs = ({ tab, setTab }: TProps) => {
  const { t } = useTranslation();

  const tabs: TTabsHeaderItem<'deposit' | 'withdraw'>[] = [
    {
      label: t({ id: 'common.Deposit', defaultMessage: 'Deposit' }),
      value: 'deposit',
    },
    {
      label: t({ id: 'common.Withdraw', defaultMessage: 'Withdraw' }),
      value: 'withdraw',
    },
  ];

  return (
    <TabsHeader
      className={styles.container}
      items={tabs}
      tab={tab}
      onChange={(tab) => setTab(tab)}
    />
  );
};