import styles from './SearchBar.module.css';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../store/movie-slice';

const SearchBar = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();

    const inputChangeHandler = (e) => {
        const enteredText = inputRef.current.value;
        dispatch(movieActions.changeSearchKey(enteredText));
    }


    return (
        <>
            {
                /*
                <form className='position-relative'>
                    <div className={`mb-3 w-50 position-absolute top-50 start-50 translate-middle  ${styles['input-container']}`}>
                        <input autoFocus type="text" onChange={inputChangeHandler} ref={inputRef} className={`form-control bg-dark fw-bold text-light ${styles.input}`} id="movie" aria-describedby="movie" placeholder='Search Movie'/>
                        <i className='fa-solid fa-xmark text-light '></i>
                    </div>
                </form>
                */
            }
            
            <form className={`d-flex justify-content-center align-items-center ${styles['input-margin']}`}>
                <div className=' w-50 d-flex justify-content-center align-items-center'>
                    <input autoFocus type="text" onChange={inputChangeHandler} ref={inputRef} className={`form-control bg-dark fw-bold text-light ${styles.input}`} id="movie" aria-describedby="movie" placeholder='Search Movie'/>
                    <i className={`fa-solid fa-xmark text-light ${styles['icon-position']}`}></i>
                </div>
            </form>
        </>
    )
}

export default SearchBar;
