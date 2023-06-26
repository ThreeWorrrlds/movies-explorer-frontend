import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import './App.css';
import { beatfilmApi } from '../../utils/MoviesApi'
import { api } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound'
import Preloader from '../Movies/Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import { WINDOW_SIZE, NUMBER_CARDS_FOR_DEVICE, ADDITIONAL_CARDS_FOR_SHOW, SHORT_FILM_MAX_VALUE_MINUTES } from '../../utils/constants';


function App() {

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  const [movies, setMovies] = useState([]);
  const [films, setFilms] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [quantityCards, setQuantityCards] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [foundDelFilm, setfoundDelFilm] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();
  const location = useLocation()
  const { path } = useRouteMatch();

  /* --------------------- REGISTER FORM  -------------------------*/
  function handleRegisterBtnSubmit(name, email, password) {
    api.registerUser(name, email, password)
      .then((res) => {
        setRegisterSuccess(true);
        handleLoginBtnSubmit(email, password);
      })
      .catch((err) => {
        console.error('Ошибка', err);
        console.log(err.status)
        setRegisterSuccess(false);
      })
  }

  /* --------------------- LOGIN FORM  -------------------------*/
  function handleLoginBtnSubmit(email, password) {
    if (!email || !password) {
      return;
    }
    api.loginUser(email, password)
      .then((jwt) => {
        console.log(jwt.token)
        localStorage.setItem('jwt', jwt.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log('Ошибка', err);
      })
  }

  /*-------------LOGOUT---------------*/
  function handleLogout() {
    setLoggedIn(false);
    setFilms([]);
    setSavedMovies([]);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('namefilm');
    localStorage.removeItem('shortfilm');
    localStorage.removeItem('showFoundFilms');
    localStorage.removeItem('savedFilms');
    history.push('/');
  }

  /* ----------ПОЛУЧЕНИЕ ДАННЫХ ТЕКУЩЕГО ЮЗЕРА---------*/
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getUserInfoFromServer(token)
        .then((dataUser) => {
          setCurrentUser(dataUser);
          setLoggedIn(true);
        })
        .catch((err) => {
          alert("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
          console.log('Данные не получены', err)
        })
    }
  }, [history, loggedIn])

  /* ----------РЕДАКТИРОВАНИЕ ДАННЫХ ТЕКУЩЕГО ЮЗЕРА---------*/
  function handleBtnEditProfile(name, email) {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.updateUserInfoOnServer(name, email, token)
        .then((newDataUser) => {
          setCurrentUser(newDataUser);
          alert("Данные успешно изменены")
        })
        .catch((err) => {
          if (err.status === 500) {
            alert("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
          } else if (err.status === 409) {
            alert('Данный email уже зарегистрирован, попробуйте другой email')
          } else {
            alert('Не корректный ввод')
          }
        })
    }
  }

  /* --------BLOCK MOVIES--------- */
  useEffect(() => {
    setIsLoading(true);
    beatfilmApi.getAllMovies()
      .then((dataFilms) => {
        localStorage.setItem('dataFilms', JSON.stringify(dataFilms));
      })
      .catch((err) => {
        alert("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [isSearching])


  /* ----------- пользователь залогинен ------- */
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setLoggedIn(true);
      history.push(location);
    }
  }, [])

  /* --------НАПОЛНЯЕТ СТЕЙТЫ MOVIES и FILMS-------- */
  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('dataFilms'));
    setMovies(allMovies);
    const foundMovies = JSON.parse(localStorage.getItem('showFoundFilms'));
    if (foundMovies) {
      setFilms(foundMovies);
    }
  }, [])

  /* --------ОБРАБАТЫВАЕТ ПОИСК НА СТРАНИЦЕ /MOVIES--------------*/
  function handleSearchByName(namefilm, shortfilm) {                      /*  меняем стейт на конст */
    const foundMovies = movies.filter(item => {
      if (item.nameRU.toLowerCase().includes(namefilm.toLowerCase()) || item.description.toLowerCase().includes(namefilm.toLowerCase())) {
        if (shortfilm) {
          const duration = item.duration <= SHORT_FILM_MAX_VALUE_MINUTES;
          return duration;
        }
        return item;
      }
    })
    setFilms(foundMovies);
    localStorage.setItem('namefilm', JSON.stringify(namefilm));
    localStorage.setItem('shortfilm', JSON.stringify(shortfilm));
    localStorage.setItem('showFoundFilms', JSON.stringify(foundMovies));
  }

  /*------------ Получает сохраненные фильмы -----------*/
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getAllSavedMovies(token)
        .then((allSavedMovies) => {
          localStorage.setItem('savedFilms', JSON.stringify(allSavedMovies));
          setSavedMovies(allSavedMovies);
          console.log('запросил сохраненные фильмы')
        })
        .catch((err) => {
          alert("Ошибка, данные сохраненных фильмов не получены")
          console.log(err)
        })
    }
  }, [loggedIn, history])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      localStorage.setItem('savedFilms', JSON.stringify(savedMovies));
      console.log('spisok savedMovies', savedMovies)
    }
  }, [savedMovies])

  function controlWindowWidth(e) {
    setWindowWidth(e.target.window.innerWidth)
  }

  window.addEventListener('resize', controlWindowWidth);

  useEffect(() => {
    if (window.innerWidth > WINDOW_SIZE.desktop) {
      setQuantityCards(NUMBER_CARDS_FOR_DEVICE.desktop);
    } else if (window.innerWidth > WINDOW_SIZE.tablet) {
      setQuantityCards(NUMBER_CARDS_FOR_DEVICE.tablet);
    } else if (window.innerWidth > WINDOW_SIZE.smartphone) {
      setQuantityCards(NUMBER_CARDS_FOR_DEVICE.smartphone);
    } else if (window.innerWidth <= WINDOW_SIZE.smartphone) {
      setQuantityCards(NUMBER_CARDS_FOR_DEVICE.smallPhone);
    }
  }, []);

  function addVisibleCards(number) {
    if (window.innerWidth > WINDOW_SIZE.desktop) {
      setQuantityCards(number + ADDITIONAL_CARDS_FOR_SHOW.desktop);
    } else if (window.innerWidth > WINDOW_SIZE.tablet) {
      setQuantityCards(number + ADDITIONAL_CARDS_FOR_SHOW.tablet);
    } else if (window.innerWidth > WINDOW_SIZE.smartphone) {
      setQuantityCards(number + ADDITIONAL_CARDS_FOR_SHOW.smartphone);
    } else if (window.innerWidth <= WINDOW_SIZE.smartphone) {
      setQuantityCards(number + ADDITIONAL_CARDS_FOR_SHOW.smallPhone);
    }
  }

  function handleBtnShowMore() {
    addVisibleCards(quantityCards);
  }

  function addSavedMovies(film) {
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log('токен при добавлении', localStorage.getItem('jwt'))
      api.addSavedMovie(film, token)
        .then((checkedFilm) => {
          console.log('Фильм', `${checkedFilm.nameRU}`, 'добавлен в сохранённые');
          setSavedMovies([checkedFilm, ...savedMovies]);
          document.getElementById(film.id).checked = true;
        })
        .catch((err) => {
          alert("При попытке сохранения фильма возникла ошибка.")
          console.log(err);
        })
    }
  }

  function deleteSavedMovies(data) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const matchFilms = savedMovies.filter((item) => item.movieId === data.id);
      const foundItem = (matchFilms[0]);
      api.deleteSavedMovie(foundItem._id, token)
        .then(() => {
          console.log('Фильм удален из сохраненных');
          setSavedMovies(savedMovies.filter((c) => c._id !== foundItem._id));
          document.getElementById(data.id).checked = false;
        })
        .catch((err) => {
          alert("При попытке удаления фильма возникла ошибка.")
          console.log(err);
        })
    }
  }

  function handleBtnDelete(id) {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.deleteSavedMovie(id, token)
        .then((res) => {
          console.log('Фильм удален из сохраненных', res);
          setSavedMovies(savedMovies.filter((c) => c._id !== id));
        })
        .catch((err) => {
          alert("При попытке удаления фильма возникла ошибка.")
          console.log(err);
        })
    }
  }

  function handleSearchMovies() {
    setIsSearching(true);
  }

  function handleSelectMovie(dataFavoriteMovie) {
    setSelectedMovie(dataFavoriteMovie);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Header
              loggedIn={loggedIn}
            />
            <Main />
            <Footer />
          </Route>

          <Route path='/movies'>

            <Header />
            <ProtectedRoute
              Component={Movies}
              loggedIn={loggedIn}
              movies={movies}
              onSearchMovies={handleSearchMovies}
              onSearchByName={handleSearchByName}
              isLoading={isLoading}
              showFilms={films}
              handleBtnShowMore={handleBtnShowMore}
              onCardClick={(data) => handleSelectMovie(data)}
              addSavedMovies={addSavedMovies}
              deleteSavedMovies={deleteSavedMovies}
              savedMovies={savedMovies}
              foundDelFilm={foundDelFilm}
              quantityCards={quantityCards}
            />
            <Footer />
          </Route>

          <Route path='/saved-movies'>
            <Header />
            <ProtectedRoute
              Component={SavedMovies}
              showFilms={savedMovies}
              onSearchMovies={handleSearchMovies}
              isSearching={isSearching}
              handleBtnDelete={handleBtnDelete}
              loggedIn={loggedIn}
            />
            <Footer />
          </Route>

          <Route path='/profile'>
            <Header />
            <ProtectedRoute
              Component={Profile}
              onEditProfile={handleBtnEditProfile}
              handleLogout={handleLogout}
              loggedIn={loggedIn}
            />
          </Route>

          <Route path='/signup'>
            <Register
              onRegister={handleRegisterBtnSubmit}
              registerSuccess={registerSuccess}
              loggedIn={loggedIn}
            />
          </Route>

          <Route path='/signin'>
            <Login
              onLogin={handleLoginBtnSubmit}
              loggedIn={loggedIn}
            />
          </Route>

          <Route path='/*'>
            <PageNotFound />
          </Route>

          {/* <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route> */}
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
