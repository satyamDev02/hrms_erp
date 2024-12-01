// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice'; // Import the job slice

const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer // Add the job reducer to the store
    }
});

export default store;
