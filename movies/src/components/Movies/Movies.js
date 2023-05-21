import React, { useEffect, useState } from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";

function Movies({
  movies,
  onSearchMovies,
  onSearchByName,
  isLoading,
  showFilms,
  handleBtnShowMore,
  onCardClick,
  addFavoriteMovies,
  deleteFavoriteMovies,
  savedMovies,
  foundDelFilm,
  quantityCards
}) {

  const btnShowMoreHidden = (
    `movies__show-more-button ${(showFilms.length <= quantityCards) ? 'hidden' : ''}`
  )

  return (
    <div className="movies">
      < SearchForm onSearchMovies={onSearchMovies} onSearchByName={onSearchByName} />

      {isLoading ?
        <Preloader /> :
        < MoviesCardList
          showFilms={showFilms}
          onCardClick={onCardClick}
          addFavoriteMovies={addFavoriteMovies}
          deleteFavoriteMovies={deleteFavoriteMovies}
          savedMovies={savedMovies}
          foundDelFilm={foundDelFilm}
          quantityCards={quantityCards}
        />
      }

      <section className="movies__show-more" htmlFor="load-more">
        <button className={btnShowMoreHidden} type="button" onClick={handleBtnShowMore} >Еще</button>
      </section>
    </div>
  );
}
export default Movies;
