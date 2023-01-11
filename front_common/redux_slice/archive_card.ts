import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  GameProcess,
} from "../../common/server_types";

export const gameProcessesSlice = createSlice({
  name: "gameProcesses",
  initialState: { value: [] as GameProcess[] },
  reducers: {
    update(state, action) {
      const serverIndex = state.value.findIndex(
        (v) =>
          v.archive === action.payload.archive &&
          v.serverType === action.payload.serverType
      );
      if (serverIndex >= 0) {
        state.value[serverIndex] = action.payload;
      }
    },
    updateAll(state, action) {
      state.value = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => {
      if (action.type === HYDRATE) {
        return {
          ...state,
          ...action.payload.gameProcesses,
        };
      }
    });
  },
});

export const { update, updateAll } = gameProcessesSlice.actions;

export default gameProcessesSlice.reducer;
