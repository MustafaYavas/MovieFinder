import movieSlice from './movie-slice';
import authSlice from './auth-slice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: { movie: movieSlice.reducer, auth: authSlice.reducer },
});

export default store;
