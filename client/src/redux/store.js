import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import userSlice from "./slices/userSlice";
import todoSlice from "./slices/todoSlice";
import modalSlice from "./slices/modalSlice";
import bossSlice from "./slices/bossSlice";

const logger = createLogger();

const rootReducer = combineReducers({
  user: userSlice.reducer,
  todo: todoSlice.reducer,
  modal: modalSlice.reducer,
  boss: bossSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "development"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export default store;
