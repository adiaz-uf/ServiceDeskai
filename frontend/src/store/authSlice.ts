import { createSlice } from '@reduxjs/toolkit';

// Load inital state from localStorage
const initialState = {
    accessToken: localStorage.getItem('userAccessToken') || null,
    isAuthenticated: !!localStorage.getItem('userAccessToken'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { accessToken, user } = action.payload;
            
            // save store
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.user = user;
            
            // save in localstorage
            localStorage.setItem('userAccessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
        },
        
        logout: (state) => {
            // Clean store
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;

            // Clean localstorage
            localStorage.removeItem('userAccessToken');
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;