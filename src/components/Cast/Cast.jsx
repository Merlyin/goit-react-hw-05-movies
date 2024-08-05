import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiKey } from 'API/themoviedb';
import { PropTypes } from 'prop-types';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      )
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(error => {
        console.error(
          'Error retrieving data:',
          error
        );
      });
  }, [movieId]);

  return (
    <div>
      <h2>Cast:</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <div>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <p>No photo</p>
              )}
              <p>{actor.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ),
};