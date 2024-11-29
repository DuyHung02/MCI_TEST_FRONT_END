import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { authReducer } from '@/redux/slices/authSlice';
import storage from './storages/storage';

// configure which key we want to persist
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
  transforms: [
    encryptTransform({
      secretKey: process.env.NEXT_PUBLIC_SECRET_KEY_STORAGE || 'CMI_TEST',
      onError: () => {},
    }),
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
