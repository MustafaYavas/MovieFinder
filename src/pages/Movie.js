import MovieDetail from "../components/movies/MovieDetail";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Movie = () => {
    const params = useParams();
    const [movie, setMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    
    useEffect( () => {
        let fetchMovieDetail = async () => {
            const movieInfos = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

            const similar = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);


            setMovie(movieInfos.data);
            setSimilarMovies(similar.data.results);

            
        }
        
        fetchMovieDetail()
        
    }, [params.id])
    

    return (
        <MovieDetail movie={movie} similars={similarMovies}/>
    )
}

export default Movie;