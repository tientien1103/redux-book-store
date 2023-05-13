import { configureStore } from "@reduxjs/toolkit";
import detailPageReducer from "../detailPageSlice";
import readingPageReducer from "../readingPageSlice";
import homePageReducer from "../homePageSlice";

export const store = configureStore({
  reducer: {
    detail: detailPageReducer,
    reading: readingPageReducer,
    home: homePageReducer,
  },
});
