import axios from "axios";
import queryString from "query-string";
import StorageHelper from "./StorageHelper";
import { createHashHistory , createBrowserHistory } from "history";
// export default createBrowserHistory();
const history = createHashHistory();
export const DEV_API_URL = "http://api.call";

export const STORAGE_KEYS = {
    token: "token",
    layout: "layout",
    user: "user",
    payment: "odt",
};

export const getAuthInfo = async () => {
  // Call API get token
  return StorageHelper.getCookie(STORAGE_KEYS.token) || "";
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: DEV_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getAuthInfo();
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle errors
    const status = error.status || error.response.data.status;
    console.log('error: ', error);
    console.log('error status: ', error.status);
    if (status === 401) {
      await StorageHelper.removeCookie(STORAGE_KEYS.token);
      await StorageHelper.removeLocalItem(STORAGE_KEYS.user);
      history.push('/auth/login');
    }
    throw error.response.data;
  }
);

export default axiosClient;
