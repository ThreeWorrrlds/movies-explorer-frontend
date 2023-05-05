import React from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {

  return (
    <div className="movies">
      < SearchForm />
      < MoviesCardList />
      <section className="show-more" for="load-more">
        <button className="show-more__button" type="button">Еще</button>
      </section>
    </div>
  );
}
export default Movies;
