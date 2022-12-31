import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const API = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (!token) {
      config.headers['accessToken'] = null;
      config.headers['refreshToken'] = null;
      return config;
    }

    if (config.headers && token) {
      const { accessToken } = JSON.parse(token);
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
      const token = localStorage.getItem('token');

      if (error.response && error.response.status === 401) {
        const { accessToken, refreshToken } = JSON.parse(token);

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
