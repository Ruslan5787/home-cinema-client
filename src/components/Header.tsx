import { FC } from 'react';
import { PiFilmSlate } from 'react-icons/pi';
import { Link, NavLink } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { MdAccountCircle } from 'react-icons/md';

export const Header: FC = () => {
  const userData = useAppSelector((state) => state.user.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const isAdmin = userData?.role === 'ADMIN';

  return (
    <header className="fixed z-10 flex w-full items-center bg-slate-800 px-10 py-4 shadow-sm backdrop-blur-sm">
      <Link
        to="/"
        className="flex items-center text-lg font-bold"
        preventScrollReset
      >
        <PiFilmSlate size={40} title="Главная" className="mr-2.5" /> Главная
      </Link>
      <nav className="ml-auto">
        <ul className="ml-auto flex items-center gap-5">
          {isAuth && !isAdmin && (
            <>
              <li>
                <NavLink
                  to={'/want-to-watched-films'}
                  preventScrollReset
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                >
                  Желанные
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/favorite-films'}
                  preventScrollReset
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                >
                  Избранные
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/watched-films'}
                  preventScrollReset
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                >
                  Просмотренные
                </NavLink>
              </li>
            </>
          )}

          {isAuth && (
            <li className="ml-3">
              <NavLink
                to={'/profile'}
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                <MdAccountCircle size={40} title="Аккаунт" />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {!isAuth && (
        <Link
          className="ml-auto py-2 text-white/50 hover:text-white"
          to={'auth'}
        >
          Войти / Зарегистрироваться
        </Link>
      )}
    </header>
  );
};
