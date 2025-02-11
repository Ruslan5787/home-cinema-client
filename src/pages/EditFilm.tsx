import { FC } from 'react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from 'react-router';
import { instance } from '../api/axios.api';
import { toast } from 'react-toastify';
import { FilmForm } from './FilmForm';

export const editFilmLoader = async ({ params }: LoaderFunctionArgs) => {
  const genres = await instance.get('/genre');
  const restrictionAges = await instance.get('/restriction-age');
  const film = await instance.get('film/' + params.id);

  return {
    genres: genres.data,
    film: film.data,
    restrictionAges: restrictionAges.data,
  };
};

export const editFilmAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const payload = Object.fromEntries(formData.entries());

    await instance.patch(`/film/${payload.id}`, payload);

    toast.success('Фильм изменен.');

    return redirect('/');
  } catch (err) {
    const errorMessage = err.response?.data.message;

    if (errorMessage instanceof Array) {
      toast.error(errorMessage[0]);
    } else {
      toast.error(errorMessage);
    }
  }
};

export const EditFilm: FC = () => {
  const { genres, film, restrictionAges } = useLoaderData();

  return (
    <>
      <FilmForm
        film={film}
        restrictionAges={restrictionAges}
        allGenres={genres}
        action={`/edit-film/${film.id}`}
        isCreate={false}
      />
    </>
  );
};
