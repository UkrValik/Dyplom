import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config.json';

export const uploadDocument = createAsyncThunk('document/upload', async params => {
    const postResponse = await fetch(config.baseUrl + '/documents/add', {
        method: 'POST',
        body: params.formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const postJSON = await postResponse.json();
    const getResponse = await fetch(config.baseUrl + '/documents/' + postJSON.user._id);
    const getJSON = await getResponse.json();
    return getJSON;
});

export const getAllDocuments = createAsyncThunk('document/getAll', async params => {
    const getResponse = await fetch(config.baseUrl + '/documents/' + params.user_id);
    const getJSON = await getResponse.json();
    return getJSON;
});

export const deleteDocument = createAsyncThunk('document/delete', async params => {
    const deleteResponse = await fetch(config.baseUrl + '/documents/' + params.document_id, {
        method: 'DELETE',
    });
    const deleteJSON = await deleteResponse.json();
    return deleteJSON;
})

const initialState = {
    documents: [],
    error: null,
    loading: false,
};

export const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {

    },
    extraReducers: {
        [uploadDocument.fulfilled]: (state, action) => {
            state.documents = action.payload;
            state.loading = false;
            state.error = null;
        },
        [uploadDocument.pending]: (state, action) => {
            state.loading = true;
        },
        [uploadDocument.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAllDocuments.fulfilled]: (state, action) => {
            state.documents = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getAllDocuments.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllDocuments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [deleteDocument.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.documents = action.payload;
        },
        [deleteDocument.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    },
});

export const {} = documentsSlice.actions;

export default documentsSlice.reducer;

//Selectors

export const selectDocuments = state => state.documents.documents;
export const selectDocumentsError = state => state.documents.error;
export const selectDocumentsLoading = state => state.documents.loading;
