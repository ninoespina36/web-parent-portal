import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL : 'https://edulearn-adam.cf/'
});

instance.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${store?.getState()?.auth?.token}`;
    return config;
  },
  err => { return Promise.reject(err) }
);

export default instance;