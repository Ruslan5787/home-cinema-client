export interface IUserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IResponseUserData {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IResponseUserAuth {
  user: IResponseUserData;
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
}

export interface IFilm {
  id: number;
  name: string;
  production: string;
  yearRelease: number;
  duration: number;
  poster: string;
  description: string;
  genre: IGenre;
  genres: IGenre[];
  restrictionAge: IRestrictionAge;
  createAt: Date;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IRestrictionAge {
  id: number;
  name: string;
}

export interface IRestrictionAge {
  id: number;
  restrictionAge: number;
}

export enum EndPointSpecialListsForFilms {
  WantToWatched = 'want-to-watched-film',
  Favorite = 'favorite-film',
  Watched = 'watched-film',
}