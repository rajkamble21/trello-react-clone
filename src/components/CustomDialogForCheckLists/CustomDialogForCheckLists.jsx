import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import CheckList from "../CheckList/CheckList";
import CustomTextField from "../CustomTextField/CustomTextField";
import { useSelector, useDispatch } from "react-redux";
import { getCheckLists, createCheckList } from "./checkListsSlice";

const CustomDialog = ({ openModal, setOpenModal, card }) => {
  const [createCheckListView, setCreateCheckListView] = useState(false);
  const [checkListNameInput, setCheckListNameInput] = useState("");
  const dispatch = useDispatch();

  let { loaderbyCardId, checkListsbyCardId, errorbyCardId } = useSelector(
    (state) => state.checkLists
  );

  let loader = loaderbyCardId[card.id];
  let checkLists = checkListsbyCardId[card.id];
  let error = errorbyCardId[card.id];

  useEffect(() => {
    dispatch(getCheckLists({ cardId: card.id }));
  }, []);

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="dialog-title"
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "40%",
          bgcolor: "#363e45",
          p: 2,
        },
      }}
    >
      <DialogTitle color="#cfd3d7" id="dialog-title">
        {card.name}
      </DialogTitle>
      {createCheckListView ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CustomTextField
            onChange={(e) => setCheckListNameInput(e.target.value)}
          />

          <CustomButton
            onClick={() => {
              setCreateCheckListView(false);
              dispatch(
                createCheckList({ cardId: card.id, checkListNameInput })
              );
            }}
            label={"Add"}
          />
          <CustomButton
            onClick={() => setCreateCheckListView(false)}
            label={"Cancel"}
          />
        </Box>
      ) : (
        <Box>
          <CustomButton
            onClick={() => setCreateCheckListView(true)}
            label={"Create CheckList"}
          />
        </Box>
      )}
      <DialogContent dividers sx={{ marginY: 3 }}>
        {loader ? (
          <Box display="flex" justifyContent={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : error ? (
          <Alert sx={{ margin: 2 }} severity="error">
            {error}
          </Alert>
        ) : checkLists && checkLists.length > 0 ? (
          checkLists.map((checkList) => (
            <CheckList checkList={checkList} key={checkList.id} />
          ))
        ) : (
          <Typography variant="body1" color="#cfd3d7">
            No checklists available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenModal(false)}
          color="primary"
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
