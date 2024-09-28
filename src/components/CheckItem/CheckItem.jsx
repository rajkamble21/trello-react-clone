import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteCheckItem, updateCheckItem } from "../CheckList/checkItemsSlice";

let checkItemBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:hover .delete-button": {
    visibility: "visible",
  },
};

const CheckItem = ({ item, cardId }) => {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <Box sx={checkItemBoxStyle}>
      <FormControlLabel
        key={item.id}
        control={
          <Checkbox
            checked={item.state === "complete"}
            sx={{ color: "#cfd3d7" }}
            onChange={() =>
              dispatch(
                updateCheckItem({
                  checkItem: item,
                  checkListId: item.idChecklist,
                  cardId,
                })
              )
            }
          />
        }
        label={item.name}
        sx={{ color: "#cfd3d7" }}
      />
      {loading ? (
        <CircularProgress size={24} style={{ color: "#cfd3d7" }} />
      ) : (
        <IconButton
          aria-label="delete"
          className="delete-button"
          sx={{
            visibility: "hidden",
            color: "#cfd3d7",
          }}
          onClick={() => {
            setLoading(true);
            dispatch(
              deleteCheckItem({
                checkItemId: item.id,
                cardId,
                checkListId: item.idChecklist,
              })
            );
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default CheckItem;
