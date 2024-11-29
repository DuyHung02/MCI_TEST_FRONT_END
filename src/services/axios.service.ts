import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { set } from 'lodash';
import toast from 'react-hot-toast';
import { NETWORK_ERROR_CODE } from '@/constants/constant';

let errorCount = 0;
// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout | null = null;

export function createAxiosInstance() {
  return Axios.create({
    timeout: 60000,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

const axiosInstance = createAxiosInstance();

export function addRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
      let accessToken = '';
      const dataLocal = localStorage.getItem('auth');
      if (dataLocal) {
        const tokenData = JSON.parse(dataLocal);
        if (tokenData) {
          accessToken = JSON.parse(tokenData.token);
        }
      }
      if (accessToken) {
        set(config, 'headers.Authorization', `Bearer ${accessToken}`);
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return instance;
}

const willRedirectWhenErrorMaxConfigTimes = () => {
  errorCount += 1;
  if (!timer) {
    timer = setTimeout(() => {
      errorCount = 0;
      timer = null;
    }, 3000);
  }
  if (errorCount > 10) {
    window.location.replace('/');
  }
};

export function addResponseInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    response => {
      errorCount = 0;
      return response;
    },
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        if (window.location.pathname !== '/auth/login') {
          localStorage.clear();
          window.location.replace('/auth/login');
          toast.error('You signed in from another location!', {
            position: 'top-right',
          });
        }
      }
      if (
        error?.response?.status === 500 ||
        (error.code && +error.code === NETWORK_ERROR_CODE)
      ) {
        willRedirectWhenErrorMaxConfigTimes();
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export default addResponseInterceptor(addRequestInterceptor(axiosInstance));
