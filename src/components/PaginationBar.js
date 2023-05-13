import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchData } from "../homePageSlice";
import { useDispatch } from "react-redux";

const PaginationBar = ({ pageNum, query, totalPageNum }) => {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(fetchData({ page: value, query: query }));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
