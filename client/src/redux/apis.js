import axios from "axios";
import { getCookie, setCookie } from "../utils/Cookies";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

const { NODE_ENV, REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

const returnBaseUrl = () => {
  return NODE_ENV === "development" ? REACT_APP_DEV_URL : REACT_APP_PROD_URL;
};

const API = axios.create({
  baseURL: `${returnBaseUrl()}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorage("token");

    if (!accessToken) {
      config.headers["Authorization"] = null;
      config.headers["Refresh-Token"] = null;
      return config;
    }

    if (config.headers && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
        const accessToken = getLocalStorage("token");
        const refreshToken = getCookie("refresh");

        try {
          const response = await axios({
            url: `${returnBaseUrl()}/api/refresh`,
            method: "GET",
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

            setLocalStorage("token", newAccessToken);
            setCookie("refresh", newRefreshToken);

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

          if (status === 401 && errorMessage === "인증 만료") {
            navigate("/login");
          }

          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default API;
