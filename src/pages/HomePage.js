import Movies from "../components/movies/Movies";

import { useEffect } from "react";
import { movieActions } from "../store/movie-slice";
import { useDispatch } from "react-redux";

const HomePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(movieActions.changeSearchKey(''))
    }, [dispatch])

    return (
        <Movies />
    )
}

export default HomePage;