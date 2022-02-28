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
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieDetail = (props) => {
    const {movie, similars, genres, videos} = props;
    const [showAlert, setShowAlert] = useState(false);

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

    const navigateHomeHandler = () => {
        navigate('/home', { replace: true })
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
                    <div className={`col-12 col-md-4 col-lg-3 p-3 my-auto ${styles['center-img']}`}>
                        {!movie.poster_path && <LoadingSpinner />}
                        {movie.poster_path && 
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt='movie_img' />}
                        <button onClick={navigateHomeHandler} className={`mt-1 rounded ${styles['back-button']}`}>
                            <i className='fa-solid fa-arrow-left-long'></i>
                            &#160; back home
                        </button>
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
                <div className='row col-12'>
                    <div className='mt-3'>
                        <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${videos.key}`} 
                            controls
                            width='100%'
                            height='480px'
                        />
                    </div>
                </div>
            </div>


           <div className='container-fluid mt-5 text-light'>
                <h3 className='text-danger'>Similars</h3>
                <Swiper
                    className='mt-3 pb-5'
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={7}
                    navigation
                >
                    {
                        similars.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className='card'>
                                    <img onClick={() => movieDetailHandler(movie.id)} role='button' className='card-img-top rounded' src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}  alt="Movie Img"/>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
           </div>

        </>
    )
}

export default MovieDetail;