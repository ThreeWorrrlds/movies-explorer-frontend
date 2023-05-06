import React from "react";

function Profile() {
  return (
    <div className="profile">

      <form action="" className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>

        <label htmlFor="name" className="profile__label">Имя</label>
        <input id="name" type="name" className="profile__input input-name" name="name"
          placeholder="Имя" minLength="2" maxLength="30" required />
        <span className="profile__text-error profile-name-error"></span>

        <label htmlFor="email" className="profile__label">E-mail</label>
        <input id="email" type="email" className="profile__input input-email" name="email"
          placeholder="E-mail" minLength="3" maxLength="30" required />
        <span className="profile__text-error profile-email-error"></span>

        <button type="submit" className="profile__button-submit profile__button_type_edit">Редактировать</button>
        <button type="submit" className="profile__button-submit profile__button_type_exit">Выйти из аккаунта</button>

      </form>
    </div>
  );
}

export default Profile;