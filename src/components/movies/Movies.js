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
    const [startingMovies, setStartingMovies] = useState('Populars');
    const [buttonClass, setButtonClass] = useState('bg-danger text-light')
    const [header, setHeader] = useState('Populars Recently');
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        const getMovieResults = async() => {
            setIsLoading(true);
            let response;
            if(movieState.searchKey.length === 0) {
                setButtonClass('bg-danger text-light')
                if(startingMovies === 'Populars'){
                    response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Popular Movies');
                } else if(startingMovies === 'Top Rated') {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                    setHeader('Top Rated Movies');
                } else if(startingMovies === 'Upcoming') {
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
                setButtonClass('')
            }
            setIsLoading(false);
        }
        getMovieResults();
        
    }, [movieState.searchKey, dispatch, startingMovies]);

    const startingMoviesHandler = (e) => {
        setStartingMovies(e.target.value);
    }

    const selectTypeHandler = (e) => {
        setStartingMovies(e.target.innerText.trim());
        setButtonClass('bg-danger text-light')
    }

    return (
        
        <>
            <div className='container'>
                <div className='row'>
                    <div className={`col-12 col-lg-4 ${styles['center-header']}`}>
                        <h3 className="text-danger">{movieState.searchKey ? 'Search Results' : header}</h3>
                    </div>
                    <div className={`col-12 col-lg-8 px-0 w-auto flaot-end d-none d-md-block ${styles['button-container']} ${styles['center-selector']} ${styles['selector-margin-left']}`}>
                        <button onClick={selectTypeHandler} className={startingMovies==='Populars' ? buttonClass : ''}>
                            Populars
                        </button>
                        <button onClick={selectTypeHandler} className={startingMovies==='Top Rated' ? buttonClass : ''}>
                            Top Rated
                        </button>
                        <button onClick={selectTypeHandler} className={startingMovies==='Upcoming' ? buttonClass : ''}>
                            Upcoming
                        </button>
                        <button onClick={selectTypeHandler} className={startingMovies==='Now Playing' ? buttonClass : ''}>
                            Now Playing
                        </button>
                    </div>
                </div>

                <div className={`${styles['center-select']}  col-12 d-flex justify-content-center align-items-center d-block d-md-none`}>
                    <div className='w-50'>
                        <select  onChange={startingMoviesHandler} className='form-select bg-dark text-danger' aria-label="Default select example">
                            <option value='popular'>Popular Movies</option>
                            <option value='top'>Top Rated</option>
                            <option value='up'>Upcoming</option>
                            <option value='now'>Now Playing</option>
                        </select>
                    </div>
                </div>

                <div className='row'>
                    {isLoading && <LoadingSpinner/>}
                    {(!isLoading && !movieState.startingPageMovies) || 
                        movieState.startingPageMovies.map(movie => (
                            <MovieItem 
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster_path}
                                title={movie.original_title}
                                rate={movie.vote_average}
                            />
                        ))
                    }
                    {
                        (!isLoading && !movieState.startingPageMovies) || <p className='text-center mt-5 text-danger fs-1'>No movies found!</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Movies;
