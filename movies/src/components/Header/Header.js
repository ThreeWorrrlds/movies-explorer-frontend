import React from "react";
import logo from '../../images/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';

function Header() {
  const { path } = useRouteMatch();

  const changeBackgroundHeader = (
    `header ${(path !== '/') ? 'header_color_black' : ''}`
  );

  const changeVsibleSideButton = (
    `side-panel ${(path === '/') ? 'side-panel_invisible' : ''}`
  );

  return (
    <header className={changeBackgroundHeader}>

      <div className="header__main-line">
        <a href='/' className="header__logo-link">
          <img src={logo} alt="Белый смайл на зеленом фоне" className="header__logo" />
        </a>

        <nav className="header__film-menu">
          {(path === '/movies' || path === '/saved-movies' || path === '/profile') &&
            <Link className="header__link film-link" to='/movies'>Фильмы</Link>}
          {(path === '/movies' || path === '/saved-movies' || path === '/profile') &&
            <Link className="header__link film-link" to='/saved-movies'>Сохранённые фильмы</Link>}
        </nav>

        <label htmlFor="sidepanel" className={changeVsibleSideButton}>
          <input id="sidepanel" type="checkbox" className="side-panel__checkbox-invisible" />
          <div className="side-panel__window">
            <button type="button" className="side-panel__close-button"></button>
            <nav className="side-panel__link-block">
              <Link className="header__link side-link" to='/'>Главная</Link>
              <Link className="header__link side-link" to='/movies'>Фильмы</Link>
              <Link className="header__link side-link" to='/saved-movies'>Сохранённые фильмы</Link>
            </nav>
            <Link className="header__link side-link__type_profile" to='/profile'>Аккаунт</Link>
          </div>
          <nav className="side-panel__checkbox-visible">
            <span className="side-panel__checkbox-visible-line"></span>
            <span className="side-panel__checkbox-visible-line"></span>
            <span className="side-panel__checkbox-visible-line"></span>
          </nav>
        </label>

        <nav className="header__profile-menu">
          {(path === '/') &&
            <Link className="header__link profile-link header__link_type_register" to='/signup'>Регистрация</Link>}
          {(path === '/') &&
            <Link className="header__link profile-link header__link_type_login" to='/signin'>Войти</Link>}
          {(path === '/movies' || path === '/saved-movies' || path === '/profile') &&
            <Link className="header__link profile-link header__link_type_profile" to='/profile'>Аккаунт</Link>}
        </nav>
      </div>

    </header>
  );
}
export default Header;
