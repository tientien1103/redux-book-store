import { createSlice } from "@reduxjs/toolkit";

export const detailPageSlice = createSlice({
  name: "detail",
  initialState: {
    book: null,
    loading: false,
  },
  reducers: {
    bookLoading(state) {
      state.loading = !state.loading;
    },
    getBookDone(state, action) {
      state.book = action.payload;
    },
  },
});

export const { bookLoading, getBookDone } = detailPageSlice.actions;
export default detailPageSlice.reducer;
