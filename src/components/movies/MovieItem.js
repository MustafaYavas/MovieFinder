import noImg from '../../assets/no-img.png';
import MovieModal from './MovieModal';
import { movieActions } from '../../store/movie-slice';
import Alert from '../UI/Alert';
import styles from './MovieItem.module.css'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToDate } from '../../store/utility-actions';

const MovieItem = (props) => {
    const {id, poster, title, overview, rate, releaseDate} = props;
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [modalDatas, setModalDatas] = useState([]);
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const textTruncate = (text, count) => {
        if(!text) return <p className='w-bold fs-4 fst-italic text-danger' style={{height: "6rem"}}>No text found!</p>
        if(text.length <= count) return <p className='card-text' style={{height: "6rem"}}>{text}</p>
        else return <p className='card-text' style={{height: "6rem"}}>{text.substring(0, count) + ' ...'}</p> ;
    }
    
    const movieDetailHandler = () => {
        const datas = [poster, title, overview, releaseDate, rate];
        setShowModal(true);
        setModalDatas(datas);
    }

    
    const addMovieToListHandler = () => {
        if(authState.isLoggedIn) {
            const addDate = convertToDate(new Date());
            const user = authState.userEmail;
            const datas = {id, poster, title, rate, releaseDate, addDate, user};
            
            dispatch(movieActions.addMovieToList(datas));            
            setShowAlert(true);
            
        } else {
            alert('Please Login!');
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }, [showAlert])


    return (
        <>
            {showAlert && <Alert message='Movie Added to List'/>}

            <div className={`col-sm-6 col-md-4 col-lg-3 mt-5 mb-5 ${styles['card-flex']}`}>
                <div className={styles['card-width']}>
                    <div className="card mb-4 shadow-lg rounded">
                        <img src={!poster ? noImg : `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`} className="card-img-top"  alt="movie_img" />
                        <div className="card-body">
                            <h5 className="card-title" style={{height: "3.5rem"}}>{title}</h5>
                            {textTruncate(overview, 100)}
                                    
                            <div className="d-flex justify-content-between align-items-center">
                                <h3><span className='badge bg-secondary mt-2 p-2'>{rate}</span></h3>
                                        
                                <button className='btn btn-md btn-outline-secondary' onClick={movieDetailHandler}>
                                    More
                                </button>
                            </div>

                            <div className='d-grid gap-2'>
                                <button className='btn btn-md btn-danger' onClick={addMovieToListHandler}>
                                    Add to List
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            

            
            {
                showModal ? <MovieModal movieProp={modalDatas} hide={() => setShowModal(false)}/> : null
            }
        </>
        
    )
}

export default MovieItem;
