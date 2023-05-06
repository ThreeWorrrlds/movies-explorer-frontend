import React from "react";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <form className="login__form">

        <a href='/' className="login__logo-link">
          <img src={logo} alt="Белый смайл на зеленом фоне" className="login__logo" />
        </a>

        <h2 className="login__title">Рады видеть!</h2>

        <label htmlFor="email" className="login__label">E-mail</label>
        <input id="email" type="email" className="login__input login__input_type_email" name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="login__text-error login-email-error"></span>

        <label htmlFor="password" className="login__label">Пароль</label>
        <input id="password" type="password" className="login__input login__input_type_password" name="password"
          placeholder="Пароль" minLength="8" maxLength="30" required />
        <span className="login__text-error login-email-error"></span>

        <button type="submit" className="login__button-submit">Войти</button>
        <Link className="login__link-auth" to='/signup'>Ещё не зарегистрированы? <span className="login__link-span">Регистрация</span> </Link>

      </form>
    </div>
  );
}

export default Login;