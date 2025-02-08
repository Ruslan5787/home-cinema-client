import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from 'react-router';
import { instance } from '../api/axios.api';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useAppSelector } from '../store/hooks';
import { toast } from 'react-toastify';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { useEffect } from 'react';
import { EndPointSpecialListsForFilms, IFilm } from '../types';
import { getWordForToastAboutSpecialFilm } from '../helpers/helpers';

export const filmLoader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await instance.get('/film/' + params.id);

  return data;
};

export const filmAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id');

  await instance.delete('/film/' + id);

  toast.success('Фильм удален.');

  return redirect('/');
};

const addFilmToSpecialList = async (
  userId: number,
  filmId: number,
  endPointNameList: EndPointSpecialListsForFilms,
) => {
  try {
    await instance.post(`user/${endPointNameList}`, {
      userId,
      filmId,
    });

    if (endPointNameList !== EndPointSpecialListsForFilms.Watched) {
      toast.success(
        `Фильм добавлен в список ${getWordForToastAboutSpecialFilm(endPointNameList)}.`,
      );
    }
  } catch (error: any) {
    if (!error.response?.config.url.includes('/watched-film')) {
      toast.error(error.response.data.message);
    }
  }
};

const Film = () => {
  const filmData = useLoaderData<IFilm>();
  const userData = useAppSelector((state) => state.user.user);
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const userId = useAppSelector((store) => store.user.user?.id);
  const isAdmin = userData?.role === 'ADMIN';

  useEffect(() => {
    addFilmToSpecialList(
      userId!,
      filmData.id,
      EndPointSpecialListsForFilms.Watched,
    );
  }, []);

  return (
    <div className="rounded-md bg-slate-800 px-5 py-4">
      <div className="flex items-start">
        <img
          src={filmData.poster}
          alt="Постер фильма"
          className="mr-10 max-w-xs rounded-md"
        />
        <div className="flex flex-col text-lg">
          <div className="mb-5">
            <div className="flex justify-between w-full">
              <h1 className="mb-5 text-4xl font-bold w-[80%]">
                {filmData.name} ({filmData.yearRelease})
              </h1>

              {isAdmin ? (
                <div className="flex gap-x-3">
                  <Link to={`/edit-film/${filmData.id}`}>
                    <MdModeEditOutline size={23} title="Изменить" />
                  </Link>
                  <Form method="delete" action={`/film/${filmData.id}`}>
                    <input type="hidden" name="id" value={filmData.id} />
                    <button type="submit">
                      <MdDelete size={25} title="Удалить" />
                    </button>
                  </Form>
                </div>
              ) : null}
            </div>
            <div className="mb-5 flex flex-col">
              <span>Страна - {filmData.production}</span>
              <span>Жанр - {filmData.genre.name}</span>
              <span>Время - {filmData.duration}</span>
              <span>
                Ограничение по возрасту -{' '}
                {filmData.restrictionAge.restrictionAge}+
              </span>
            </div>
            <p>{filmData.description}</p>
          </div>

          {isAuth && !isAdmin && (
            <div className="flex flex-col items-start gap-y-3">
              <button
                className="btn btn-indigo flex"
                onClick={() =>
                  addFilmToSpecialList(
                    userId!,
                    filmData.id,
                    EndPointSpecialListsForFilms.WantToWatched,
                  )
                }
              >
                <FaHeart className="mr-1.5" /> Добавить в желанные
              </button>

              <button
                className="btn btn-yellow flex"
                onClick={() =>
                  addFilmToSpecialList(
                    userId!,
                    filmData.id,
                    EndPointSpecialListsForFilms.Favorite,
                  )
                }
              >
                <FaStar className="mr-1.5" /> Добавить в избранные
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Film;
