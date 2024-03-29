import MovieDetail from '../components/movies/MovieDetail';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
	const params = useParams();
	const [movie, setMovie] = useState({});
	const [similarMovies, setSimilarMovies] = useState([]);
	const [movieVideos, setMovieVideos] = useState([]);
	const [genres, setGenres] = useState('');
	const [cast, setCast] = useState([]);

	useEffect(() => {
		let fetchMovieDetail = async () => {
			const movieInfos = await axios.get(
				`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			const similar = await axios.get(
				`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
			);

			const videos = await axios.get(
				`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			const cast = await axios.get(
				`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			setMovie(movieInfos.data);
			setSimilarMovies(similar.data.results);
			setMovieVideos([]);
			setCast(cast.data.cast.slice(0, 10));

			setGenres(movieInfos.data.genres.slice(0, 3));

			for (let i = 0; i < videos.data.results.length; i++) {
				if (videos.data.results[i].type === 'Trailer') {
					setMovieVideos(videos.data.results[i]);
					return;
				}
			}
		};

		fetchMovieDetail();
	}, [params.id]);

	return (
		<MovieDetail
			movie={movie}
			similars={similarMovies}
			genres={genres}
			videos={movieVideos}
			cast={cast}
		/>
	);
};

export default Movie;
