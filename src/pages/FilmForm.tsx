import { Form } from 'react-router';
import { IFilm, IGenre, IRestrictionAge } from '../types';

type FilmFormProps = {
  film?: IFilm;
  action: string;
  genres: IGenre[];
  restrictionAges: IRestrictionAge[]; 
  isCreate: boolean;
}

export const FilmForm = (props: FilmFormProps) => {
  const { film, action, genres, isCreate, restrictionAges } = props;

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
              >
                {genres.map((genre: IGenre, index: number) => (
                  <option key={index} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </label>

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
