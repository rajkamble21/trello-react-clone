import React, { useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddAnotherCard from "../AddAnotherCard/AddAnotherCard";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { archiveList } from "../../pages/ListsPage/listsSlice";
import { getCards } from "../../components/List/cardsSlice";

const List = ({ list }) => {
  const dispatch = useDispatch();
  let { loaderByListId, cardsByListId, errorByListId } = useSelector(
    (state) => state.cards
  );

  const cards = cardsByListId[list.id];
  const loader = loaderByListId[list.id];
  const error = errorByListId[list.id];

  useEffect(() => {
    dispatch(getCards({ listId: list.id }));
  }, []);

  return (
    <>
      <Box className="list-container-box" key={list.id}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ cursor: "pointer" }} variant="h6">
            {list.name}
          </Typography>
          <Tooltip title="archive">
            <IconButton
              onClick={() => dispatch(archiveList({ listId: list.id }))}
              sx={{ color: "#ffffff" }}
            >
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={1} marginTop={2}>
          {loader ? (
            <Box display="flex" justifyContent={"center"}>
              <CircularProgress></CircularProgress>
            </Box>
          ) : error ? (
            <Alert sx={{ margin: 2 }} severity="error">
              {error}
            </Alert>
          ) : (
            cards && cards.map((card) => <Card key={card.id} card={card} />)
          )}
          <AddAnotherCard listId={list.id} />
        </Box>
      </Box>
    </>
  );
};

export default List;
