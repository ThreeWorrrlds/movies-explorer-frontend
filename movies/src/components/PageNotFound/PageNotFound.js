import React from "react";
import './PageNotFound.css'
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__code">404</h2>
      <h3 className="not-found__title">
        Страница не найдена
      </h3>
      <Link className="not-found__button" to="/">Назад</Link>
    </div>
  );
}
export default PageNotFound;