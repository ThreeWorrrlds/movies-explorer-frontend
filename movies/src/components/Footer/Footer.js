import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>

      <div className="footer__content">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link"><a href='https://practicum.yandex.ru/' target="blank" className="footer__link-text" >Яндекс.Практикум</a></li>
          <li className="footer__link"><a href='https://github.com/' target="blank" className="footer__link-text" >Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;