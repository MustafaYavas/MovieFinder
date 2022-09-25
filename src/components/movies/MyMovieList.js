import { movieActions } from '../../store/movie-slice';
import Alert from '../UI/Alert';
import styles from './MyMovieList.module.css';

import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MyMovieList = () => {
    const authState = useSelector(state => state.auth);
    const movieState = useSelector(state => state.movie);
    const [showAlert, setShowAlert] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        let newList = [];
        movieState.userMovieList.forEach(movie => {
            if(movie.user === authState.userEmail)
                newList.push(movie);
        })
        setMovieList(newList)
    }, [movieState.userMovieList, authState.userEmail])

    

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }, [showAlert])

    const deleteFromListHandler = (id, user) => {
        const payload = {id, user}
        dispatch(movieActions.removeMovieFromList(payload));
        setShowAlert(true)
    }
    
    return (
        <>
            {showAlert && <Alert message='Movie Removed from List'/>}
            { 
                movieList.length !== 0 && <div className='container'>
                    <h2 className='mt-5 text-danger border-bottom'>Your MovieFinder List</h2>
                    {
                        movieList.map((movie) => (
                            <motion.div 
                                className='row mt-5 mb-3 p-3 bg-dark rounded text-light box' key={movie.id}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.5,
                                  ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <div className={`col-sm-12 col-md-4 ${styles['center-img']}`}>
                                    <img className={`${styles['img-radius']}`} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster}`}  alt='movie-poster'/>
                                </div>

                                <div className={`col-sm-12 col-md-6 ${styles['margin-top-sm']}`}>
                                    <p>Movie Name: <span className='text-danger'>{movie.title}</span></p>
                                    <p>IMDB: <span className='text-danger'>{movie.rate}</span></p>
                                    <p>Release Date: <span className='text-danger'>{movie.releaseDate}</span></p>
                                    <p className='fst-italic'>You added this movie to your list <span className='text-danger'>{movie.addDate}</span></p>
                                    
                                    <button style={{display: 'none'}} className={`${styles['show-button']} btn btn-danger w-100`} onClick={() => deleteFromListHandler(movie.id, authState.userEmail)} >Delete
                                    </button> 
                                    {/* only show xs and sm */}
                                </div>
                                
                                <div style={{display: 'none'}} className={`${styles['show-close-icon']} col-sm-2`}>
                                    <button className='btn btn-danger float-end' onClick={() => deleteFromListHandler(movie.id, authState.userEmail)} ><i className='fa-solid fa-xmark'></i></button>
                                </div>
                                {/* hidden xs and sm */}
                            </motion.div>
                        ))
                    }
                </div>
            }

            {
                    movieList.length === 0 && <div className={styles.height}>
                        <p className='text-danger fw-bold fs-3 text-center my-5'>Your MovieFinder List is Empty!</p>
                    </div>
            }
        </>
    )
}

export default MyMovieList;