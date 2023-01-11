import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import archivesReducer from "./redux_slice/archives";
import gameProcessesReducer from "./redux_slice/archive_card";

const makeStore = () => configureStore({
  reducer: {
    gameProcesses: gameProcessesReducer,
    archives: archivesReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
