import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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


  /* --------------------- REGISTER FORM  -------------------------*/
  function handleRegisterBtnSubmit(name, email, password) {
    api.registerUser(name, email, password)
      .then((res) => {
        localStorage.setItem('username', name);
        setRegisterSuccess(true);
        handleLoginBtnSubmit(email, password);
      })
      .catch((err) => {
        console.log('Ошибка', err);
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
        localStorage.setItem('jwt', JSON.stringify(jwt.token));
        setLoggedIn(true);
        setCurrentUser({
          name: localStorage.getItem('username'),
          email: email
        })
        history.push('/movies');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log('Ошибка', err);
      })
  }

  /* ----------ПОЛУЧЕНИЕ ДАННЫХ ТЕКУЩЕГО ЮЗЕРА---------*/
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfoFromServer()
        .then((dataUser) => {
          setCurrentUser(dataUser);
          setLoggedIn(true);
          history.push('/movies');
        })
        .catch((err) => {
          console.log('Данные не получены', err)
        })
    }
  }, [history, loggedIn])

  /* ----------РЕДАКТИРОВАНИЕ ДАННЫХ ТЕКУЩЕГО ЮЗЕРА---------*/
  function handleBtnEditProfile(name, email) {
    api.updateUserInfoOnServer(name, email)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
      })
      .catch((err) => {
        console.log(err);
      })
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


  /* -----------ХРАНИТ ЗАЛОГИН ПОЛЬЗОВАТЕЛЯ------- */
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('jwt'));
    if (token) {
      setLoggedIn(true);
    }
  }, [])

  /* --------НАПОЛНЯЕТ СТЕЙТЫ MOVIES и FILMS-------- */
  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('dataFilms'));
    setMovies(allMovies);
    const foundFilms = JSON.parse(localStorage.getItem('showFoundFilms'));
    if (foundFilms) {
      setFilms(foundFilms);
    }
  }, [])

  /* --------ОБРАБАТЫВАЕТ ПОИСК НА СТРАНИЦЕ /MOVIES--------------*/
  function handleSearchByName(namefilm, shortfilm) {                      /*  меняем стейт на конст */
    const foundMovies = movies.filter(item => {
      if (item.nameRU.toLowerCase().includes(namefilm.toLowerCase()) || item.description.toLowerCase().includes(namefilm.toLowerCase())) {
        if (shortfilm) {
          const x = item.duration <= 40;
          return x;
        }
        return item;
      }
    })
    setFilms(foundMovies);
    localStorage.setItem('namefilm', JSON.stringify(namefilm));
    localStorage.setItem('shortfilm', JSON.stringify(shortfilm));
    localStorage.setItem('showFoundFilms', JSON.stringify(foundMovies));
  }

  useEffect(() => {
    if (loggedIn) {
      api.getAllFavoriteMovies()
        .then((allFavoritMovies) => {
          setSavedMovies(allFavoritMovies);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function controlWindowWidth(e) {
    setWindowWidth(e.target.window.innerWidth)
  }

  window.addEventListener('resize', controlWindowWidth);

  useEffect(() => {
    if (window.innerWidth > 1279) {
      setQuantityCards(16);
    } else if (window.innerWidth > 1196) {
      setQuantityCards(12);
    } else if (window.innerWidth > 629) {
      setQuantityCards(8);
    } else if (window.innerWidth <= 629) {
      setQuantityCards(5);
    }
  }, []);

  function addVisibleCards(n) {
    if (window.innerWidth > 1279) {
      setQuantityCards(n + 4);
    } else if (window.innerWidth > 1196) {
      setQuantityCards(n + 3);
    } else if (window.innerWidth > 629) {
      setQuantityCards(n + 2);
    } else if (window.innerWidth <= 629) {
      setQuantityCards(n + 2);
    }
  }

  function handleBtnShowMore() {
    addVisibleCards(quantityCards);
  }

  function addFavoriteMovies() {
    api.addFavoriteMovie(selectedMovie)
      .then((checkedFilm) => {
        console.log(checkedFilm);
        setSavedMovies([checkedFilm, ...savedMovies]);
        document.getElementById(selectedMovie.id).checked = true;
      })
      .catch((err) => {
        console.log('Ошибочка', err);
      })
  }

  function deleteFavoriteMovies(data) {
    setfoundDelFilm(savedMovies.filter((item) => item.movieId === data.id));
    const foundItem = (foundDelFilm[0]);
    api.deleteFavoriteMovie(foundItem._id)
      .then(() => {
        console.log('Фильм удален из сохраненных');
        setSavedMovies(savedMovies.filter((c) => c._id !== foundItem._id));
        document.getElementById(data.id).checked = false;
      })
      .catch((err) => {
        console.log('Ошибка удаления', err);
      })
  }

  function handleBtnDelete(id) {
    api.deleteFavoriteMovie(id)
      .then((res) => {
        console.log('Фильм удален из сохраненных', res);
        setSavedMovies(savedMovies.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log(err);
      })
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
            <Header />
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
              addFavoriteMovies={addFavoriteMovies}
              deleteFavoriteMovies={deleteFavoriteMovies}
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
              loggedIn={loggedIn}
            />
          </Route>

          <Route path='/signup'>
            <Register
              onRegister={handleRegisterBtnSubmit}
              registerSuccess={registerSuccess}
            />
          </Route>

          <Route path='/signin'>
            <Login
              onLogin={handleLoginBtnSubmit}
            />
          </Route>

          <Route path='/*'>
            <PageNotFound />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
