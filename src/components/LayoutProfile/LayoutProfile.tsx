import { Outlet } from 'react-router-dom';
import styles from './LayoutProfile.module.scss';
import { Sidebar } from './Sidebar/Sidebar';
import { Title1 } from '../Typography/Typography';

export const LayoutProfile = () => {
  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>Profile</Title1>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
