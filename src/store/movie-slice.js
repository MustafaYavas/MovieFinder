import { createSlice } from '@reduxjs/toolkit';

const initialMovieState = {
    searchKey: '',
    startingPageMovies: [],
    userMovieList: []
}

const movieSlice = createSlice({
    name: 'movies',
    initialState: initialMovieState,
    reducers: {
        changeSearchKey(state, action) {
            state.searchKey = action.payload;
        },
        changestartingPageMovies(state, action) {
            state.startingPageMovies = action.payload
        },
        addMovieToList(state, action) {
            const movie = action.payload;
            const isExist = state.userMovieList.find((item) => (item.id === movie.id) && (item.user === movie.user));
            
            if(!isExist){
                state.userMovieList.push({
                    id: movie.id,
                    poster: movie.poster,
                    title: movie.title, 
                    rate: movie.rate, 
                    releaseDate: movie.releaseDate, 
                    addDate: movie.addDate,
                    user: movie.user
                })
            } 
            
        },
        replaceMovieList(state, action) {
            state.userMovieList = action.payload;  
        },
        clearMovieList(state) {
            state.userMovieList = []
        }, 
        removeMovieFromList(state, action) {
            const {id, user} = action.payload;
            
            const newList = state.userMovieList.filter(movie => (movie.user !== user || movie.id !== id))
            state.userMovieList = newList;
        }
    }
});

export const movieActions = movieSlice.actions;
export default movieSlice;
