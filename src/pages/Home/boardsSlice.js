import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";

export const getOpenBoards = createAsyncThunk('boards/fetchBoards', async (_, { rejectWithValue }) => {
    try {
        let res = await axios.get(`${baseURL}/members/me/boards?key=${apiKey}&token=${token}&filter=open`);
        return res.data;
    } catch (error) {
        console.log("failed to get boards", error)
        return rejectWithValue(`failed to get boards : ${error.message}`);
    }
})

export const createBoard = createAsyncThunk('boards/createBoards', async ({boardNameInput}, { rejectWithValue }) => {
    try {
        let res = await axios.post(`${baseURL}/boards/?name=${boardNameInput}&key=${apiKey}&token=${token}`);
        return res.data;
    } catch (error) {
        console.log("failed to create boards", error)
        return rejectWithValue(`failed to create boards : ${error.message}`)
    }
})

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        loader: null,
        boards: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getOpenBoards.pending, (state) => {
            state.loader = true;
        }).addCase(getOpenBoards.fulfilled, (state, action) => {
            state.loader = false;
            state.boards = action.payload;
        }).addCase(getOpenBoards.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        }).addCase(createBoard.fulfilled, (state, action) => {
            state.boards.push(action.payload);
        }).addCase(createBoard.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export default boardsSlice.reducer;