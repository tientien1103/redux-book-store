import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bookLoading, getBookDone } from "../detailPageSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const loading = useSelector((state) => state.detail.loading);
  const book = useSelector((state) => state.detail.book);
  const dispatch = useDispatch();
  const params = useParams();
  const bookId = params.id;

  const fetchData = (bookId) => async (dispatch) => {
    dispatch(bookLoading());
    try {
      const res = await api.get(`/books/${bookId}`);
      dispatch(getBookDone(res.data));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(bookLoading());
  };

  const addToReadingList = (book) => {
    // setAddingBook(book);
    dispatch(addBook(book));
  };
  const addBook = (addingBook) => {
    return async (dispatch) => {
      dispatch(bookLoading());

      try {
        await api.post(`/favorites`, addingBook);
        toast.success("The book has been added to the reading list!");
      } catch (error) {
        toast.error(error.message);
      }
      dispatch(bookLoading());
    };
  };

  useEffect(() => {
    dispatch(fetchData(bookId));
  }, [bookId, dispatch]);
  // useEffect(() => {
  //   const postData = async () => {
  //     if (!addingBook) return;
  //     setLoading(true);
  //     try {
  //       await api.post(`/favorites`, addingBook);
  //       toast.success("The book has been added to the reading list!");
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //     setLoading(false);
  //   };
  //   postData();
  // }, [addingBook]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get(`/books/${bookId}`);
  //       setBook(res.data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [bookId]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
