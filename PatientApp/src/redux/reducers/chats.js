import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const getChats = createAsyncThunk('chats/get', async () => {
    const chatsResponse = await fetch(config.baseUrl + '/chatroom/all-user-chats');
    const chats = await chatsResponse.json();
    return chats;
});

const initialState = {
    chats: [],
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        saveMessage: (state, action) => {
            const currchat = state.chats.find(chat => chat._id === action.payload.chat_id);
            const index = state.chats.indexOf(currchat);
            state.chats[index].messages.push(action.payload.message);
        },
    },
    extraReducers: {
        [getChats.fulfilled]: (state, action) => {
            state.chats = action.payload;
        }
    }
});

export const {
    saveMessage,
} = chatsSlice.actions;

export default chatsSlice.reducer;

//Selectors
export const selectChats = state => state.chats.chats;
