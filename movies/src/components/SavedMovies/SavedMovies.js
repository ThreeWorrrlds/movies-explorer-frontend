import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";

import one from '../../images/one.png';
import two from '../../images/two.png';
import three from '../../images/three.png';
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

function SavedMovies() {
  return (
    <div className="saved-movies">

      < SearchForm />

      <section className="movies-cards">
        < MoviesCard id={1} img={one} name={"33 слова о дизайне"} duration={"1ч42м"} />
        < MoviesCard id={2} img={two} name={"33 слова о дизайне"} duration={"1ч42м"} />
        < MoviesCard id={3} img={three} name={"33 слова о дизайне"} duration={"1ч42м"} />
      </section>

    </div>
  );
}

export default SavedMovies;