import { useSelector } from 'react-redux';
import { selectUpgraderPopupOpened } from '../../../store/slices/upgrader.slice';

import { ModalWithSidebar } from '../../../components/ModalWithSidebar/ModalWithSidebar';
import { UpgraderPopupSidebar } from './UpgraderPopup.Sidebar/UpgraderPopup.Sidebar';
import { UpgrdaerItems } from '../../../components/Upgrader/Upgrader.Items/Upgrdaer.Items';
import { useUpgraderPopup } from '../../../hooks/useUpgraderPopup';

export const UpgraderPopup = () => {
  const isOpen = useSelector(selectUpgraderPopupOpened);
  const { close } = useUpgraderPopup();

  return (
    <ModalWithSidebar
      show={isOpen}
      onClose={() => close()}
      sidebarContent={<UpgraderPopupSidebar />}
    >
      <UpgrdaerItems isModal />
    </ModalWithSidebar>
  );
};