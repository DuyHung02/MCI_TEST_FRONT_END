import axios from 'axios';
import toast from 'react-hot-toast';
import { get } from 'lodash';
import axiosInstance from '../axios.service';
import { MESSAGE_NETWORK_ERROR } from '@/constants/constant';
import { ICreateCustomer } from '@/types/customer';

export const apiGetCustomers = async () => {
  try {
    return await axiosInstance.get(`/customers/`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiGetDetailCustomer = async (id: number) => {
  try {
    return await axiosInstance.get(`/customers/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiUpdateCustomer = async (payload: ICreateCustomer) => {
  try {
    return await axiosInstance.put(`/customers/`, payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiGetMasterData = async (keys: string[]) => {
  try {
    return await Promise.all(
      keys.map(async key => {
        try {
          const response = await axiosInstance.get(`/customer-${key}/`);
          return { key, data: response.data.results, status: response.status };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return {
              key,
              status: error.response?.status || 500,
              data: error.response?.data?.detail || null,
            };
          }
          return { key, status: 500, data: MESSAGE_NETWORK_ERROR };
        }
      }),
    );
  } catch (error) {
    toast.error(get(error, 'response.data.detail', MESSAGE_NETWORK_ERROR), {
      position: 'top-right',
    });
    return null;
  }
};

export const apiGetSources = async () => {
  try {
    return await axiosInstance.get(`/customer-source/`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiGetStatus = async () => {
  try {
    return await axiosInstance.get(`/customer-status/`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiGetSocials = async () => {
  try {
    return await axiosInstance.get(`/customer-social/`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiGetServices = async () => {
  try {
    return await axiosInstance.get(`/services/`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiCreateCustomer = async (payload: ICreateCustomer) => {
  try {
    return await axiosInstance.post(`/customers/`, payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiCreateSource = async (payload: string) => {
  try {
    return await axiosInstance.post(`/customer-source/`, { title: payload });
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiCreateServices = async (payload: string) => {
  try {
    return await axiosInstance.post(`/services/`, { title: payload });
  } catch (error) {
    if (axios.isAxiosError(error)) {
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

export const apiCreateSocial = async (payload: string) => {
  try {
    return await axiosInstance.post(`/customer-social/`, { title: payload });
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
