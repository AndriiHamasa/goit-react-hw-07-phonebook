import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,  
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  contactsReducer,
);


const reducer = {
  state: persistedReducer
}



export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
