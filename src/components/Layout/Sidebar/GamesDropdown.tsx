import { List } from '../../List/List';
import sidebarStyles from './Sidebar.module.scss';
import styles from './GamesDropdown.module.scss';
import { NavLink } from 'react-router-dom';

type TProps = {
  onlyIcons?: boolean;
  games: {
    label: string;
    icon?: React.ReactNode;
    to: string;
  }[];
};

export const GamesDropdown = ({ onlyIcons, games }: TProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  // const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });


  return (
    <div className={styles.root}>
      <List
        className={styles.list}
        items={games}
        listItemClassName={sidebarStyles.listItem}
        onlyIcons={onlyIcons}
        Component={NavLink}
      />
    </div>
  );
};
