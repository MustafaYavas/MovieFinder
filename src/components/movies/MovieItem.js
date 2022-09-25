import Alert from '../UI/Alert';
import styles from './MovieItem.module.css'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MovieItem = (props) => {
    const {id, poster, title} = props;
    
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }, [showAlert])


    return (
        <>
            {showAlert && <Alert message='Movie Added to List'/>}
            {
                poster && 
                <motion.div 
                    className={`col-sm-6 col-md-4 col-lg-2 mt-5 text-light ${styles['card-flex']} ${styles['card-hover']}`}
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <div className={`${styles['card-width']}`}>
                        <Link to={`/movie/${id}`} className='text-decoration-none'>
                            <div className={`card mb-4 ${styles['card-wrapper']} `}>
                                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`} className={`card-img-top ${styles['img-radius']}`}  alt='movie_img' />
                                
                                <div className='card-body text-light'>
                                    <h6 className={`card-title text-center my-auto`}>{title}</h6>
                                </div>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            }
        </>
    )
}

export default MovieItem;
