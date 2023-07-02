import React from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";

function Movies({
  onSearchMovies,
  onSearchByName,
  isLoading,
  showFilms,
  handleBtnShowMore,
  addSavedMovies,
  deleteSavedMovies,
  savedMovies,
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
          addSavedMovies={addSavedMovies}
          deleteSavedMovies={deleteSavedMovies}
          savedMovies={savedMovies}
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
