import React, { useState, useRef, useEffect } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { createList } from "../../pages/ListsPage/listsSlice";

const listStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  marginY: 1,
  fontSize: "1rem",
};

const AddAnotherList = ({ boardId }) => {
  let [isInputListOpen, setIsInputListOpen] = useState(false);
  const [listNameInput, setListNameInput] = useState("");
  const dispatch = useDispatch();
  let inputRef = useRef(null);

  useEffect(() => {
    if (isInputListOpen && inputRef) {
      inputRef.current.focus();
    }
  }, [isInputListOpen]);

  const handleAddList = () => {
    if (listNameInput) {
      dispatch(createList({ boardId, listNameInput }));
      setIsInputListOpen(false);
    }
  };

  return (
    <Box className="list-container-box" key={"new-list"}>
      {isInputListOpen ? (
        <>
          <Card className="card" sx={listStyle} key={"new-card"}>
            <input
              ref={inputRef}
              className="list-input"
              type="text"
              placeholder="Enter list name"
              onChange={(e) => setListNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddList();
                }
              }}
            />
          </Card>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button onClick={handleAddList} variant="contained" size="small">
              Add List
            </Button>
            <ClearIcon onClick={() => setIsInputListOpen(false)} />
          </Box>
        </>
      ) : (
        <Typography fontSize={"1rem"} onClick={() => setIsInputListOpen(true)}>
          + Add another list
        </Typography>
      )}
    </Box>
  );
};

export default AddAnotherList;
