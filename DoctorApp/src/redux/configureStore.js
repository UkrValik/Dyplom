import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user';
import chatsReducer from './reducers/chats';
import documentsReducer from './reducers/documents';

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatsReducer,
        documents: documentsReducer,
    },
});

export default store;
