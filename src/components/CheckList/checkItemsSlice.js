import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";

export const getCheckItems = createAsyncThunk('checkItems/getCheckItems', async ({ checkListId }, { rejectWithValue }) => {
    try {
        let res = await axios.get(
            `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to get checkItems : ${error.message}`)
        return rejectWithValue(`failed to get checkItems : ${error.message}`)
    }
})

export const createCheckItem = createAsyncThunk('checkItems/createCheckItem', async ({ checkListId, checkItemInput }, { rejectWithValue }) => {
    try {
        let res = await axios.post(
            `${baseURL}/checklists/${checkListId}/checkItems?name=${checkItemInput}&key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to create checkItem : ${error.message}`)
        return rejectWithValue(`failed to create checkItem : ${error.message}`)
    }
})

export const updateCheckItem = createAsyncThunk('checkItems/updateCheckItem', async ({ checkItem, cardId }, { rejectWithValue }) => {
    try {
        const newState =
            checkItem.state === "complete" ? "incomplete" : "complete";
        let res = await axios.put(
            `${baseURL}/cards/${cardId}/checkItem/${checkItem.id}?state=${newState}&key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`faild to update CheckItem, ${error.message}`);
        return rejectWithValue(`faild to update CheckItem, ${error.message}`);
    }
})

export const deleteCheckItem = createAsyncThunk('checkItems/deleteCheckItem', async ({ cardId, checkItemId }, { rejectWithValue }) => {
    try {
        let res = await axios.delete(
            `${baseURL}/cards/${cardId}/checkItem/${checkItemId}?key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to delete checkItem : ${error.message}`)
        return rejectWithValue(`failed to delete checkItem : ${error.message}`)
    }
})

const checkItemsSlice = createSlice({
    name: 'checkItems',
    initialState: {
        loaderByCheckListId: {},
        checkItemsByCheckListId: {},
        errorByCheckListId: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getCheckItems.pending, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.loaderByCheckListId[checkListId] = true;
        }).addCase(getCheckItems.fulfilled, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.checkItemsByCheckListId[checkListId] = action.payload;
            state.loaderByCheckListId[checkListId] = false;
        }).addCase(getCheckItems.rejected, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.loaderByCheckListId[checkListId] = false;
            state.errorByCheckListId[checkListId] = action.payload;
        }).addCase(createCheckItem.fulfilled, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.checkItemsByCheckListId[checkListId].push(action.payload);
        }).addCase(createCheckItem.rejected, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.errorByCheckListId[checkListId] = action.payload;
        }).addCase(updateCheckItem.fulfilled, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.checkItemsByCheckListId[checkListId].forEach(checkItem => {
                if (checkItem.id === action.payload.id) {
                    checkItem.state = action.payload.state;
                }
            });
        }).addCase(updateCheckItem.rejected, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.errorByCheckListId[checkListId] = action.payload;
        }).addCase(deleteCheckItem.fulfilled, (state, action) => {
            let { checkListId, checkItemId } = action.meta.arg;
            const index = state.checkItemsByCheckListId[checkListId].findIndex(checkItem => checkItem.id === checkItemId);
            if (index !== -1) {
                state.checkItemsByCheckListId[checkListId].splice(index, 1);
            }
        }).addCase(deleteCheckItem.rejected, (state, action) => {
            let { checkListId } = action.meta.arg;
            state.errorByCheckListId[checkListId] = action.payload;
        })
    }
})

export default checkItemsSlice.reducer;