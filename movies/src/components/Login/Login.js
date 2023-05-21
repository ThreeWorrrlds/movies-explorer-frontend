import React, { useState, useEffect } from "react";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {


  const [isBtnActive, setIsBtnActive] = useState(false);

  const changeButtonState = (
    `login__button-submit ${(!isBtnActive) ? 'login__button-submit_inactive' : ''}`
  );

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  function validationForm(e) {
    setIsValid(e.target.closest("form").checkValidity());
  }

  useEffect(() => {
    if (isValid) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [isValid])

  /*   useEffect(() => {
      if (registerSuccess) {
        setName('');
        setEmail('');
        setPassword('');
        setIsBtnActive(false);
      }
    }, [registerSuccess]) */

  function handleInputEmailChange(e) {
    setEmail(e.target.value)
    setErrorMessageEmail(e.target.validationMessage)
  }

  function handleInputPasswordChange(e) {
    setPassword(e.target.value)
    setErrorMessagePassword(e.target.validationMessage)
  }

  function handleBtnLoginClick(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login">
      <form onChange={validationForm} className="login__form">

        <a href='/' className="login__logo-link">
          <img src={logo} alt="Белый смайл на зеленом фоне" className="login__logo" />
        </a>

        <h2 className="login__title">Рады видеть!</h2>

        <label htmlFor="email" className="login__label">E-mail</label>
        <input value={email} onChange={handleInputEmailChange} id="email" type="email" className="login__input login__input_type_email" name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="login__text-error login-email-error">{errorMessageEmail}</span>

        <label htmlFor="password" className="login__label">Пароль</label>
        <input value={password} onChange={handleInputPasswordChange} id="password" type="password" className="login__input login__input_type_password" name="password"
          placeholder="Пароль" minLength="8" maxLength="30" required />
        <span className="login__text-error login-email-error">{errorMessagePassword}</span>

        <button type="submit" className={changeButtonState} disabled={!isBtnActive} onClick={handleBtnLoginClick}>Войти</button>
        <Link className="login__link-auth" to='/signup'>Ещё не зарегистрированы? <span className="login__link-span">Регистрация</span> </Link>

      </form>
    </div>
  );
}

export default Login;