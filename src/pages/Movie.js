import MovieDetail from "../components/movies/MovieDetail";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Movie = () => {
    const params = useParams();
    const [movie, setMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const [genres, setGenres] = useState('');
    
    useEffect( () => {
        let fetchMovieDetail = async () => {
            const movieInfos = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

            const similar = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);


            setMovie(movieInfos.data);
            setSimilarMovies(similar.data.results);

            setGenres('');

            for(let i=0; i< movieInfos.data.genres.length; i++){
                if(i===movieInfos.data.genres.length-1) setGenres(prevState => prevState + movieInfos.data.genres[i].name);
                else setGenres(prevState => prevState + `${movieInfos.data.genres[i].name}, `)
            }
            
        }
        
        fetchMovieDetail()
        
    }, [params.id])
    

    return (
        <MovieDetail movie={movie} similars={similarMovies} genres={genres}/>
    )
}

export default Movie;