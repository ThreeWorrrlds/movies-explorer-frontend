import React from "react";
import landingLogo from '../../../images/leadimage.png';

function Promo() {
  return (
    <section className="promo">
      <img src={landingLogo} alt="Аватар" className="promo__image" />
      <h2 className="promo__title">Учебный проект студента факультета Веб-разработки.</h2>
    </section>
  )
}

export default Promo;