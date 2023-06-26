/* export const BASE_URL = 'http://localhost:3000'; */
/* export const BASE_URL = 'http://localhost:3005'; */
export const BASE_URL = 'https://api.harrymidas.nomoredomains.work';

export const CURRENT_TOKEN = localStorage.getItem('jwt');

export class MainApi {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  constructor(baseUrl, headers) {
    this._headers = headers.headers;
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this.#onResponce)
  }

  /* Добавляет фильм в избранное */
  addSavedMovie(data, token) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      /* headers: this._headers, */
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
  }

  /*----- Получаем все фильмы сервера (сохранённые)------ */
  getAllSavedMovies(token) {
    return this._request(`${this._baseUrl}/movies`, {
      /* headers: this._headers, */
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
  }

  /* ------Запрос на удаление фильма с сервера (из сохранённых)---- */
  deleteSavedMovie(id, token) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      /* headers: this._headers, */
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
  }

  /* ------------- Регистрация пользователя ------- */
  registerUser(name, email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
  };

  /* --------Вход пользователя по имейл и паролю----------*/
  loginUser(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  };

  /* --------Получение данных пользователя с сервера----------*/
  getUserInfoFromServer(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      /* headers: this._headers, */
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
  }

  /* --------Обновление данных пользователя на сервере----------*/
  updateUserInfoOnServer(name, email, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
  }
}

const api = new MainApi(BASE_URL,
  {
    headers: {
      "authorization": `Bearer ${CURRENT_TOKEN}`,
      "content-type": "application/json"
    }
  });
export { api };
