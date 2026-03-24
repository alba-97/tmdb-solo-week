import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import resultsReducer from "./results";

const store = configureStore({
  reducer: {
    user: userReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
