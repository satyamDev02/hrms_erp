import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

export const fetchJobs = createAsyncThunk('Jobs/fetchList', async () => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening/list`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    });
    return response.data.job_opening;
});

export const fetchJobDetail = createAsyncThunk('Jobs/fetchDetail', async (id) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, id,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    });
    return response.data;
});

export const createJob = createAsyncThunk('Jobs/create', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
});


export const updateJob = createAsyncThunk('Jobs/update', async ({ id, data }) => {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, data, { 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    });
    return response.data;
});


const jobSlice = createSlice({
    name: 'Jobs',
    initialState: {
        list: [], 
        detail: {}, 
        status: 'idle', 
        error: null,
    },
    reducers: {
        addJobForm: (state, action) => {
            state.list.push(action.payload); 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.list = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => { 
                state.status = 'failed';
                state.error = action.error.message; 
            })
            .addCase(fetchJobDetail.fulfilled, (state, action) => { 
                state.detail = action.payload; 
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.list.push(action.payload); 
            })
            .addCase(updateJob.fulfilled, (state, action) => { 
                const index = state.list.findIndex((item) => item.id === action.payload.id); 
                state.list[index] = action.payload;
            });
    }
});

export const { addJobForm } = jobSlice.actions;
export default jobSlice.reducer;

