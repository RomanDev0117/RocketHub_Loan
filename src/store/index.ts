import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { setStore } from './getStore';
import {
  persistStore,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  FLUSH,
} from 'redux-persist';
import { steamItemsApi } from './slices/steamItemsSlice';
import { transactionsApi } from './slices/transactionsSlice';
import { authMiddleware } from './authMiddleware';
import { rockethubApi } from './slices/rockethubApi';

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    steamItemsApi.middleware,
    transactionsApi.middleware,
    rockethubApi.middleware,
    authMiddleware,
  ],
});

export const persistor = persistStore(store);

setStore(store);

export const useDispatch = () => useReduxDispatch();

export const dispatcher = store.dispatch;

export default store;

export type TAppState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<TAppState> = useReduxSelector;

export const getStore = () => store;
export const getAppState = () => store.getState();