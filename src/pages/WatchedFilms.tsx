import { ActionFunctionArgs, Form, useLoaderData } from 'react-router';
import { instance } from '../api/axios.api';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IGenre } from '../types';

export const addWatchedFilmLoader = async () => {
  const { data } = await instance.get('/watched-films');

  return data;
};

export const watchedFilmAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id');

  await instance.delete('/watched-films/watched-film/' + id);
};

const WatchedFilms = () => {
  const watchedFilms = useLoaderData();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 6;

  const fetchWatchedFilms = async (page: number) => {
    const response = await instance.get(
      `/watched-films/pagination?page=${page}&limit=${limit}`,
    );

    setData(response.data);
    setTotalPages(Math.ceil(watchedFilms.length / limit));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    fetchWatchedFilms(currentPage);
  }, [watchedFilms, currentPage]);

  return (
    <div className="h-full rounded-md bg-slate-800 px-5 py-4">
      {watchedFilms.length ? (
        <div>
          <h1 className="mb-10 flex items-center text-2xl text-orange-500">
            <FaCheckCircle className="mr-3" />
            Список просмотренных фильмов:
          </h1>
          <div>
            <ul className="row-gap-4 flex flex-wrap gap-y-5 gap-x-5 justify-center">
              {data.map((watchedFilm) => {
                const film = watchedFilm.films;

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
                      <Form method="delete" action="/watched-films">
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

          {watchedFilms.length > 6 ? (
            <ReactPaginate
              className="flex items-center justify-center gap-3 mt-14"
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
        </div>
      ) : (
        <h1 className="flex items-center justify-center text-2xl text-orange-500">
          <FaCheckCircle className="mr-3" /> Список просмотренных фильмов пока
          пуст.
        </h1>
      )}
    </div>
  );
};

export default WatchedFilms;
