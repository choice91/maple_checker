import axios from 'axios';
import { getCookie } from '../utils/Cookies';
import { getLocalStorage } from '../utils/LocalStorage';

const { REACT_APP_BASE_URL } = process.env;

const API = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorage('token');

    if (!accessToken) {
      config.headers['Authorization'] = null;
      config.headers['Refresh-Token'] = null;
      return config;
    }

    if (config.headers && accessToken) {
      // const { accessToken } = JSON.parse(token);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupInterceptor = (navigate) => {
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;

      if (error.response && error.response.status === 401) {
        const accessToken = getLocalStorage('token');
        const refreshToken = getCookie('refresh');

        try {
          const response = await axios({
            url: `${REACT_APP_BASE_URL}/refresh`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refresh: `Bearer ${refreshToken}`,
              withCredentials: true,
            },
          });

          if (response) {
            const {
              data: {
                token: {
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
                },
              },
            } = response;

            localStorage.setItem(
              'token',
              JSON.stringify({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              })
            );

            return await API.request(originalConfig);
          }
        } catch (error) {
          console.error(error);

          const {
            response: {
              status,
              data: { errorMessage },
            },
          } = error;

          if (status === 401 && errorMessage === '인증 만료') {
            navigate('/login');
          }

          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default API;
