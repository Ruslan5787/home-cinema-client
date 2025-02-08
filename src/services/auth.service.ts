import { instance } from '../api/axios.api';
import {
  IResponseUserAuth,
  IUser,
  IUserLoginData,
  IUserRegistrationData,
} from '../types';

export const AuthService = {
  async registration(
    userData: IUserRegistrationData,
  ): Promise<IResponseUserAuth | undefined> {
    const { data } = await instance.post<IResponseUserAuth>('user', userData);

    return data;
  },

  async login(userData: IUserLoginData): Promise<IUser> {
    const { data } = await instance.post<IUser>('auth/login', userData);
    
    return data;
  },

  async getUser(): Promise<IUser | undefined> {
    const { data } = await instance.get<IUser>('auth/profile');
    
    if (data) return data;
  },
};
