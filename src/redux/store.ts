import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { Storage } from 'redux-persist/lib/types';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import { reducer } from './slice';

export interface CounterState{
     counter: {
       value: number[]
       postData: object
       data: object[]
  };
}

export interface PostData{
  Status: string
  CityDescription: string
  Description: string
}

const persistConfig = {
    key: 'nova_poshta',
    storage,
};

export const store = configureStore({
  reducer: {
     counter: persistReducer(persistConfig, reducer),
  },

  middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch