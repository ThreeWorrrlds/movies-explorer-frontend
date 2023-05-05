import React from "react";


function AboutProject() {
  return (
    <section id="aboutproject" className="about-project">
      <h2 className="about-project__title">О проекте</h2>

      <div className="about-project__content">
        <article className="about-project__description description-left">
          <h2 className="about-project__subtitle">Дипломный проект включал 5 этапов</h2>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>

        <article className="about-project__description description-right">
          <h2 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h2>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>

        <p className="about-project__duration duration-one">1 неделя</p>
        <p className="about-project__duration duration-two">4 недели</p>
        <p className="about-project__work-type work-type-one">Back-end</p>
        <p className="about-project__work-type work-type-two">Front-end</p>
      </div>

    </section>
  )
}

export default AboutProject;