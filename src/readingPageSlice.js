import { createSlice } from "@reduxjs/toolkit";
import api from "./apiService";
import { toast } from "react-toastify";

export const readingPageSlice = createSlice({
  name: "reading",
  initialState: {
    books: null,
    loading: false,
  },
  reducers: {
    bookLoading(state) {
      state.loading = !state.loading;
    },
    getBookDone(state, action) {
      state.books = action.payload;
    },
    removeBookDone(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});
export const { bookLoading, getBookDone, removeBookDone } =
  readingPageSlice.actions;

export const fetchData = (bookId) => async (dispatch) => {
  dispatch(bookLoading());

  try {
    const res = await api.get(`/favorites`);
    dispatch(getBookDone(res.data));
  } catch (error) {
    toast.error(error.message);
  }
  dispatch(bookLoading());
};

export const removedBook = (removedBookId) => {
  return async (dispatch) => {
    dispatch(bookLoading());
    try {
      await api.delete(`/favorites/${removedBookId}`);
      dispatch(removeBookDone(removedBookId));
      toast.success("The book has been removed");
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(bookLoading());
  };
};

export default readingPageSlice.reducer;
