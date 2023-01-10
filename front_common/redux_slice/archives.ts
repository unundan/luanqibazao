import { createSlice } from "@reduxjs/toolkit";
export const archiveListSlice = createSlice({
  name: "archives",
  initialState: {
    value: [] as string[],
  },
  reducers: {
    update(state, action) {
      state.value = action.payload;
    },
  },
});

export const { update } = archiveListSlice.actions;

export default archiveListSlice.reducer;
