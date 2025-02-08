import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home, { filmsLoader } from '../pages/Home';
import Auth from '../pages/Auth';
import FavoriteFilms, {
  favoriteFilmsAction,
  favoriteFilmsLoader,
} from '../pages/FavoriteFilms';
import WatchedFilms, {
  addWatchedFilmLoader,
  watchedFilmAction,
} from '../pages/WatchedFilms';
import WantToWatchedFilms, {
  wantToWatchedFilmAction,
  wantToWatchedFilmsLoader,
} from '../pages/WantToWatchedFilms';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import Film, { filmAction, filmLoader } from '../pages/Film';
import {
  CreateFilm,
  createFilmAction,
  createFilmLoader,
} from '../pages/CreateFilm';
import { EditFilm, editFilmAction, editFilmLoader } from '../pages/EditFilm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        loader: filmsLoader,
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'favorite-films',
        loader: favoriteFilmsLoader,
        action: favoriteFilmsAction,
        element: (
          <ProtectedRoute>
            <FavoriteFilms />
          </ProtectedRoute>
        ),
      },
      {
        path: 'watched-films',
        loader: addWatchedFilmLoader,
        action: watchedFilmAction,
        element: (
          <ProtectedRoute>
            <WatchedFilms />
          </ProtectedRoute>
        ),
      },
      {
        path: 'want-to-watched-films',
        loader: wantToWatchedFilmsLoader,
        action: wantToWatchedFilmAction,
        element: (
          <ProtectedRoute>
            <WantToWatchedFilms />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-film',
        loader: createFilmLoader,
        action: createFilmAction,
        element: (
          <ProtectedRoute>
            <CreateFilm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-film/:id',
        loader: editFilmLoader,
        action: editFilmAction,
        element: (
          <ProtectedRoute>
            <EditFilm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'film/:id',
        loader: filmLoader,
        action: filmAction,
        element: <Film />,
      },
      // {
      //   path: 'user/want-to-watched-films',
      //   action: addWantToWatchedFilmAction,
      // },
    ],
  },
]);
