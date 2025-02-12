import { ActionFunctionArgs, Form, useLoaderData } from 'react-router';
import { instance } from '../api/axios.api';
import { FaStar } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IGenre } from '../types';

export const favoriteFilmsLoader = async () => {
  const { data } = await instance.get('/favorite-films');

  return data;
};

export const favoriteFilmsAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id');

  await instance.delete('/favorite-films/favorite-film/' + id);
};

const FavoriteFilms = () => {
  const favoriteFilms = useLoaderData();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const limit = 6;

  const fetchFavoriteFilms = async () => {
    const response = await instance.get(
      `/favorite-films/pagination?page=${currentPage}&limit=${limit}`,
    );

    setData(response.data);
    setPagesCount(Math.ceil(favoriteFilms.length / limit));
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchFavoriteFilms();
  }, [favoriteFilms, currentPage]);

  return (
    <div className="rounded-md bg-slate-800 px-5 py-4">
      {favoriteFilms.length ? (
        <div>
          <h1 className="mb-10 flex items-center text-2xl text-yellow-500">
            <FaStar className="mr-3" />
            Список избранных фильмов:
          </h1>
          <div>
            <ul className="row-gap-4 flex flex-wrap gap-y-5 gap-x-5 justify-center">
              {data.map((favoriteFilm) => {
                const film = favoriteFilm.films;
                console.log(film);
                
                return (
                  <li
                    key={film.id}
                    className="group relative flex w-[31.8%] flex-col px-4 rounded-xl p-2 bg-[#264f71]"
                  >
                    <img
                      src={film.poster}
                      className="mb-2.5 h-[400px] rounded-md"
                      alt="Постер фильма"
                    />
                    <h3 className="text-lg">{film.name}</h3>

                    <div className="flex flex-col">
                      <span className="text-sm">{film.yearRelease}</span>
                      <div>
                        {film.genres?.slice(0, 4).map((genre: IGenre, index) => {
                          
                          if (index == film.genres.slice(0, 4).length - 1) {
                            return <span key={genre.id}>{genre.name}</span>
                          }
                          return <span key={genre.id}>{genre.name}, </span>
                        })}
                      </div>
                    </div>

                    <div className="absolute right-[-2px] top-[-19px] hidden group-hover:block">
                      <Form method="delete" action="/favorite-films">
                        <input type="hidden" name="id" value={film.id} />
                        <button type="submit">
                          <IoMdCloseCircle size={40} />
                        </button>
                      </Form>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {favoriteFilms.length > 6 ? (
            <ReactPaginate
              className="flex items-center justify-center gap-3  mt-10"
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
              pageCount={pagesCount}
            />
          ) : null}
        </div>
      ) : (
        <h1 className="flex items-center justify-center text-2xl text-yellow-500">
          <FaStar className="mr-3" /> Список просмотренных фильмов пока пуст.
        </h1>
      )}
    </div>
  );
};

export default FavoriteFilms;
