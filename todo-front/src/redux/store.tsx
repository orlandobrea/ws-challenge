import { createStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);


