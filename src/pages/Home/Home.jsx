import React, { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import CreateBoardDialog from "../../components/CreateBoardDialog/CreateBoardDialog";
import {
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOpenBoards, createBoard } from "./boardsSlice";

const Home = () => {
  const [boardNameInput, setBoardNameInput] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loader, boards, error } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getOpenBoards());
  }, []);

  const handleCreateBoard = async () => {
    setOpen(false);
    dispatch(createBoard({ boardNameInput }));
  };

  return (
    <Container>
      <Button
        variant="contained"
        sx={{ marginTop: "3rem" }}
        onClick={() => setOpen(true)}
      >
        Create
      </Button>

      <CreateBoardDialog
        open={open}
        setOpen={setOpen}
        handleCreateBoard={handleCreateBoard}
        boardNameInput={boardNameInput}
        setBoardNameInput={setBoardNameInput}
      />

      <Box marginTop="3rem">
        <Typography color="#ffffff" variant="h5">
          Your Workspace Boards
        </Typography>
        {loader ? (
          <Box display="flex" justifyContent={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : error ? (
          <Alert sx={{ margin: 2 }} severity="error">
            {error}
          </Alert>
        ) : (
          <Box display="flex" flexWrap="wrap">
            {boards.map((board) => (
              <Board key={board.id} board={board}></Board>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
