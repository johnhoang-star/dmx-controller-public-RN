import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';

import groupReducer from '../reducers/groupReducer.js';
import bleManagerReducer from '../reducers/bleManagerReducer.js';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['groups'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ groups: groupReducer, bleManager: bleManagerReducer })
);
