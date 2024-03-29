import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import validator from 'validator';

function Profile({
  onEditProfile,
  handleLogout
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const changeButtonState = (
    `profile__button-submit profile__button_type_edit ${(!isBtnActive) ? 'profile__button-submit_inactive' : ''}`
  );
  const changeInputState = (
    `profile__input input-email ${(!isEmailValid) ? 'profile__input_invalid' : ''}`
  )

  const [isInputChanged, setIsInputChanged] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');

  function validationForm(e) {
    setIsValid(e.target.closest("form").checkValidity());
  }

  useEffect(() => {
    if (isValid && isInputChanged) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [isInputChanged, isValid])

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email])

  useEffect(() => {
    if (email) {
      if (validator.isEmail(email)) {
        setIsEmailValid(true);
        setErrorMessageEmail('');
      } else {
        setIsValid(false);
        setIsEmailValid(false);
        setIsBtnActive(false);
        setErrorMessageEmail('Введите корректный email');
      }
    } else {
      setErrorMessageEmail('');
    }
  }, [email, isBtnActive])


  function handleInputNameChange(e) {
    setName(e.target.value);
    setErrorMessageName(e.target.validationMessage);
    if (e.target.value !== currentUser.name) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }

  function handleInputEmailChange(e) {
    setEmail(e.target.value);
    setErrorMessageEmail(e.target.validationMessage);
    if (e.target.value !== currentUser.email) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }

  function handleBtnEditClick(e) {
    e.preventDefault();
    onEditProfile(name, email);
    setIsBtnActive(false);
  }

  function signOut() {
    handleLogout();
  }

  return (
    <div className="profile">

      <form onChange={validationForm} action="" className="profile__form">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>

        <label htmlFor="name" className="profile__label">Имя</label>
        <input defaultValue={name} onChange={handleInputNameChange} id="name" type="name" className="profile__input input-name" name="name"
          placeholder="Имя" minLength="2" maxLength="30" required />
        <span className="profile__text-error profile-name-error">{errorMessageName}</span>

        <label htmlFor="email" className="profile__label">E-mail</label>
        <input defaultValue={email} onChange={handleInputEmailChange} id="email" type="email" className={changeInputState} name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="profile__text-error profile-email-error">{errorMessageEmail}</span>

        <button type="submit" className={changeButtonState} onClick={handleBtnEditClick} disabled={!isBtnActive}>Редактировать</button>
        <button type="submit" className="profile__button-submit profile__button_type_exit" onClick={signOut}>Выйти из аккаунта</button>

      </form>
    </div>
  );
}

export default Profile;