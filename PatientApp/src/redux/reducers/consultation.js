import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const getProposals = createAsyncThunk('consultation/getProposals', async () => {
    const response = await fetch(config.baseUrl + '/consultation');
    const responseJSON = await response.json();
    return responseJSON.map(res => ({...res._doc, consultation: res.consultation}));
});

export const answer = createAsyncThunk('consultation/answer', async params => {
    const response = await fetch(config.baseUrl + '/consultation/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            answer: params.answer,
            consult_id: params.consult_id,
            doctor_id: params.doctor_id,
            patient_id: params.patient_id,
        }),
    });
    const resJSON = await response.json();
});

export const finish = createAsyncThunk('consultation/finish', async params => {
    const response = await fetch(config.baseUrl + '/consultation/finish/' + params.consultationId);
    const resJSON = await response.json();
    console.log(resJSON);
})

const initialState = {
    proposals: [],
};

export const consultationSlice = createSlice({
    name: 'consultation',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProposals.fulfilled]: (state, action) => {
            state.proposals = action.payload;
        },
    }
});

export const {} = consultationSlice.actions;

export default consultationSlice.reducer;

//Selectors
export const selectProposals = state => state.consultation.proposals;
