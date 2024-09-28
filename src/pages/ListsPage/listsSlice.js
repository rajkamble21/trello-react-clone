import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, token, baseURL } from "../../apiConfig/apiConfig";


export const getLists = createAsyncThunk("lists/getLists", async ({ boardId }, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${baseURL}/boards/${boardId}/lists?key=${apiKey}&token=${token}&fields=id,name`)
        return res.data;
    } catch (error) {
        console.log("faild to get lists", error);
        return rejectWithValue(`faild to get lists : ${error.message}`)
    }
})

export const createList = createAsyncThunk("lists/createList", async ({ boardId, listNameInput }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${baseURL}/lists?name=${listNameInput}&idBoard=${boardId}&key=${apiKey}&token=${token}`);
        return { id: res.data.id, name: res.data.name }
    } catch (error) {
        console.log("faild to create list", error);
        return rejectWithValue(`faild to create list : ${error.message}`)
    }
})

export const archiveList = createAsyncThunk("lists/archiveList", async ({ listId }, { rejectWithValue }) => {
    try {
        const res = await axios.put(
            `${baseURL}/lists/${listId}/closed?value=true&key=${apiKey}&token=${token}`
        )
        return res.data;
    } catch (error) {
        console.log("faild to archive list", error);
        return rejectWithValue(`faild to archive list : ${error.message}`)
    }
})


const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        loader: null,
        lists: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getLists.pending, (state) => {
            state.loader = true;
        }).addCase(getLists.fulfilled, (state, action) => {
            state.loader = false;
            state.lists = action.payload;
        }).addCase(getLists.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        }).addCase(createList.fulfilled, (state, action) => {
            state.lists.push(action.payload);
        }).addCase(createList.rejected, (state, action) => {
            state.error = action.payload;
        }).addCase(archiveList.fulfilled, (state, action) => {
            const index = state.lists.findIndex((list) => list.id === action.payload.id);
            if (index !== -1) {
                state.lists.splice(index, 1);
            }
        }).addCase(archiveList.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export default listsSlice.reducer;