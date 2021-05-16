import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const getDoctors = createAsyncThunk('doctors/get', async () => {
    const response = await fetch(config.baseUrl + '/user/active-doctors');
    const doctors = await response.json();
    return doctors;
});

const initialState = {
    doctors: [],
};

export const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getDoctors.fulfilled]: (state, action) => {
            state.doctors = action.payload;
        }
    }
});

export const {} = doctorsSlice.actions;

export default doctorsSlice.reducer;

//Selectors
export const selectDoctors = state => state.doctors.doctors;
