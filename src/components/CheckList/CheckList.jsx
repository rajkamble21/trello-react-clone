import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from "../CustomTextField/CustomTextField";
import CheckItem from "../CheckItem/CheckItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteCheckList } from "../CustomDialogForCheckLists/checkListsSlice";
import { getCheckItems, createCheckItem } from "./checkItemsSlice";

const CheckList = ({ checkList }) => {
  let [addCheckItemView, setAddCheckItemView] = useState(false);
  let [checkItemInput, setCheckItemInput] = useState("");

  const dispatch = useDispatch();
  let { loaderByCheckListId, checkItemsByCheckListId, errorByCheckListId } =
    useSelector((state) => state.checkItems);

  let loader = loaderByCheckListId[checkList.id];
  let checkItems = checkItemsByCheckListId[checkList.id];
  let error = errorByCheckListId[checkList.id];

  useEffect(() => {
    dispatch(getCheckItems({ checkListId: checkList.id }));
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="#cfd3d7" gutterBottom>
          {checkList.name}
        </Typography>

        <CustomButton
          onClick={() =>
            dispatch(
              deleteCheckList({
                checkListId: checkList.id,
                cardId: checkList.idCard,
              })
            )
          }
          label={"Delete"}
        />
      </Box>
      <Box sx={{ ml: 2 }} display="flex" flexDirection="column">
        {loader ? (
          <Box display="flex" justifyContent={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : error ? (
          <Alert sx={{ margin: 2 }} severity="error">
            {error}
          </Alert>
        ) : (
          checkItems &&
          checkItems.map((item) => (
            <CheckItem key={item.id} item={item} cardId={checkList.idCard} />
          ))
        )}
        {addCheckItemView ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              onChange={(e) => setCheckItemInput(e.target.value)}
            />
            <CustomButton
              onClick={() => {
                setAddCheckItemView(false);
                dispatch(
                  createCheckItem({
                    checkListId: checkList.id,
                    checkItemInput,
                  })
                );
              }}
              label={"Add"}
            />
            <CustomButton
              onClick={() => setAddCheckItemView(false)}
              label={"Cancel"}
            />
          </Box>
        ) : (
          <Box>
            <CustomButton
              onClick={() => setAddCheckItemView(true)}
              label={"Add"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CheckList;
