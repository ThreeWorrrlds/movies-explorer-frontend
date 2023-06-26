import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useRouteMatch } from 'react-router-dom';

function MoviesCardList({
  showFilms,
  addSavedMovies,
  deleteSavedMovies,
  savedMovies,
  handleBtnDelete,
  quantityCards
}) {

  const { path } = useRouteMatch();

  return (
    <ul className="movies-cards">
      {
        showFilms.map((film, index) => (
          < MoviesCard
            key={(path !== '/saved-movies') ? film.id : film.movieId}
            film={film}
            addSavedMovies={addSavedMovies}
            deleteSavedMovies={deleteSavedMovies}
            savedMovies={savedMovies}
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
