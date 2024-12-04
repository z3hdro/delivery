import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { appReducer, geoReducer, notificationReducer, orderReducer } from 'store/slices';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['persistedDevice']
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    app: appReducer,
    order: orderReducer,
    geo: geoReducer,
    notification: notificationReducer
  })
);

export const store =  configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

