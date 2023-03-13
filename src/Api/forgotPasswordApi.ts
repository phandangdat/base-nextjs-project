import { axiosClient } from '@/libs/axios-client';

export const forgotPasswordApi = {
  postMailForgot: (data: { email: string }) => {
    return axiosClient.post('/user-client/reset-password', data);
  },
  postChangePassword: (data: {
    email: string;
    password: string;
    password_confirmation: string;
    verify_code: string;
  }) => {
    return axiosClient.put('/user-client/reset-password', data);
  },
};
