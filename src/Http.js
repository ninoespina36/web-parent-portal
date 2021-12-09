import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL : 'https://edulearn-adam.cf/'
});

instance.defaults.headers.common.Authorization = `Bearer ${store.getState().auth.user.token}`;

instance.interceptors.response.use(
  response => response,
  (error) => {
    console.log(error.response.status);
    return Promise.reject(error);
  },
);

export default instance;
