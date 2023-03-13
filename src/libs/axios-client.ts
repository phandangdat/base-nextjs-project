import axios from 'axios';
import dayjs from 'dayjs';
import { parseCookies } from 'nookies';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: baseURL + '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    timezone: process.env.NODE_ENV === 'development' ? '+09:00' : dayjs().format('Z').toString(),
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const cookies = parseCookies();
    if (cookies.userToken && config.headers) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${cookies.userToken}`,
      };
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error.response.data.errors[0].message);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  // async (token)
  async (response) => {
    return response.data;
  },
  async (error) => {
    const message = error?.response?.data?.message;
    const data = error?.response?.data?.data;
    const code = error.response && Number(error.response.status);

    error.response.data = { message, code, data };

    return Promise.reject(error);
  },
);
