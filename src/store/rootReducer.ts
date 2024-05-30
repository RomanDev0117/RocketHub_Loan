import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { appReducer, TAppReducerState } from "./slices/appSlice";
import { TUserState, userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { caseBattleReducer } from "./slices/caseBattleSlice";
import { caseDetailsPopupReducer } from "./slices/caseDetailsPopupSlice";
import { walletPopupReducer } from "./slices/walletPopupSlice";
import { steamItemsApi } from "./slices/steamItemsSlice";
import { transactionsApi } from "./slices/transactionsSlice";
import createTransform from "redux-persist/es/createTransform";
import { omit } from "lodash";
import { rockethubApi } from "./slices/rockethubApi";
import { tipPopupReducer } from "./slices/tipPopup.slice";
import { upgraderReducer } from "./slices/upgrader.slice";
import { wofReducer } from "./slices/wof.slice";
import { rainTipPopupReducer } from "./slices/rainTipPopup.slice";
import { accountLockPopupReducer } from "./slices/accountLockPopup.slice";
import { loanReducer } from "./slices/loan.slice";

const appPersistConfig = {
  key: "app",
  storage,
  whitelist: ["sidebarExpanded", "chatOpen", "soundEnabled"],
};

const blacklistTransform = createTransform((inboundState, key) => {
  if (key === "user") {
    return omit(inboundState as any, ["tradelink"]);
  } else {
    return inboundState;
  }
});

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [blacklistTransform],
};

const rootReducer = combineReducers({
  app: persistReducer<TAppReducerState>(
    appPersistConfig,
    appReducer as Reducer
  ),
  user: persistReducer<TUserState>(userPersistConfig, userReducer),
  caseBattle: caseBattleReducer,
  caseDetailsPopup: caseDetailsPopupReducer,
  walletPopup: walletPopupReducer,
  tipPopup: tipPopupReducer,
  rainTipPopup: rainTipPopupReducer,
  accountLockPopup: accountLockPopupReducer,
  upgrader: upgraderReducer,
  wheelOfFortune: wofReducer,
  loan: loanReducer,
  [steamItemsApi.reducerPath]: steamItemsApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  [rockethubApi.reducerPath]: rockethubApi.reducer,
});

export default rootReducer;
