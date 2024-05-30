import { Title28 } from '../../../../components/Typography/Typography';
import { UpgraderControls } from '../../../../components/Upgrader/Upgrader.Controls/Upgrader.Controls';
import styles from './UpgraderPopup.Sidebar.module.scss';

export const UpgraderPopupSidebar = () => {
  return (
    <>
      <Title28 className={styles.title}>Upgrader</Title28>
      <UpgraderControls className={styles.upgraderControls} isModal={true} />
    </>
  );
};