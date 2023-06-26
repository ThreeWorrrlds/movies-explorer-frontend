
export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export class MoviesApi {
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

  getAllMovies() {
    return this._request(`${this._baseUrl}`, {
      headers: {
        "content-type": "application/json"
      }
    })
  }
}

const beatfilmApi = new MoviesApi(BASE_URL,
  {
    headers: {
      "content-type": "application/json"
    }
  });
export { beatfilmApi };
