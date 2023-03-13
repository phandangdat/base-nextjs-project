import { axiosClient } from '@/libs/axios-client';

export const logoutApi = {
  logout: () => {
    return axiosClient.post('/user-client/logout');
  },
};
