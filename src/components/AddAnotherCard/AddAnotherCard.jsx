import React, { useState, useRef, useEffect } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createCard } from "../List/cardsSlice";
import { useDispatch } from "react-redux";

const cardStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  fontSize: "1rem",
};

const AddAnotherCard = ({ listId }) => {
  let [isInputCardOpen, setIsInputCardOpen] = useState(false);
  let [cardNameInput, setCardNameInput] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInputCardOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputCardOpen]);

  const handleAddCard = () => {
    if (cardNameInput) {
      dispatch(createCard({ listId, cardNameInput }));
      setIsInputCardOpen(false);
    }
  };

  return (
    <>
      {isInputCardOpen ? (
        <>
          <Card className="card" sx={cardStyle} key={"new-card"}>
            <input
              ref={inputRef}
              className="card-input"
              type="text"
              placeholder="Enter card name"
              onChange={(e) => setCardNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCard();
                }
              }}
            />
          </Card>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button onClick={handleAddCard} variant="contained" size="small">
              Add card
            </Button>
            <ClearIcon onClick={() => setIsInputCardOpen(false)} />
          </Box>
        </>
      ) : (
        <Typography
          onClick={() => setIsInputCardOpen(true)}
          fontSize={"1rem"}
          marginTop={1}
          sx={{ cursor: "pointer" }}
        >
          + Add a card
        </Typography>
      )}
    </>
  );
};

export default AddAnotherCard;
