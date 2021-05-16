import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create } from 'react-test-renderer';
import config from '../../config.json';

export const login = createAsyncThunk('user/login', async params => {
    const response = await fetch(config.baseUrl + '/auth/dlogin', {
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
    const responseJSON = await response.json();
    return {token, user: responseJSON};
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
            roles: ['doctor'],
        }),
    });
    const responseLogin = await fetch(config.baseUrl + '/auth/dlogin', {
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

export const getAllComplaints = createAsyncThunk('user/getAllComplaint', async () => {
    const response = await fetch(config.baseUrl + '/complaints', {
        method: 'GET',
    });
    const complaints = response.json();
    return complaints;
});

export const updateUserData = createAsyncThunk('user/updateData', async params => {
    const response = await fetch(config.baseUrl + '/user/update/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: params._id,
            firstname: params.firstname,
            lastname: params.lastname,
        }),
    });
    const status = response.status;
    return status;
});

export const uploadAvatar = createAsyncThunk('user/avatar', async params => {
    const response = await fetch(config.baseUrl + '/user/' + params.user_id + '/avatar', {
        method: 'POST',
        body: params.formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const userResponse = await fetch(config.baseUrl + '/user/' + params.user_id);
    const userJSON = await userResponse.json();
    return userJSON;
});

export const refreshUser = createAsyncThunk('user/refresh', async params => {
    const response = await fetch(config.baseUrl + '/user/' + params.user_id);
    const resJSON = await response.json();
    return resJSON;
});

export const proposeConsultation = createAsyncThunk('user/proposeConsultation', async params => {
    const response = await fetch(config.baseUrl + '/consultation', {
        method: 'POST',
        body: JSON.stringify({
            proposeTo: params.proposeTo,
            proposeFrom: params.proposeFrom,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const resJSON = await response.json();
    return resJSON;
});

const initialState = {
    _id: undefined,
    token: undefined,
    error: undefined,
    loading: false,
    username: '',
    firstname: '',
    lastname: '',
    avatar: '',
    avatarUploading: false,
    userLoading: false,
    complaints: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveFirstname: (state, action) => {
            state.firstname = action.payload;
        },
        saveLastname: (state, action) => {
            state.lastname = action.payload;
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.loading = false;
            state.username = action.payload.user.email;
            state._id = action.payload.user._id;
            state.firstname = action.payload.user.firstname;
            state.lastname = action.payload.user.lastname;
            state.avatar = action.payload.user.avatar;
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
        },
        [getAllComplaints.fulfilled]: (state, action) => {
            state.complaints = action.payload;
        },
        [uploadAvatar.fulfilled]: (state, action) => {
            state.avatar = action.payload.avatar;
            state.avatarUploading = false;
        },
        [uploadAvatar.pending]: (state) => {
            state.avatarUploading = true;
        },
        [refreshUser.fulfilled]: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.avatar = action.payload.avatar;
            state.userLoading = false;
        },
        [refreshUser.pending]: (state) => {
            state.userLoading = true;
        },
    }
});

export const {
    saveFirstname,
    saveLastname,
} = userSlice.actions;

export default userSlice.reducer;

//Selectors

export const selectUser = state => state.user;
export const selectToken = state => state.user.token;
export const selectLoading = state => state.user.loading;
export const selectComplaints = state => state.user.complaints;
