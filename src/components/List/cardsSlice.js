import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";
import axios from "axios";


export const getCards = createAsyncThunk("cards/getCards", async ({ listId }, { rejectWithValue }) => {
    try {
        const res = await axios.get(
            `${baseURL}/lists/${listId}/cards?key=${apiKey}&token=${token}&fields=name,id,idList`
        );
        return res.data;
    } catch (error) {
        console.log("failed to getCards", error);
        return rejectWithValue(`failed to getCards : ${error.message}`)

    }
})

export const createCard = createAsyncThunk("cards/createCard", async ({ listId, cardNameInput }, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            `${baseURL}/cards?idList=${listId}&name=${cardNameInput}&key=${apiKey}&token=${token}`
        );
        return { id: res.data.id, name: res.data.name, idList: res.data.idList }
    } catch (error) {
        console.log("failed to createCard", error);
        return rejectWithValue(`failed to createCard : ${error.message}`);
    }
})

export const deleteCard = createAsyncThunk("cards/deleteCard", async ({ cardId }, { rejectWithValue }) => {
    try {
        let res = await axios.delete(
            `${baseURL}/cards/${cardId}?key=${apiKey}&token=${token}`
        );
        return res.data;
    } catch (error) {
        console.log("failed to deleteCard", error);
        return rejectWithValue(`failed to deleteCard : ${error.message}`);
    }
})

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        loaderByListId: {},
        cardsByListId: {},
        errorByListId: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getCards.pending, (state, action) => {
            let { listId } = action.meta.arg;
            state.loaderByListId[listId] = true;
        }).addCase(getCards.fulfilled, (state, action) => {
            let { listId } = action.meta.arg;
            state.loaderByListId[listId] = false;
            state.cardsByListId[listId] = action.payload;
        }).addCase(getCards.rejected, (state, action) => {
            let { listId } = action.meta.arg;
            state.loaderByListId[listId] = false;
            state.errorByListId[listId] = action.payload;
        }).addCase(createCard.fulfilled, (state, action) => {
            let { listId } = action.meta.arg;
            state.cardsByListId[listId].push(action.payload);
        }).addCase(createCard.rejected, (state, action) => {
            let { listId } = action.meta.arg;
            state.errorByListId[listId] = action.payload;
        }).addCase(deleteCard.fulfilled, (state, action) => {
            let { listId, cardId } = action.meta.arg;
            let index = state.cardsByListId[listId].findIndex((card) => card.id === cardId);
            if (index !== -1) {
                state.cardsByListId[listId].splice(index, 1);
            }
        }).addCase(deleteCard.rejected, (state, action) => {
            let { listId } = action.meta.arg;
            state.errorByListId[listId] = action.payload;
        })
    }
})

export default cardsSlice.reducer;