import styles from './MovieDetail.module.css';
import Alert from '../UI/Alert';
import { movieActions } from '../../store/movie-slice';
import { convertToDate } from '../../store/utility-actions';
import LoadingSpinner from '../UI/LoadingSpinner';

import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieDetail = (props) => {
    const {movie, similars, genres, videos, cast} = props;
    const [showAlert, setShowAlert] = useState(false);

    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
            
            { !movie.backdrop_path && <LoadingSpinner /> }
            { movie.backdrop_path &&
                <div className={styles['bg-img']} style={{backgroundImage: `linear-gradient(to bottom, rgba(17,17,17, .1), rgba(17,17,17, 1)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster})`}}>

                    <div className='container'>
                        <div className={`row ${styles['row-padding-top']}`}>

                            <motion.div 
                                className={`col-12 col-md-4 col-lg-3 ${styles['center-img']}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {
                                    movie.poster_path &&  <img className={`${styles['img-radius']} ${styles['poster-size']}`} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='movie_img' />
                                }
                            </motion.div>

                            <div className='col-12 col-md-8 col-lg-9 text-light mt-5 mt-md-0'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h2>{movie.original_title}</h2>
                                    <button onClick={navigateHomeHandler} className={`mt-1 rounded ${styles['back-button']}`}>
                                        <i className='fa-solid fa-arrow-left-long'></i>
                                        &#160; home
                                    </button>
                                </div>
                                
                                <h6>{movie.tagline}</h6>

                                <div className='d-flex justify-content-start align-items-start'>
                                    {
                                        genres && genres.map((genre, index) => (
                                            <p key={index} className='me-3 px-4 border border-light rounded-pill'>{genre.name}</p>
                                        ))
                                    }
                                </div>


                                <div className='d-flex justify-content-start align-items-center'>
                                    <p className='me-3 px-4 border border-light rounded-pill' data-tip data-for='imdb'>{movie.vote_average}</p>
                                    <ReactTooltip id='imdb' place='left' effect='solid'>
                                        IMDB
                                    </ReactTooltip>

                                    <p className='me-3 px-4 border border-light rounded-pill' data-tip data-for='duration'>{movie.runtime}</p>
                                    <ReactTooltip id='duration' place='top' effect='solid'>
                                        Duration
                                    </ReactTooltip>

                                    <p onClick={addMovieToListHandler} className={`me-3 px-4 border border-light rounded-pill ${styles['add-btn']}`} data-tip data-for='addListTip'>
                                        <i className='fa-solid fa-plus'></i>
                                    </p>
                                    <ReactTooltip id='addListTip' place='right' effect='solid'>
                                        Add to List
                                    </ReactTooltip>

                                </div>

                                <div>
                                    <h4>Overview</h4>
                                    <p>{movie.overview}</p>
                                </div>

                                <div>
                                    <h4>Release Date</h4>
                                    <p>{movie.release_date}</p>
                                </div>

                                <h4>Casts</h4>
                                <div className='d-flex justify-content-start align-items-start'>
                                    <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        slidesPerView={5}
                                        scrollbar={{ draggable: true }}
                                    >
                                        {
                                            cast.map((item) => (
                                                <SwiperSlide key={item.id}>
                                                    <Link to={`/person/${item.id}`} className='text-decoration-none text-light'>
                                                        <div className={`card bg-transparent me-1`}>
                                                            <img className='card-img-top rounded' src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt='cast-img'/>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>

                            </div>

                            <div className={`${styles['video-margin-top']}`}>
                                <h3 className='text-light'>Official Trailer</h3>
                                <div className='row col-12 mt-3'>
                                    <div>
                                        <iframe 
                                            src={`https://www.youtube.com/embed/${videos.key}`}
                                            height= '540px'
                                            width='100%'
                                            title='trailer'
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className={`text-light ${styles['slide-margin-top']}`}>
                                <h3>Similars</h3>
                                <Swiper
                                    className='mt-3'
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    slidesPerView={4}
                                >
                                    {
                                        similars.map((movie) => (
                                            <SwiperSlide key={movie.id}>
                                                <Link to={`/movie/${movie.id}`} className='text-light text-decoration-none text-center'>
                                                    <div className={`card me-2 bg-transparent ${styles['card-border']}`} >
                                                        <img className='card-img-top rounded' src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}  alt='Movie Img'/>
                                                        <p className='mt-1'>{movie.original_title}</p>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>

                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default MovieDetail;