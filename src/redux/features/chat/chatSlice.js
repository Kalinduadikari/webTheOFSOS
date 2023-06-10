import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: {}, // A dictionary where the key is the roomId and the value is an array of messages
    isLoading: false,
    isError: false,
    message: "",
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { roomId, message } = action.payload;
            if (!state.chats[roomId]) {
                state.chats[roomId] = [];
            }
            state.chats[roomId].push(message);
        },
        setMessages: (state, action) => {
            const { roomId, messages } = action.payload;
            state.chats[roomId] = messages;
        },
        setError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { addMessage, setMessages, setError, setLoading } = chatSlice.actions;

export default chatSlice.reducer;
