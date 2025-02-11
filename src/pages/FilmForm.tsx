import { Form } from 'react-router';
import { IFilm, IGenre, IRestrictionAge } from '../types';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { instance } from '../api/axios.api';

type FilmFormProps = {
  film?: IFilm;
  action: string;
  allGenres: IGenre[];
  restrictionAges: IRestrictionAge[];
  isCreate: boolean;
}

export const FilmForm = (props: FilmFormProps) => {
  const { film, action, allGenres, isCreate, restrictionAges } = props;
  const [genresFilm, setGenres] = useState<IGenre>([]);

  useEffect(() => {
    setGenres(film?.genres);
  }, [])

  useEffect(() => {
    console.log(genresFilm);

  }, [])

  const addGenreToFilm = async (genreId: number) => {
    await instance.post(`film/films/${film?.id}/genres/${genreId}`)
    // .then(() => axios.get(`/api/films/${filmId}/genres`))
    // .then((res) => setFilmGenres(res.data));
  };

  const removeGenreFromFilm = (genreId: number) => {
    axios.delete(`/api/films/${filmId}/genres/${genreId}`)
      .then(() => axios.get(`/api/films/${filmId}/genres`))
      .then((res) => setFilmGenres(res.data));
  };

  return (
    <div className="m-auto flex max-w-[550px]">
      <div className="w-full rounded-md bg-slate-800 px-5 py-4">
        <h1 className="mb-5 text-center text-2xl">
          {isCreate ? 'Добавление фильма' : 'Изменение фильма'}
        </h1>
        <Form method="post" action={action}>
          <div className="mb-6">
            <input type="hidden" name="id" defaultValue={film?.id} />

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">Название фильма</span>
              <input
                type="text"
                placeholder="Название"
                className="input bg-slate-700 placeholder:text-white/70"
                name="name"
                defaultValue={film?.name || ''}
                readOnly={!isCreate}
              />
            </label>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">Постер</span>

              <input
                type="text"
                placeholder="Постер (URL картинки)"
                className="input bg-slate-700 placeholder:text-white/70"
                name="poster"
                defaultValue={film?.poster || ''}
              />
            </label>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">Жанр</span>
              <select
                className="input bg-slate-700 placeholder:text-white/70"
                name="genre"
                required
                defaultValue={film?.genre.id || 1}
                onChange={(event) => {
                  console.log(event.target.value);

                  addGenreToFilm(event.target.value);
                  // const select = event.target;
                  // const genreId = select.options[select.selectedIndex].value;
                  // const genreName = select.options[select.selectedIndex].text;

                  // setGenres([{ id: genreId, name: genreName }, ...genresFilm])
                }}
              >
                {allGenres.map((genre: IGenre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </label>

            <div className='flex flex-wrap items-center gap-2'>
              {genresFilm?.map((genre: IGenre) => (
                <div key={genre.id} className='group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2'>
                  {genre.name}

                  <div className='group-hover:flex absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-end rounded-lg bg-black/60 px-3'>
                    <button>
                      <AiFillCloseCircle />
                    </button>

                  </div>
                </div>
              ))}</div>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">Ограничение по возрасту</span>
              <select
                className="input bg-slate-700 placeholder:text-white/70"
                name="restrictionAge"
                required
                defaultValue={film?.restrictionAge.id || 0}
              >
                {restrictionAges.map((restrictionAge: IRestrictionAge, index: number) => (
                  <option key={index} value={restrictionAge.id}>
                    {restrictionAge.restrictionAge}
                  </option>
                ))}
              </select>
            </label>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">Страна</span>
              <input
                type="text"
                placeholder="Страна"
                className="input bg-slate-700 placeholder:text-white/70"
                name="production"
                defaultValue={film?.production || ''}
              />
            </label>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">
                Год производства <small>(Пример записи: 2011)</small>
              </span>
              <input
                type="number"
                placeholder="Год производства"
                className="input bg-slate-700 placeholder:text-white/70"
                name="yearRelease"
                defaultValue={film?.yearRelease || ''}
              />
            </label>

            <label className="mb-4 flex flex-col">
              <span className="mb-1 text-lg">
                Время <small>(Пример записи: 95)</small>
              </span>
              <input
                type="text"
                placeholder="Время"
                className="input bg-slate-700 placeholder:text-white/70"
                name="duration"
                defaultValue={film?.duration || ''}
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-lg">Описание</span>
              <textarea
                placeholder="Описание"
                className="input h-[200px] bg-slate-700 placeholder:text-white/70"
                name="description"
                defaultValue={film?.description || ''}
              />
            </label>
          </div>

          <button
            className="btn btn-green w-full justify-center text-center"
            type="submit"
          >
            Сохранить
          </button>
        </Form>
      </div>
    </div>
  );
};
