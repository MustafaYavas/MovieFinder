import noImg from '../../assets/no-img.png';
import Alert from '../UI/Alert';
import styles from './MovieItem.module.css'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieItem = (props) => {
    const {id, poster, title, rate} = props;
    
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()
    

    
    const movieDetailHandler = () => {
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

            <div onClick={movieDetailHandler} role='button' className={`col-sm-6 col-md-4 col-lg-3 mt-5 mb-5 ${styles['card-flex']} ${styles['card-hover']}`}>
                <div className={styles['card-width']}>
                    <div className='card mb-4 shadow-lg rounded position-relative'>
                        <img src={!poster ? noImg : `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`} className='card-img-top'  alt="movie_img" />
                        <h4 className='text-center position-absolute top-0 end-0'><span className='badge bg-danger rounded-circle p-3'>{rate}</span></h4>
                        <div className='card-body'>
                            <h5 className='card-title text-center my-auto' style={{height: '4.5rem'}}>{title}</h5>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}

export default MovieItem;
