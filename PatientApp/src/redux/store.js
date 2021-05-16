import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user';
import doctorsReducer from './reducers/doctors';
import consultationReducer from './reducers/consultation';
import chatsReducer from './reducers/chats';

const store = configureStore({
    reducer: {
        user: userReducer,
        doctors: doctorsReducer,
        consultation: consultationReducer,
        chats: chatsReducer,
    },
});

export default store;
