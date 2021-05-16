import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user';
import chatsReducer from './reducers/chats';

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatsReducer,
    },
});

export default store;
