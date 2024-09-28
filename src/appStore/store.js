import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../pages/Home/boardsSlice";
import listsReducer from "../pages/ListsPage/listsSlice";
import cardsReducer from "../components/List/cardsSlice";
import checkListsReducer from "../components/CustomDialogForCheckLists/checkListsSlice";
import CheckItemsReducer from "../components/CheckList/checkItemsSlice";

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        cards: cardsReducer,
        checkLists: checkListsReducer,
        checkItems: CheckItemsReducer,
    }
})