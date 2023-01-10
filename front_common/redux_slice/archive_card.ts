import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  GameProcess,
} from "../../common/server_types";

export const gameProcessesSlice = createSlice({
  name: "gameProcesses",
  initialState: {
    value: {
      servers: [] as GameProcess[],
    },
  },
  reducers: {
    update(state, action) {
      const server = state.value.servers.find(
        (v) =>
          v.archive === action.payload.archive &&
          v.serverType === action.payload.serverType
      );
      if (server) {
        server.serverStatus = action.payload.serverStatus;
      }
    },
    updateAll(state, action) {
        state.value = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.gameProcesses,
      };
    },
  },
});

export const { update, updateAll } = gameProcessesSlice.actions;

export default gameProcessesSlice.reducer;
