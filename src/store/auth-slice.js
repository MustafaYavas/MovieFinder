import { createSlice } from '@reduxjs/toolkit';

const initialAuthSlice = {
    isLoggedIn: false,
    token: '',
    userEmail: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthSlice,
    reducers: {
        loginHandler(state, action) {
            const authDatas = action.payload;
            state.isLoggedIn = true;
            state.token = authDatas.token;
            state.userEmail = authDatas.email;
        },

        logoutHandler(state) {
            state.isLoggedIn = false;
            state.token = '';
            state.userEmail = '';
            localStorage.removeItem('token');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
