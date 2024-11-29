import axios from 'axios';
import { ILogin } from '@/types/auth';
import toast from 'react-hot-toast';
import { get } from 'lodash';
import axiosInstance from '../axios.service';
import { MESSAGE_NETWORK_ERROR } from '@/constants/constant';

export const apiLogin = async (payload: ILogin) => {
  try {
    const response = await axiosInstance.post(`user-login/`, payload);
    console.log('response login: ', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error);
      return {
        status: error?.response?.status,
        data: error?.response?.data?.detail,
      };
    }
    toast.error(get(error, 'response.data.detail', MESSAGE_NETWORK_ERROR), {
      position: 'top-right',
    });
    return null;
  }
};
