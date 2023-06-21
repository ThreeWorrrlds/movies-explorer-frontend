import React, { useEffect, useState } from "react";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import validator from 'validator';

function Register({ onRegister, registerSuccess }) {

  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const changeButtonState = (
    `register__button-submit ${(!isBtnActive) ? 'register__button-submit_inactive' : ''}`
  );

  const changeInputState = (
    `register__input ${(!isEmailValid) ? 'register__input_invalid' : ''}`
  )

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessageName, setErrorMessageName] = useState('');
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

  function handleInputNameChange(e) {
    setName(e.target.value)
    setErrorMessageName(e.target.validationMessage)
  }

  useEffect(() => {
    if (email.length !== 0) {
      if (validator.isEmail(email)) {
        setIsEmailValid(true);
        setErrorMessageEmail('');
      } else {
        setIsValid(false);
        setIsEmailValid(false);
        setErrorMessageEmail('Введите корректный email');
      }
    } else {
      setErrorMessageEmail('');
    }
  }, [email])

  async function handleInputEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleInputPasswordChange(e) {
    setPassword(e.target.value)
    setErrorMessagePassword(e.target.validationMessage)
  }

  function handleBtnRegisterClick(e) {
    e.preventDefault();
    onRegister(name, email, password);
  }

  useEffect(() => {
    if (registerSuccess) {
      setName('');
      setEmail('');
      setPassword('');
      setIsBtnActive(false);
    }
  }, [registerSuccess])

  return (
    <div className="register">

      <form onChange={validationForm} id="regform" className="register__form">

        <a href='/' className="register__logo-link">
          <img src={logo} alt="Белый смайл на зеленом фоне" className="register__logo" />
        </a>

        <h2 className="register__title">Добро пожаловать!</h2>

        <label htmlFor="name" className="register__label">Имя</label>
        <input value={name} onChange={handleInputNameChange} id="name" type="name" className="register__input " name="name"
          placeholder="Имя" minLength="2" maxLength="30" required />
        <span className="register__text-error name-error">{errorMessageName}</span>

        <label htmlFor="email" className="register__label">E-mail</label>
        <input value={email} onChange={handleInputEmailChange} id="email" type="email" className={changeInputState} name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="register__text-error email-error">{errorMessageEmail}</span>

        <label htmlFor="password" className="register__label">Пароль</label>
        <input value={password} onChange={handleInputPasswordChange} id="password" type="password" className="register__input input-email" name="password"
          placeholder="Пароль" minLength="8" maxLength="30" required />
        <span className="register__text-error password-error">{errorMessagePassword}</span>

        <button type="submit" className={changeButtonState} disabled={!isBtnActive} onClick={handleBtnRegisterClick}>Зарегистрироваться</button>
        <Link className="register__link-auth" to='/signin'>Уже зарегистрированы? <span className="register__link-span">Войти</span> </Link>

      </form>

    </div>
  );
}

export default Register;
