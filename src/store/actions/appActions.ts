import { dispatcher } from '..';
import { accountLockPopupActions } from '../slices/accountLockPopup.slice';
import { appActions } from '../slices/appSlice';
import { caseBattleActions } from '../slices/caseBattleSlice';
import { rainTipPopupActions } from '../slices/rainTipPopup.slice';

export const closeChat = () => {
  dispatcher(appActions.toggleChatOpen(false));
};

export const openChat = () => {
  dispatcher(appActions.toggleChatOpen(true));
};

export const toggleSidebarOpen = () => {
  dispatcher(appActions.toggleSidebarExpanded());
};

export const collapseSidebar = () => {
  dispatcher(appActions.collapseSidebar());
};

export const openNotifications = () => {
  dispatcher(appActions.toggleNotificationsOpen(true));
};

export const closeNotifications = () => {
  dispatcher(appActions.toggleNotificationsOpen(false));
};

export const toggleNotifications = () => {
  dispatcher(appActions.toggleNotificationsOpen());
};

export const closeRain = () => {
  dispatcher(appActions.setRainVisible(false));
};

export const openRain = () => {
  dispatcher(appActions.setRainVisible(true));
};

export const openRainTipPopup = () => {
  dispatcher(rainTipPopupActions.open());
};

export const closeRainTipPopup = () => {
  dispatcher(rainTipPopupActions.close());
};

export const openAccountLockPopup = () => {
  dispatcher(accountLockPopupActions.open());
};

export const closeAccountLockPopup = () => {
  dispatcher(accountLockPopupActions.close());
};

export const openJoinLoungePopup = () => {
  dispatcher(caseBattleActions.setJoinSpectatorLoungeModalOpen(true));
};

export const closeJoinLoungePopup = () => {
  dispatcher(caseBattleActions.setJoinSpectatorLoungeModalOpen(false));
};