import Alert from '../UI/Alert';
import styles from './MovieItem.module.css'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieItem = (props) => {
    const {id, poster, title} = props;
    
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

            {
                poster && <div className={`col-sm-6 col-md-4 col-lg-2 mt-5 text-light ${styles['card-flex']} ${styles['card-hover']}`}>
                <div className={styles['card-width']}>
                    <div className={`card mb-4 ${styles['card-wrapper']}`}>
                        <img  onClick={movieDetailHandler} role='button' src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`} className={`card-img-top ${styles['img-radius']}`}  alt="movie_img" />
                        
                        <div className='card-body'>
                            <h6 className='card-title text-center my-auto'>{title}</h6>
                        </div>
                    </div>
                </div>
            </div>
            }
            
            
        </>
        
    )
}

export default MovieItem;
