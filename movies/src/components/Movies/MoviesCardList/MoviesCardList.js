import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useRouteMatch } from 'react-router-dom';

function MoviesCardList({
  showFilms,
  onCardClick,
  addFavoriteMovies,
  deleteFavoriteMovies,
  savedMovies,
  foundDelFilm,
  handleBtnDelete,
  quantityCards
}) {

  const { path } = useRouteMatch();

  /*   const [films, setFilms] = useState([]);
  
    useEffect(() => {
      setFilms(JSON.parse(localStorage.getItem('showFoundFilms')));
    }, []) */

  return (
    <ul className="movies-cards">
      {
        showFilms.map((film, index) => (
          < MoviesCard
            key={(path !== '/saved-movies') ? film.id : film.movieId}
            film={film}
            onCardClick={onCardClick}
            addFavoriteMovies={addFavoriteMovies}
            deleteFavoriteMovies={deleteFavoriteMovies}
            savedMovies={savedMovies}
            foundDelFilm={foundDelFilm}
            handleBtnDelete={handleBtnDelete}
            showFilms={showFilms}
            quantityCards={quantityCards}
            indexSelf={index}
          />
        ))
      }
    </ul>
  )
}
export default MoviesCardList;
