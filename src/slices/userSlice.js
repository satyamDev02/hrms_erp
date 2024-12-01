import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        sidebarW: false,  
        liHover: false,   
    },
    reducers: {
        setSidebarW: (state, action) => {
            state.sidebarW = action.payload;  
        },
        setLiHover: (state, action) => {
            state.liHover = action.payload;  
        }
    },
});

export const { setSidebarW, setLiHover } = userSlice.actions; 
export default userSlice.reducer;
