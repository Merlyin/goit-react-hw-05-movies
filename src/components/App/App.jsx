import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from '../Home/Home';
import css from './App.module.css';
// Import async components
const Movies = React.lazy(() => import('../Movies/Movies'));
const MovieDetails = React.lazy(() => import('../MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('../Cast/Cast'));
const Reviews = React.lazy(() => import('../Reviews/Reviews'));

export const App = () => {
  return (
    <Router>
      <div>
        <nav className={css.nav}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} >
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};