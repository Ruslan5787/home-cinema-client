import { FC } from 'react';
import { ActionFunctionArgs, redirect, useLoaderData } from 'react-router';
import { instance } from '../api/axios.api';
import { toast } from 'react-toastify';
import { FilmForm } from './FilmForm';

export const createFilmLoader = async () => {
  const genres = await instance.get('/genre');
  const restrictionAges = await instance.get('/restriction-age');

  return { genres: genres.data, restrictionAges: restrictionAges.data };
};

export const createFilmAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());

    await instance.post('/film', payload);

    toast.success('Фильм добавлен.');

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

export const CreateFilm: FC = () => {
  const { genres, restrictionAges } = useLoaderData();

  return (
    <>
      <FilmForm restrictionAges={restrictionAges} allGenres={genres} action="/create-film" isCreate />
    </>
  );
};
