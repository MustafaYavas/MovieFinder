import styles from './SearchBar.module.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../store/movie-slice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState('');
    const [showCloseButton, setShowCloseButton] = useState(false);

    const inputChangeHandler = (e) => {
        const enteredText = e.target.value;
        setInputText(enteredText);
        dispatch(movieActions.changeSearchKey(enteredText));
    }

    const clearTextHandler = () => {
        setInputText('')
        dispatch(movieActions.changeSearchKey(''))
    }

    useEffect(() => {
        if(!inputText) setShowCloseButton(false);
        else setShowCloseButton(true);
    }, [inputText])

    return (
        <>        
            <form className={`d-flex justify-content-center align-items-center ${styles['input-margin']}`}>
                <div className=' w-50 position-relative'>
                    <input autoFocus type="text" onChange={inputChangeHandler} value={inputText} className={`form-control bg-dark fw-bold text-light ${styles.input}`} id="movie" aria-describedby="movie" placeholder='Search Movie'/>
                    {showCloseButton && <i onClick={clearTextHandler} className={`fa-solid fa-xmark text-light ${styles['icon-position']}`}></i>}
                </div>
            </form>
        </>
    )
}

export default SearchBar;
