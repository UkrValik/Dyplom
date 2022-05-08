import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const login = createAsyncThunk('user/login', async params => {
    const response = await fetch(config.baseUrl + '/auth/plogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.username,
            password: params.password,
        }),
    });
    const user = await response.json();
    if (user.statusCode === 400) {
        throw new Error('Wrong credentials');
    }
    const complaintResponse = await fetch(config.baseUrl + '/complaints/' + user.complaint);
    const complaint = await complaintResponse.json();
    const token = response.headers.get('set-cookie').split('=')[1].split(';')[0];
    return {token, user, complaint};
});

export const register = createAsyncThunk('user/register', async params => {
    const registerResponse = await fetch(config.baseUrl + '/auth/register', {
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
    const registerResponseJSON = await registerResponse.json();
    if (registerResponseJSON.statusCode === 400) {
        throw new Error('User already exists');
    }
    const responseLogin = await fetch(config.baseUrl + '/auth/plogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: params.username,
            password: params.password,
        }),
    });
    const responseLoginJSON = await responseLogin.json();
    const complaintResponse = await fetch(config.baseUrl + '/complaints/' + responseLoginJSON.complaint);
    const complaint = await complaintResponse.json();
    const token = responseLogin.headers.get('set-cookie').split('=')[1].split(';')[0];
    return { token, user: responseLoginJSON, complaint };
});

export const publishComplaintData = createAsyncThunk('user/publishComplaintData', async params => {
    const response = await fetch(config.baseUrl + '/complaints', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: params.text,
            doctor: params.doctor,
            dateTime: params.publishDate,
            published: params.published,
        }),
    });
    console.log(response.status());
    return 're';
});

export const publishComplaint = createAsyncThunk('user/publishComplaint', async params => {
    const response = await fetch(config.baseUrl + '/complaints/publish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dateTime: params.date,
        }),
    });
    const status = response.status;
    return status;
});

export const hideComplaint = createAsyncThunk('user/hideComplaint', async params => {
    const response = await fetch(config.baseUrl + '/complaints/hide', {
        method: 'POST',
    });
    const status = response.status;
    return status;
});

export const getComplaint = createAsyncThunk('user/getComplaint', async params => {
    const response = await fetch(config.baseUrl + '/complaints/' + params.id, {
        method: 'GET',
    });
    const complaint = await response.json();
    return complaint;
});

const initialState = {
    _id: undefined,
    token: undefined,
    error: undefined,
    loading: false,
    username: '',
    complaint: {
        _id: '',
        text: '',
        doctor: '',
        publishDate: '',
        published: false,
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveComplaintText: (state, action) => {
            state.complaint.text = action.payload;
        },
        saveComplaintDoctor: (state, action) => {
            state.complaint.doctor = action.payload;
        },
        savePublishDate: (state, action) => {
            state.complaint.publishDate = action.payload;
        },
        saveError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.loading = false;
            state.complaint._id = action.payload.user.complaint;
            state.username = action.payload.user.email;
            state._id = action.payload.user._id;
            state.complaint.text = action.payload.complaint.text;
            state.complaint.doctor = action.payload.complaint.doctor;
            state.complaint.published = action.payload.complaint.published;
            state.complaint.publishDate = action.payload.complaint.dateTime;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.loading = false;
            state.error = undefined;
            state.complaint._id = action.payload.user.complaint;
            state.username = action.payload.user.email;
            state._id = action.payload.user._id;
            state.complaint.text = action.payload.complaint.text;
            state.complaint.doctor = action.payload.complaint.doctor;
            state.complaint.published = action.payload.complaint.published;
            state.complaint.publishDate = action.payload.complaint.dateTime;
        },
        [register.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [register.pending]: (state) => {
            state.loading = true;
        },
        [publishComplaintData.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
        [getComplaint.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.complaint.text = action.payload.text;
        },
        [publishComplaint.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
        [hideComplaint.fulfilled]: (state, action) => {
            console.log(action.payload);
        }
    }
});

export const {
    saveComplaintText,
    saveComplaintDoctor,
    savePublishDate,
    saveError,
} = userSlice.actions;

export default userSlice.reducer;

//Selectors
export const selectUser = state => state.user;
export const selectToken = state => state.user.token;
export const selectLoading = state => state.user.loading;
export const selectComplaint = state => state.user.complaint;
export const selectError = state => state.user.error;
