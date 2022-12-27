import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const user = JSON.parse(localStorage.getItem('user'));

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});
