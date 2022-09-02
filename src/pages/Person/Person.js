import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Person.module.css';

const Person = () => {
	const params = useParams();
	const [person, setPerson] = useState({});
	const [movies, setMovies] = useState([]);
	const [tvShows, setTvShows] = useState([]);
	const [moviesNumber, setMoviesNumber] = useState(6);
	const [originalMoviesNumber, setOriginalMoviesNumber] = useState(0);
	const [isShowMoreMovie, setIsShowMoreMovie] = useState(false);

	const [tvShowsNumber, setTvShowsNumber] = useState(5);
	const [originaltvShowsNumber, setOriginalTvShowsNumber] = useState(0);
	const [isShowMoreTv, setIsShowMoreTv] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const responsePerson = await axios.get(
				`https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			setPerson(responsePerson.data);
		};

		fetchData();
	}, [params.id, moviesNumber]);

	useEffect(() => {
		const fetchData = async () => {
			const responseMovies = await axios.get(
				`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			setMovies(responseMovies.data.cast.slice(0, moviesNumber));
			setOriginalMoviesNumber(responseMovies.data.cast.length);
		};

		fetchData();
	}, [params.id, moviesNumber]);

	useEffect(() => {
		const fetchData = async () => {
			const responseTv = await axios.get(
				`https://api.themoviedb.org/3/person/${params.id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
			);

			setTvShows(responseTv.data.cast.slice(0, tvShowsNumber));
			setOriginalTvShowsNumber(responseTv.data.cast.length);
		};

		fetchData();
	}, [params.id, tvShowsNumber]);

	const showMoreMovieItemHandler = () => {
		if (!isShowMoreMovie) {
			setMoviesNumber(originalMoviesNumber);
		} else {
			setMoviesNumber(6);
		}

		setIsShowMoreMovie(!isShowMoreMovie);
	};

	const showMoreTvItemHandler = () => {
		if (!isShowMoreTv) setTvShowsNumber(originaltvShowsNumber);
		else setTvShowsNumber(6);

		setIsShowMoreTv(!isShowMoreTv);
	};

	const calculateAge = (birthday) => {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const ageDif = Date.now() - birthday.getTime();
		const ageDate = new Date(ageDif);
		const bornDate = `${birthday.getDate()} ${
			monthNames[birthday.getMonth()]
		} ${birthday.getUTCFullYear()}`;
		const age =
			person.deathday !== null
				? ''
				: `( ${Math.abs(ageDate.getUTCFullYear() - 1970)} years old )`;

		return `${bornDate} ${age}`;
	};

	const reformatDate = (date) => {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const dateArr = date.split('-');
		const d = new Date(dateArr[0], dateArr[1], dateArr[2]);

		return `${d.getDate()} ${
			monthNames[d.getMonth() - 1]
		} ${d.getUTCFullYear()}`;
	};

	return (
		<div className="container text-light">
			<div className={`row ${styles['row-margin-top']}`}>
				<div
					className={`col-12 col-md-4 col-lg-3 ${styles['center-img']}`}
				>
					{person.profile_path && (
						<img
							className={`${styles['img-radius']} ${styles['img-size']}`}
							src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
							alt="movie_img"
						/>
					)}
				</div>

				<div
					className={`col-12 col-md-8 col-lg-9 ${styles['content-margin-top']}`}
				>
					<div>
						<a
							href={`https://www.imdb.com/name/${person.imdb_id}/bio?ref_=nm_ov_bio_sm`}
							target="_blank"
							rel="noreferrer"
							className="text-decoration-none text-light"
						>
							<h2 className="d-inline">{person.name} </h2>
						</a>
					</div>

					<div className="mt-2">
						<p>Born: {person.place_of_birth}</p>
						{person.birthday && (
							<p>
								Date of Birth:{' '}
								{calculateAge(new Date(person.birthday))}
							</p>
						)}
						{person.deathday && (
							<p>
								Date of Death: {reformatDate(person.deathday)}
							</p>
						)}
					</div>

					<div className="mt-2">
						<p>{person.biography}</p>
					</div>

					<div className="row">
						<div className="mt-4 d-flex justify-content-between align-items-center">
							<h4>Movies</h4>
							{originalMoviesNumber > 6 && (
								<p
									onClick={showMoreMovieItemHandler}
									className={styles['show-btn']}
								>
									{!isShowMoreMovie
										? 'Show More'
										: 'Show Less'}
								</p>
							)}
						</div>
						{movies.map(
							(movie) =>
								movie.poster_path && (
									<Link
										key={movie.id}
										to={`/movie/${movie.id}`}
										className="col-6 col-sm-4 col-md-3 col-lg-2 text-decoration-none text-light"
									>
										<div className={`card bg-transparent`}>
											<img
												className="card-img-top rounded"
												src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
												alt="movie-img"
											/>
											<p>{movie.original_title}</p>
										</div>
									</Link>
								)
						)}
					</div>

					{originaltvShowsNumber > 0 && (
						<div className="row">
							<div className="mt-4 d-flex justify-content-between align-items-center">
								<h4>Tv Shows</h4>
								{originaltvShowsNumber > 6 && (
									<p
										onClick={showMoreTvItemHandler}
										className={styles['show-btn']}
									>
										{!isShowMoreTv
											? 'Show More'
											: 'Show Less'}
									</p>
								)}
							</div>
							{tvShows.map(
								(item) =>
									item.poster_path && (
										<div
											key={item.id}
											className="card bg-transparent col-6 col-sm-4 col-md-3 col-lg-2"
										>
											<img
												className="card-img-top rounded"
												src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
												alt="movie-img"
											/>
											<p>{item.name}</p>
										</div>
									)
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Person;
