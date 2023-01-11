import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
export const archiveListSlice = createSlice({
  name: "archives",
  initialState: {
    value: [] as string[]
  },
  reducers: {
    update(state, action) {
      state.value = action.payload;
      // return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => {
      if (action.type === HYDRATE) {
        return {
          ...state,
          ...action.payload.archives,
        };
      }
    });
  },
});

export const { update } = archiveListSlice.actions;

export default archiveListSlice.reducer;
