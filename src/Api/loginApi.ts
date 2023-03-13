import { axiosClient } from '@/libs/axios-client';

export const loginApi = {
  login: (data: { email: string; password: string }) => {
    return axiosClient.post('/user-client/login', data);
  },
};
