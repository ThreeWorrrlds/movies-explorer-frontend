import React from "react";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input type="search" className="search-form__input-search" placeholder="Фильм" maxLength={30} required />
        <button type="submit" className="search-form__button-submit"></button>

        <span className="search-form__separator"></span>

        <label htmlFor="shortfilms" className="search-form__label-of-checkbox">
          <input id="shortfilms" type="checkbox" className="search-form__checkbox-invisible" />
          <span className="search-form__checkbox-visible">
            <span className="search-form__checkbox-toggle"></span>
          </span>
          <span className="search-form__lable-text">Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
export default SearchForm;