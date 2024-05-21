import { configureStore,combineReducers } from '@reduxjs/toolkit'
import Loginreducer from './LoginSlice'
import AdminLoginresducer from './Admin'
import CompanyLoginReducer from './CompanySlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'logindata',
  version: 1,
  storage,
}
const Rootreducer = combineReducers({
  login: Loginreducer,
  admin: AdminLoginresducer,
  company:CompanyLoginReducer
})

const persistedReducer = persistReducer(persistConfig,Rootreducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)