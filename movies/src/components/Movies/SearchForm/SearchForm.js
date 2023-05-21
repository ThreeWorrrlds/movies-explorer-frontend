import React, { useEffect } from "react";
import { useRouteMatch } from 'react-router-dom';

function SearchForm({
  onSearchMovies,
  onSearchByName,
  handleSearchSavedFilms

}) {
  const { path } = useRouteMatch();
  const [nameFilm, setNameFilm] = React.useState('');
  const [shortFilm, setShortFilm] = React.useState(false);

  const toggleCheckbox = (
    `search-form__checkbox-toggle ${shortFilm ? 'search-form__checkbox-toggle_active' : ''}`
  )

  function handleInputNameChange(e) {
    setNameFilm(e.target.value);
  }

  function handleCheckboxChange() {
    if (!shortFilm) {
      setShortFilm(true);
    } else {
      setShortFilm(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (path !== '/saved-movies') {
      onSearchByName(nameFilm, shortFilm);
    } else if (path === '/saved-movies') {
      handleSearchSavedFilms(nameFilm);
    }
  }

  function checkInputFilled() {
    if (nameFilm.length > 3) {
      onSearchMovies();
    }
  }

  useEffect(() => {
    setNameFilm(JSON.parse(localStorage.getItem('namefilm')));
    setShortFilm(JSON.parse(localStorage.getItem('shortfilm')));

  }, [])

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input value={nameFilm} onChange={handleInputNameChange} type="search" className="search-form__input-search" placeholder="Фильм" minLength={3} maxLength={30} required />
        <button type="submit" className="search-form__button-submit" onClick={checkInputFilled} ></button>

        <span className="search-form__separator"></span>

        <label htmlFor="shortfilms" className="search-form__label-of-checkbox">
          <input value={shortFilm} onChange={handleCheckboxChange} id="shortfilms" type="checkbox" className="search-form__checkbox-invisible" />
          <div className="search-form__checkbox-visible">
            <span className={toggleCheckbox}></span>
          </div>
          <span className="search-form__lable-text">Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
export default SearchForm;