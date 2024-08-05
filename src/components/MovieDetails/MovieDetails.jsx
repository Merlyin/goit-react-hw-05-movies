import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetails.module.css';
import { apiKey } from 'API/themoviedb';
import { PropTypes } from 'prop-types';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(response => {
        setMovieDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }, [movieId]);

  // checks if poster_path is defined
  const posterPath = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`
    : '';

  return (
    <div>
      <button className={css.button} onClick={() => navigate(-1)}>
        Undo
      </button>
      <div className={css.container}>
        {posterPath && <img src={posterPath} alt={movieDetails.title} />}
        {/* info info info */} {/* info info info */}
        <div className={css.info}>
          <div className={css.info__title}>
            <h1>{movieDetails.title}</h1>
            <p>
              {movieDetails.release_date &&
                `(${movieDetails.release_date.split('-')[0]})`}
            </p>
          </div>
          <p>
            {movieDetails.vote_average &&
              `User rating: ${movieDetails.vote_average}`}
          </p>
          <p>{movieDetails.overview && `Description: ${movieDetails.overview}`}</p>
          <p>
            {movieDetails.genres &&
              `Genres: ${movieDetails.genres
                .map(genre => genre.name)
                .join(', ')}`}
          </p>
        </div>
        {/* info info info */} {/* info info info */}
      </div>
      <div>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  posterPath: PropTypes.string,
  navigate: PropTypes.func,
  movieDetails: PropTypes.object,
};