import React from "react";
import portfolioPointer from '../../../images/portfoliopointer.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__subtitle">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__stroke">
          <a href='https://github.com/ThreeWorrrlds/how-to-learn' target="blank" className="portfolio__link" >Статичный сайт </a>
          <a href='https://github.com/ThreeWorrrlds/how-to-learn' target="blank" className="portfolio__link" > <img src={portfolioPointer} alt="Стрелка" className="portfolio__pointer" /></a>
        </li>
        <li className="portfolio__stroke">
          <a href='https://github.com/ThreeWorrrlds/russian-travel' target="blank" className="portfolio__link" >Адаптивный сайт </a>
          <a href='https://github.com/ThreeWorrrlds/russian-travel' target="blank" className="portfolio__link" > <img src={portfolioPointer} alt="Стрелка" className="portfolio__pointer" /></a>
        </li>
        <li className="portfolio__stroke">
          <a href='https://github.com/ThreeWorrrlds/react-mesto-api-full' target="blank" className="portfolio__link" >Одностраничное приложение </a>
          <a href='https://github.com/ThreeWorrrlds/react-mesto-api-full' target="blank" className="portfolio__link" > <img src={portfolioPointer} alt="Стрелка" className="portfolio__pointer" /></a>
        </li>
      </ul>
    </section>
  )
}
export default Portfolio;