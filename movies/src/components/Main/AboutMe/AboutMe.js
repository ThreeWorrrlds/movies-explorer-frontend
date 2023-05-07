import React from "react";
import studentPhoto from '../../../images/studentphoto.png';

function AboutMe() {
  return (
    <section id="aboutme" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__description">
        <h2 className="about-me__subtitle">Виталий</h2>
        <p className="about-me__subtitle-two">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a href='https://github.com/ThreeWorrrlds' target="blank" className="about-me__link" >Github</a>
        <img src={studentPhoto} alt="Фото студента" className="about-me__image" />
      </article>
    </section>
  )
}
export default AboutMe;