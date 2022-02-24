import MovieItem from './MovieItem';
import { movieActions } from '../../store/movie-slice';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './Movies.module.css';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


const Movies = () => {
    const dispatch = useDispatch();
    const movieState = useSelector(state => state.movie);
    const [startingMovies ,setStartingMovies] = useState('popular');
    const [header, setHeader] = useState('Populars Recently');
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        const getMovieResults = async() => {
            setIsLoading(true);
            let response;
            if(movieState.searchKey.length === 0) {
                if(startingMovies === 'popular'){
                    response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Popular Movies');
                } else if(startingMovies === 'top') {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Top Rated Movies');
                } else if(startingMovies === 'up') {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Upcoming Movies');
                } else {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Now Playing');
                } 
                dispatch(movieActions.changestartingPageMovies(response.data.results));
                
            } else {
                response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${movieState.searchKey}&page=1&include_adult=false`);
                dispatch(movieActions.changestartingPageMovies(response.data.results));
            }
            setIsLoading(false);
        }
        getMovieResults();
        
    }, [movieState.searchKey, dispatch, startingMovies]);


    const startingMoviesHandler = (e) => {
        setStartingMovies(e.target.value);
    }

    return (
        
        <>
            <div className="container">
                <div className="row">
                    <div className={`${styles['center-header']} col-12 col-sm-4`}>
                        <h3 className="text-danger mb-4">{movieState.searchKey ? 'Search Results' : header}</h3>
                    </div>
                    <div className={`${styles['center-select']} col-12 col-sm-8`}>
                        <div className='w-50 float-end'>
                            <select  onChange={startingMoviesHandler} className='form-select' aria-label="Default select example">
                                <option value='popular'>Popular Movies</option>
                                <option value='top'>Top Rated</option>
                                <option value='up'>Upcoming</option>
                                <option value='now'>Now Playing</option>
                            </select>
                        </div>
                    </div>
                    {isLoading && <LoadingSpinner/>}
                    {!isLoading && 
                        movieState.startingPageMovies.map(movie => (
                            <MovieItem 
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster_path}
                                title={movie.original_title}
                                overview={movie.overview}
                                rate={movie.vote_average}
                                releaseDate={movie.release_date}
                            />
                        ))
                        
                    }
                </div>
            </div>
        </>
    )
}

export default Movies;
