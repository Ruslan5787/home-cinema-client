import { FC, useEffect, useState } from 'react';
import { instance } from '../api/axios.api';
import { Form, Link, useBlocker, useLoaderData } from 'react-router';
import ReactPaginate from 'react-paginate';
import { FaPlus } from 'react-icons/fa';
import { useAppSelector } from '../store/hooks';
import { IFilm, IGenre } from '../types';
import { GrClearOption } from 'react-icons/gr';
import { Modal } from '../components/Modal';

export const filmsLoader = async () => {
  const films = await instance.get('/film');
  const genres = await instance.get('/genre');

  return { films: films.data, genres: genres.data };
};

const Home: FC = () => {
  const { films, genres } = useLoaderData();

  const [modalInfoIsOpen, setModalInfoOpen] = useState<boolean>(false);
  const [data, setData] = useState<IFilm[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchString, setSearchString] = useState<string>('');
  const [isSearchFilms, setIsSearchFilms] = useState<boolean>(false);
  const [isGenreFilms, setIsGenreFilms] = useState<boolean>(false);

  const userData = useAppSelector((state) => state.user.user);
  const isAdmin = userData?.role === 'ADMIN';

  const limit = 9;

  const fetchFilm = async (page: number) => {
    const response = await instance.get(
      `/film/pagination?page=${page}&limit=${limit}`,
    );

    setData(response.data);
    setTotalPages(Math.ceil(films.length / limit));
  };

  const fetchSearchFilms = async (string: string) => {
    const response = await instance.get(`/film/search?string=${string}`);

    setData(response.data);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const filmWasClickedId = Number(nextLocation.pathname.split('/').pop());
    let filmWasClicked!: IFilm;

    data.forEach((film) => {
      if (film.id === filmWasClickedId) {
        filmWasClicked = film;
      }
    });

    const isBlockNavigation =
      filmWasClicked?.restrictionAge.restrictionAge >= 18 &&
      nextLocation.pathname.includes('/film/') && !isAdmin;

    if (isBlockNavigation) {
      setModalInfoOpen(true);
    }

    return isBlockNavigation;
  });

  useEffect(() => {
    fetchFilm(currentPage);
  }, [films, currentPage]);

  useEffect(() => {
    if (searchString == '' && !isGenreFilms) {
      fetchFilm(currentPage);
      setIsSearchFilms(false);
    } else if (searchString.length > 0) {
      fetchSearchFilms(searchString);
      setIsSearchFilms(true);
    }
  }, [searchString]);

  const selectOnChange = async (event) => {
    if (event.target.value != 'Без жанра') {
      setIsSearchFilms(false);
      setIsGenreFilms(true);
      setSearchString('');
      const response = await instance.get(
        `film/searchFilmsAboutGenre?genre=${event.target.value}`,
      );

      setData(response.data);
    } else {
      setIsGenreFilms(false);
      fetchFilm(1);
    }
  };

  const userWarning = () => {
    if (isSearchFilms) {
      return (
        <div className="pt-10 text-center text-xl">Такого фильма нет...</div>
      );
    } else if (isGenreFilms) {
      return (
        <div className="pt-10 text-center text-xl">
          Фильмов с таким жанром пока нет...
        </div>
      );
    }
  };

  return (
    <>
      <div className="mb-5 flex rounded-md bg-slate-800 px-5 py-4">
        <Form className="mr-5 w-full" method="post" action="/create-film1">
          <label className="flex flex-col">
            <span className="mb-1 text-lg">Поиск</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Введите название фильма..."
                className="input w-full bg-slate-700 placeholder:text-white/70"
                name="search"
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value);
                  setIsGenreFilms(false);
                }}
              />
              <button
                className="absolute right-[20px] top-[16px]"
                type="button"
                title="Clear"
                onClick={() => {
                  setSearchString('');
                  setIsSearchFilms(false);
                }}
              >
                <GrClearOption />
              </button>
            </div>
          </label>
        </Form>

        <Form className="w-4/12">
          <label className="flex flex-col">
            <span className="mb-1 text-lg">Жанр</span>
            <select
              className="input w-full bg-slate-700 placeholder:text-white/70"
              name="genre"
              required
              defaultValue={''}
              onChange={selectOnChange}
            >
              <option>Без жанра</option>
              {genres.map((genre: IGenre, index: number) => (
                <option key={index} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
        </Form>
      </div>

      <div className="rounded-md bg-slate-800 px-5 py-4">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl">Список всех фильмов:</h1>
          {isAdmin ? (
            <Link
              to={'/create-film'}
              className="flex items-center rounded-md border bg-slate-800 px-3 py-2 hover:bg-slate-700"
            >
              <FaPlus className="mr-3" /> Добавить фильм
            </Link>
          ) : null}
        </div>

        <div className="mb-14">
          {data.length ? (
            <ul className="row-gap-4 flex flex-wrap gap-y-5 gap-x-5 justify-center">
              {data.map((film: IFilm) => (
                <li key={film.id} className="flex w-[31.8%] flex-col rounded-xl p-2 bg-[#264f71]">
                  <Link to={'/film/' + film.id}>
                    <div className="relative">
                      <img
                        src={film.poster}
                        className="mb-2.5 h-[400px] rounded-md"
                        alt="Постер фильма"
                      />
                      <span className="absolute bottom-[-1px] left-[-1px] w-[13%] rounded-bl-md rounded-tr-md bg-cyan-700 p-1 text-center text-sm">
                        {film.restrictionAge.restrictionAge}+
                      </span>
                    </div>
                    <h3 className="text-lg">{film.name}</h3>

                    <div className="flex flex-col">
                      <span className="text-sm">{film.yearRelease}</span>
                      <div>
                        {film.genres?.slice(0, 4).map((genre: IGenre, index) => {
                          if (index == film.genres.slice(0, 4).length - 1) {
                            return <span key={index}>{genre.name}</span>
                          }
                          return <span key={index}>{genre.name}, </span>
                        })}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            userWarning()
          )}
        </div>

        {films.length > 9 && !isSearchFilms && !isGenreFilms ? (
          <ReactPaginate
            forcePage={currentPage - 1}
            className="flex items-center justify-center gap-3"
            activeClassName="bg-cyan-700 rounded-md"
            pageLinkClassName="py-1 px-3 block"
            previousLinkClassName="block px-3 py-1 rounded-md bg-slate-700 mr-2.5"
            nextLinkClassName="block px-3 py-1 rounded-md bg-slate-700 ml-2.5"
            disabledLinkClassName="bg-slate-700 cursor-not-allowed"
            previousLabel="Назад"
            nextLabel="Далее"
            onPageChange={handlePageChange}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={totalPages}
          />
        ) : null}
      </div >

      {
        blocker.state === 'blocked' ? (
          <Modal isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)}>
            <div className="text-center">
              <div className="mb-10">
                <h3 className="mb-7 text-3xl font-bold">Предупреждение</h3>
                <div className="text-xl">
                  <p className="mb-5">
                    Для просмотра данного фильма нужно потвердить возраст!
                  </p>
                  <p>
                    Вам есть <b>18+</b> лет?
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-for-modal mr-10"
                  onClick={() => {
                    setModalInfoOpen(false);
                    blocker.proceed();
                  }}
                >
                  Да
                </button>
                <button
                  className="btn btn-for-modal"
                  onClick={() => {
                    setModalInfoOpen(false);
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          </Modal>
        ) : null
      }
    </>
  );
};

export default Home;
