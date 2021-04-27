import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const login = createAsyncThunk('user/login', async params => {
    const response = await fetch(config.baseUrl + '/auth/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.username,
            password: params.password,
        }),
    });
    const token = response.headers.get('set-cookie').split('=')[1].split(';')[0];
    return token;
});

export const register = createAsyncThunk('user/register', async params => {
    await fetch(config.baseUrl + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.username,
            password: params.password,
            roles: ['patient'],
        }),
    });
    const responseLogin = await fetch(config.baseUrl + '/auth/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.username,
            password: params.password,
        }),
    });
    const token = responseLogin.headers.get('set-cookie').split('=')[1].split(';')[0];
    return token;
});

const initialState = {
    token: undefined,
    error: undefined,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
        },
        [register.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [register.pending]: (state) => {
            state.loading = true;
        }
    }
});

export const {
    saveToken
} = userSlice.actions;

export default userSlice.reducer;

//Selectors
export const selectToken = state => state.user.token;
export const selectLoading = state => state.user.loading;
