import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CircularProgress, Typography, Box } from "@mui/material";
import CustomDialogForCheckLists from "../CustomDialogForCheckLists/CustomDialogForCheckLists";
import { deleteCard } from "../List/cardsSlice";
import { useDispatch } from "react-redux";

const cardStyle = {
  backgroundColor: "#1e2222",
  color: "#cfd3d7",
  padding: 1,
  fontSize: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "10px",
  cursor: "pointer",
};

const CustomCard = ({ card }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Card
        className="card"
        onClick={() => setOpenModal(true)}
        sx={cardStyle}
        key={card.id}
      >
        <Box wordWrap="break-word" whiteSpace="normal" maxWidth="90%">
          {card.name}
        </Box>
        {loading ? (
          <CircularProgress size={24} style={{ color: "#cfd3d7" }} />
        ) : (
          <DeleteIcon
            onClick={(e) => {
              setLoading(true);
              e.stopPropagation();
              dispatch(deleteCard({ cardId: card.id, listId: card.idList }));
            }}
            className="deleteIcon"
          />
        )}
      </Card>
      <CustomDialogForCheckLists
        openModal={openModal}
        setOpenModal={setOpenModal}
        card={card}
      />
    </>
  );
};

export default CustomCard;
