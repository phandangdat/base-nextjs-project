import { axiosClient } from '@/libs/axios-client';

export const registerApi = {
  register: (data: any) => {
    return axiosClient.post('/user-client/register', data);
  },
  getPostOffice: (code: string) => {
    return axiosClient.get(`/user-client/post-offices?code=${code}`);
  },
  getRegisterConfirm: (id: string, expires: string, signature: string) => {
    return axiosClient.put(`/user-client/register/confirm?expires=${expires}&id=${id}&signature=${signature}`);
  },
};
