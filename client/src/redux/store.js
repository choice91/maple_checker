import { useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userSlice from './slices/userSlice';
import questSlice from './slices/questSlice';

const logger = createLogger();

const rootReducer = combineReducers({
  user: userSlice.reducer,
  quest: questSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export default store;
