import React from "react";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register">

      <form className="register__form">

        <a href='/' className="register__logo-link">
          <img src={logo} alt="Белый смайл на зеленом фоне" className="register__logo" />
        </a>

        <h2 className="register__title">Добро пожаловать!</h2>

        <label htmlFor="name" className="register__label">Имя</label>
        <input id="name" type="name" className="register__input" name="name"
          placeholder="Имя" minLength="2" maxLength="30" required />
        <span className="register__text-error register-name-error"></span>

        <label htmlFor="email" className="register__label">E-mail</label>
        <input id="email" type="email" className="register__input input-email" name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="register__text-error register-email-error"></span>

        <label htmlFor="password" className="register__label">Пароль</label>
        <input id="password" type="password" className="register__input input-email" name="password"
          placeholder="Пароль" minLength="8" maxLength="30" required />
        <span className="register__text-error register-email-error">Что-то пошло не так...</span>

        <button type="submit" className="register__button-submit">Зарегистрироваться</button>
        <Link className="register__link-auth" to='/signin'>Уже зарегистрированы? <span className="register__link-span">Войти</span> </Link>

      </form>

    </div>
  );
}

export default Register;