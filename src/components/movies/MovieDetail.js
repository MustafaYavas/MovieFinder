import styles from './MovieDetail.module.css';
import Alert from '../UI/Alert';
import { movieActions } from '../../store/movie-slice';
import { convertToDate } from '../../store/utility-actions';
import LoadingSpinner from '../UI/LoadingSpinner';

import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieDetail = (props) => {
    const {movie, similars} = props;
    const [showAlert, setShowAlert] = useState(false);
    const [movies, setMovies] = useState({})
    const [similarMovies, setSimilarMovies] = useState({})
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        setMovies(movie);
        setSimilarMovies(similars)
    }, [movie, similars])

   
    const addMovieToListHandler = () => {
        if(authState.isLoggedIn) {
            const addDate = convertToDate(new Date());
            const user = authState.userEmail;
            const datas = {id: movies.id, poster: movies.poster_path, title: movies.original_title, rate: movies.vote_average, releaseDate: movies.release_date, addDate, user};
            
            dispatch(movieActions.addMovieToList(datas));            
            setShowAlert(true);
            
        } else {
            alert('Please Login!');
        }
    }


    const movieDetailHandler = (id) => {
        navigate(`/movie/${id}`, { replace: false });
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }, [showAlert])

    return (
        <>
            {showAlert && <Alert message='Movie Added to List'/>}
            <div className={`container-fluid ${styles['bg-color']}`}>
                <div className='row mt-5 '>
                    <div className='col-12 col-md-4 col-lg-3 p-3 my-auto'>
                        {!movies.poster_path && <LoadingSpinner />}
                        {movies.poster_path && 
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`} alt='movie_img' />}
                    </div>

                    <div className='col-12 col-md-8 col-lg-9 mt-2 text-light'>
                        <h2>{movies.original_title}</h2>
                        <h6>{movies.tagline}</h6>

                        <div className='d-flex justify-content-start align-items-center mt-3'>
                            <button className='btn btn-danger rounded me-3'  data-tip data-for="imdb">{movies.vote_average}</button>  
                            <ReactTooltip id="imdb" place="left" effect="solid">
                                IMDB
                            </ReactTooltip>

                            <button className='btn btn-danger rounded me-3'  data-tip data-for="duration">{`${movies.runtime}m`}</button>  
                            <ReactTooltip id="duration" place="top" effect="solid">
                                Duration
                            </ReactTooltip>

                            <button onClick={addMovieToListHandler} className='btn btn-danger rounded-circle' data-tip data-for="addListTip">
                                <i className="fa-solid fa-list"></i>
                            </button>
                            <ReactTooltip id="addListTip" place="right" effect="solid">
                                Add to List
                            </ReactTooltip>
                        </div>

                        {/* <div className='d-flex '>
                            {
                                movie.genres.map(genre => {
                                    return <p className='text-light'>{`${genre.name}`}</p>
                                })
                            }
                        </div> */}
                        <div>
                            <h4 className='mt-2'>Release Date</h4>
                            <p>{movies.release_date}</p>
                        </div>
                        
                        <div>
                            <h4 className='mt-2'>Overview</h4>
                            <p>{movies.overview}</p>
                        </div>

                        {/* <div>
                            <h4 className='mt-2'>Revenue</h4>
                            <p>{`$ ${movie.revenue}`}</p>
                        </div> */}
                    </div>
                </div>
            </div>


            {/* <div className='container-fluid mt-5'>
                <h2 className='text-danger'>Similar Movies</h2>
                <div className={`my-4 ${styles['scroll-wrapper']}`}>
                    {
                        similarMovies.map(movie => {
                            return <div onClick={() => movieDetailHandler(movie.id)} className={`mb-5 ${styles['scroll-wrapper-item']}`} key={movie.id}>
                            <div className="mb-4">
                                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className={`card-img-top ${styles['img-radius']}`} alt="Movie Img"/>
                                <div className="card-body">
                                    <h6 className="card-title fw-bold text-center">{movie.title}</h6>
                                </div>
                            </div>
                        </div>
                        })

                    }
                </div>
            </div> */}

        </>
    )
}

export default MovieDetail;