import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';

function MoviesCard({
  film,
  onCardClick,
  addSavedMovies,
  deleteSavedMovies,
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
  }, [])

  function handleButtonDel() {
    handleBtnDelete(film._id);
    console.log('srabotal cod handleButtonDel')
  }

  function handleCardClick(e) {
    e.preventDefault();
    if (path !== '/saved-movies') {
      onCardClick(film);
      if (!isLiked) {
        addSavedMovies(film)
        setIsLiked(true);
        document.getElementById(film.id).checked = true;
      } else {
        deleteSavedMovies(film)
        setIsLiked(false);
        document.getElementById(film.id).checked = false;
      }

    } else if (path === '/saved-movies') {
      handleButtonDel();
    }
  }

  function countDuration(number) {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    const formatTime = hours + "ч" + minutes + "м";
    return formatTime;
  }

  return (
    <li className={changeVisibleCards}>
      <div htmlFor={film.id} className="movies-card__card-catcher" /* onClick={handleCardClick} */  >
        <a href={film.trailerLink} target="_blank" rel="noopener noreferrer" className="movies-card__trailer-link">
          <img src={changeSrcImg} alt="карточка фильма" className="movies-card__movie-img" />
        </a>
        <div className="movies-card__description-group">
          <div className="movies-card__name-group">
            <h2 className="movies-card__name">{film.nameRU}</h2>
            <input id={film.id} type="checkbox" className="movies-card__checkbox-invisible" onChange={toggleLike} />
            <span className={changeCheckbox} onClick={handleCardClick} ></span>
          </div>
          <span className="movies-card__duration">{countDuration(film.duration)}</span>
        </div>
      </div>
    </li>
  )
}
export default MoviesCard;
