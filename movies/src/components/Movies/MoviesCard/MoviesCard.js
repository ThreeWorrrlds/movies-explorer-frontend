import React, { useEffect, useState } from "react";
import { useRouteMatch } from 'react-router-dom';

function MoviesCard({
  film,
  onCardClick,
  addFavoriteMovies,
  deleteFavoriteMovies,
  savedMovies,
  foundDelFilm,
  handleBtnDelete,
  showFilms,
  quantityCards,
  indexSelf
}) {

  const { path } = useRouteMatch();

  const changeSrcImg = (
    `${(path !== '/saved-movies') ? `https://api.nomoreparties.co${film.image.url}` : film.image}`
  );

  const changeCheckbox = (
    `${(path !== '/saved-movies') ? 'movies-card__checkbox-visible' : 'movies-card__checkbox-delete-visible'}`
  );

  const [isLiked, setIsLiked] = useState(false);

  const changeVisibleCards = (
    `movies-card__card ${(indexSelf >= quantityCards) ? 'movies-card__card_invisible' : ''}`
  );

  function toggleLike() {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  useEffect(() => {
    if (path === '/movies') {
      // eslint-disable-next-line array-callback-return
      savedMovies.some((item) => {
        if (item.movieId === film.id) {
          setIsLiked(true);
          document.getElementById(film.id).checked = true
        }
      })
    }
  }, [film, path, savedMovies, isLiked, foundDelFilm])

  function handleCardClick() {
    if (path !== '/saved-movies') {
      onCardClick(film);
      !isLiked ? addFavoriteMovies() : deleteFavoriteMovies(film)
    } else if (path === '/saved-movies') {
      return
    }
  }

  function handleButtonDel() {
    handleBtnDelete(film._id);
  }

  function countDuration(number) {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    const formatTime = hours + "ч" + minutes + "м";
    return formatTime;
  }

  return (
    <li className={changeVisibleCards}>
      <label htmlFor={film.id} className="movies-card__card-catcher" onClick={handleCardClick}>
        <img src={changeSrcImg} alt="карточка фильма" className="movies-card__movie-img" />
        <div className="movies-card__description-group">
          <div className="movies-card__name-group">
            <h2 className="movies-card__name">{film.nameRU}</h2>
            <input id={film.id} type="checkbox" className="movies-card__checkbox-invisible" onChange={toggleLike} />
            <span className={changeCheckbox} onClick={handleButtonDel} ></span>
          </div>
          <span className="movies-card__duration">{countDuration(film.duration)}</span>
        </div>
      </label>
    </li>
  )
}
export default MoviesCard;
