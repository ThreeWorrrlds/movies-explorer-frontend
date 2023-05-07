import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import one from '../../../images/one.png';
import two from '../../../images/two.png';
import three from '../../../images/three.png';
import four from '../../../images/four.png';
import five from '../../../images/five.png';
import six from '../../../images/six.png';
import seven from '../../../images/seven.png';
import eight from '../../../images/eight.png';
import nine from '../../../images/nine.png';
import ten from '../../../images/ten.png';
import eleven from '../../../images/eleven.png';
import twelve from '../../../images/twelve.png';
import thirteen from '../../../images/thirteen.png';
import fourteen from '../../../images/fourteen.png';
import fifteen from '../../../images/fifteen.png';
import sixteen from '../../../images/sixteen.png';


function MoviesCardList() {
  return (
    <ul className="movies-cards">
      < MoviesCard id={1} img={one} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={2} img={two} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={3} img={three} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={4} img={four} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={5} img={five} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={6} img={six} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={7} img={seven} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={8} img={eight} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={9} img={nine} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={10} img={ten} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={11} img={eleven} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={12} img={twelve} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={13} img={thirteen} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={14} img={fourteen} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={15} img={fifteen} name={"33 слова о дизайне"} duration={"1ч42м"} />
      < MoviesCard id={16} img={sixteen} name={"33 слова о дизайне"} duration={"1ч42м"} />
    </ul>
  )
}
export default MoviesCardList;