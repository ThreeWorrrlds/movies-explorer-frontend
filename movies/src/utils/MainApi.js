/* export const BASE_URL = 'http://localhost:3000'; */
/* export const BASE_URL = 'http://localhost:3005'; */
export const BASE_URL = 'https://api.harrymidas.nomoredomains.work';

export const CURRENT_TOKEN = JSON.parse(localStorage.getItem('jwt'));

export class MainApi {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка", `${res}`);
  }

  constructor(baseUrl, headers) {
    this._headers = headers.headers;
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this.#onResponce)
  }


  /* Добавляет фильм в избранное */
  async addFavoriteMovie(data) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: await `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: await `https://api.nomoreparties.co/${data.image.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
  }

  /*----- Получаем все фильмы сервера (сохранённые)------ */
  getAllFavoriteMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      headers: this._headers,
    })
  }

  /* ------Запрос на удаление фильма с сервера (из сохранённых)---- */
  deleteFavoriteMovie(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
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
  getUserInfoFromServer() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
  }

  /* --------Обновление данных пользователя на сервере----------*/
  updateUserInfoOnServer(name, email) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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

/* "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY1ZWVkNzA0YTE1MTQ2ZWFlMWZlNmQiLCJpYXQiOjE2ODQ0MDE4NzksImV4cCI6MTY4NTAwNjY3OX0.-MHMDYlHKKuj0BdUbz_xEgmPG6nmnnMwUkV0u-ymI68", */
/* '9800edab-c01e-4941-9a81-bb143e90c5b8' */