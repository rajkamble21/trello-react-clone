import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert } from "@mui/material";
import List from "../../components/List/List";
import AddAnotherList from "../../components/AddAnotherList/AddAnotherList";
import { useSelector, useDispatch } from "react-redux";
import { getLists } from "./listsSlice";

const ListsPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { loader, lists, error } = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists({ boardId: id }));
  }, []);

  return (
    <Box
      sx={{
        marginTop: 6,
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%",
        height: "85vh",
      }}
    >
      {loader ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress></CircularProgress>
        </Box>
      ) : error ? (
        <Alert sx={{ margin: 2 }} severity="error">
          {error}
        </Alert>
      ) : lists.length > 0 ? (
        <>
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <AddAnotherList boardId={id} />
        </>
      ) : (
        <AddAnotherList boardId={id} />
      )}
    </Box>
  );
};

export default ListsPage;
