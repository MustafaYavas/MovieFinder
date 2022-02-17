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
        <form className='position-relative'>
            <div className={`mb-3 w-50 position-absolute top-50 start-50 translate-middle ${styles['input-container']}`}>
                <input type="text" onChange={inputChangeHandler} ref={inputRef} className={`form-control p-3 shadow bg-body rounded fw-bold ${styles.input}`} id="movie" aria-describedby="movie" placeholder='Search Movie'/>
            </div>
        </form>
    )
}

export default SearchBar;
