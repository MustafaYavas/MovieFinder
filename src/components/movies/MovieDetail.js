import styles from './MovieDetail.module.css';
import Alert from '../UI/Alert';
import { movieActions } from '../../store/movie-slice';
import { convertToDate } from '../../store/utility-actions';
import LoadingSpinner from '../UI/LoadingSpinner';
import ReactPlayer from 'react-player';

import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieDetail = (props) => {
    const {movie, similars, genres, videos} = props;
    const [showAlert, setShowAlert] = useState(false);
    const [videoSize, setVideoSize] = useState({width: '640px', height: '360px'});
    
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const addMovieToListHandler = () => {
        if(authState.isLoggedIn) {
            const addDate = convertToDate(new Date());
            const user = authState.userEmail;
            const datas = {id: movie.id, poster: movie.poster_path, title: movie.original_title, rate: movie.vote_average, releaseDate: movie.release_date, addDate, user};
            
            dispatch(movieActions.addMovieToList(datas));            
            setShowAlert(true);
            
        } else {
            alert('Please Login!');
        }
    }

    const movieDetailHandler = (id) => {
        navigate(`/movie/${id}`, { replace: false });
    }

    const videoStartHandler = () => {
        setVideoSize({
            width: '1080px',
            height: '540px'
        })
    }

    const videoEndHandler = () => {
        setVideoSize({
            width: '640px',
            height: '360px'
        })
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
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3 p-3 my-auto'>
                        {!movie.poster_path && <LoadingSpinner />}
                        {movie.poster_path && 
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt='movie_img' />}
                    </div>

                    <div className='col-12 col-md-8 col-lg-9 mt-3 text-light'>
                        <h2>{movie.original_title}</h2>
                        <h6>{movie.tagline}</h6>

                        <p>{genres}</p>

                        <div className='d-flex justify-content-start align-items-center mt-3'>
                            <button className='btn btn-danger rounded me-3'  data-tip data-for="imdb">{movie.vote_average}</button>  
                            <ReactTooltip id="imdb" place="left" effect="solid">
                                IMDB
                            </ReactTooltip>

                            <button className='btn btn-danger rounded me-3'  data-tip data-for="duration">{`${movie.runtime}m`}</button>  
                            <ReactTooltip id="duration" place="top" effect="solid">
                                Duration
                            </ReactTooltip>

                            <button onClick={addMovieToListHandler} className='btn btn-success rounded-circle' data-tip data-for="addListTip">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <ReactTooltip id="addListTip" place="right" effect="solid">
                                Add to List
                            </ReactTooltip>
                        </div>

                        <div>
                            <h4 className='mt-2'>Release Date</h4>
                            <p>{movie.release_date}</p>
                        </div>
                        
                        <div>
                            <h4 className='mt-2'>Overview</h4>
                            <p>{movie.overview}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='container-fluid mt-5'>
                <h3 className='text-danger'>Official Trailer</h3>
                <div className='mt-3'>
                    <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${videos.key}`} 
                        controls
                        width={videoSize.width}
                        height={videoSize.height}
                        onStart={videoStartHandler}
                        onPlay={videoStartHandler}
                        onEnded={videoEndHandler}
                        onPause={videoEndHandler}
                    />
                </div>
            </div>


            <div className='container-fluid mt-5'>
                <h3 className='text-danger'>Similar Movies</h3>
                <div className={`mt-3 ${styles['scroll-wrapper']}`}>
                    {
                        similars.map(movie => {
                            return <div onClick={() => movieDetailHandler(movie.id)} role='button' className={`mb-5 ${styles['scroll-wrapper-item']}`} key={movie.id}>
                            <div className="mb-4">
                                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className={`card-img-top ${styles['img-radius']}`} alt="Movie Img"/>
                                
                            </div>
                        </div>
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default MovieDetail;