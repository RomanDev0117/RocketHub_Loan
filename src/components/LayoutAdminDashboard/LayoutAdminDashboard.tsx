import { Outlet } from 'react-router-dom';
import styles from './LayoutAdminDashboard.module.scss';
import { Sidebar } from './Sidebar/Sidebar';
import { Title1 } from '../Typography/Typography';

export const Component = () => {
  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>Dashboard</Title1>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
