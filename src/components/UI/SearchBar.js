import styles from './SearchBar.module.css';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../store/movie-slice';

const SearchBar = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [showCloseButton, setShowCloseButton] = useState(false);

    const inputChangeHandler = (e) => {
        const enteredText = inputRef.current.value;
        dispatch(movieActions.changeSearchKey(enteredText));
        if(!enteredText) return setShowCloseButton(false);
        else return setShowCloseButton(true);
    }

    const clearTextHandler = () => {
        inputRef.current.value = '';
        dispatch(movieActions.changeSearchKey(''))
    }

    return (
        <>        
            <form className={`d-flex justify-content-center align-items-center ${styles['input-margin']}`}>
                <div className=' w-50 position-relative'>
                    <input autoFocus type="text" onChange={inputChangeHandler} ref={inputRef} className={`form-control bg-dark fw-bold text-light ${styles.input}`} id="movie" aria-describedby="movie" placeholder='Search Movie'/>
                    {showCloseButton && <i onClick={clearTextHandler} className={`fa-solid fa-xmark text-light ${styles['icon-position']}`}></i>}
                </div>
            </form>
        </>
    )
}

export default SearchBar;
