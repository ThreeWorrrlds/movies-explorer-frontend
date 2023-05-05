import React from "react";


function MoviesCard({ id, img, name, duration }) {
  return (
    <label htmlFor={id} className="movies-card__card">
      <img src={img} alt="карточка фильма" className="movies-card__movie-img" />
      <div className="movies-card__description-group">
        <div className="movies-card__name-group">
          <h2 className="movies-card__name">{name}</h2>
          <input id={id} type="checkbox" className="movies-card__checkbox-invisible" />
          <span className="movies-card__checkbox-visible"></span>
        </div>
        <span className="movies-card__duration">{duration}</span>
      </div>
    </label>
  )
}
export default MoviesCard;