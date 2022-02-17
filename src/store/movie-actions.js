import { movieActions } from "./movie-slice";


export const fetchMovieData = () => {
    return async(dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://movies-2ce3f-default-rtdb.firebaseio.com/movielist/movie.json');
            if(!response.ok) {
                throw new Error('fetching movie data failed!');
            }
            
            const data = await response.json();
            return data;
        }

        try {
            const movieData = await fetchData();
            
            dispatch(movieActions.replaceMovieList(movieData || []));
        } catch (error) {
            console.log(error);
        }
    }
}


export const sendCartData = (data) => {
    return async() => {
        const sendRequest = async() => {
            const response = await fetch('https://movies-2ce3f-default-rtdb.firebaseio.com/movielist.json', {
                method: 'PUT',
                body: JSON.stringify({
                    movie: data
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if(!response.ok) {
                throw new Error('Sending Movie Datas Failed!');
            }
        }
        
        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        }
    }


}