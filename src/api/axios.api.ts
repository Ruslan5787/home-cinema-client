import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localtorage.helper';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api', //localhost 'http://217.114.12.78:3000/api'
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  },
});
