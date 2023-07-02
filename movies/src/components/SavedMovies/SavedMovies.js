import React, { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  showFilms,
  onSearchMovies,
  isSearching,
  handleBtnDelete
}) {

  const [foundFilmsBySaved, setFoundFilmsBySaved] = useState([]);
  const [finalResult, setFinalResult] = useState([]);

  function handleSearchSavedFilms(searchName) {
    setFoundFilmsBySaved(showFilms.filter((item) => item.nameRU.toLowerCase().includes(searchName.toLowerCase())))
  }

  useEffect(() => {
    if (foundFilmsBySaved.length === 0) {
      setFinalResult(showFilms)
    } else {
      setFinalResult(foundFilmsBySaved)
    }
  }, [foundFilmsBySaved, showFilms])

  return (
    <div className="saved-movies">
      < SearchForm
        handleSearchSavedFilms={handleSearchSavedFilms}
        onSearchMovies={onSearchMovies}
      />

      <MoviesCardList
        showFilms={finalResult}
        handleBtnDelete={handleBtnDelete}
      />
    </div>
  );
}

export default SavedMovies;