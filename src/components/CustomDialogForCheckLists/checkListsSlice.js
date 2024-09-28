import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";

export const getCheckLists = createAsyncThunk('checkLists/getCheckLists', async ({ cardId }, { rejectWithValue }) => {
    try {
        const res = await axios.get(
            `${baseURL}/cards/${cardId}/checklists?key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to get checkLists : ${error.message}`)
        return rejectWithValue(`failed to get checkLists : ${error.message}`)
    }
})

export const createCheckList = createAsyncThunk('checkLists/createCheckList', async ({ cardId, checkListNameInput }, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            `${baseURL}/cards/${cardId}/checklists?name=${checkListNameInput}&key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to create checkList : ${error.message}`)
        return rejectWithValue(`failed to create checkList : ${error.message}`)
    }
})

export const deleteCheckList = createAsyncThunk('checkLists/deleteCheckList', async ({ checkListId }, { rejectWithValue }) => {
    try {
        const res = await axios.delete(
            `${baseURL}/checklists/${checkListId}?key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log(`failed to delete checkList : ${error.message}`)
        return rejectWithValue(`failed to delete checkList : ${error.message}`)
    }
})

const checkListsSlice = createSlice({
    name: 'checkLists',
    initialState: {
        loaderbyCardId: {},
        checkListsbyCardId: {},
        errorbyCardId: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getCheckLists.pending, (state, action) => {
            let { cardId } = action.meta.arg;
            state.loaderbyCardId[cardId] = true;
        }).addCase(getCheckLists.fulfilled, (state, action) => {
            let { cardId } = action.meta.arg;
            state.loaderbyCardId[cardId] = false;
            state.checkListsbyCardId[cardId] = (action.payload);
        }).addCase(getCheckLists.rejected, (state, action) => {
            let { cardId } = action.meta.arg;
            state.loaderbyCardId[cardId] = false;
            state.errorbyCardId[cardId] = action.payload;
        }).addCase(createCheckList.fulfilled, (state, action) => {
            let { cardId } = action.meta.arg;
            state.checkListsbyCardId[cardId].push(action.payload);
        }).addCase(createCheckList.rejected, (state, action) => {
            let { cardId } = action.meta.arg;
            state.errorbyCardId[cardId] = action.payload;
        }).addCase(deleteCheckList.fulfilled, (state, action) => {
            let { checkListId, cardId } = action.meta.arg;
            let index = state.checkListsbyCardId[cardId].findIndex(checkList => checkList.id === checkListId);
            if (index !== -1) {
                state.checkListsbyCardId[cardId].splice(index, 1);
            }
        }).addCase(deleteCheckList.rejected, (state, action) => {
            let { cardId } = action.meta.arg;
            state.errorbyCardId[cardId] = action.payload;
        })
    }
})

export default checkListsSlice.reducer;