import { axiosClient } from '@/libs/axios-client';
import { IChangeEmail, IChangePassword, IDeleteUser } from '@/models';

export const accountApi = {
  putChangePassword: (data: IChangePassword) => {
    return axiosClient.put('/user-client/change-password', {
      password_old: data.oldPassword,
      password_new: data.newPassword,
    });
  },
  postChangeEmail: (data: IChangeEmail) => {
    return axiosClient.post('/user-client/change-mail', {
      email: data.newEmail,
    });
  },
  putConfirmChangeEmail: (data: { code: string; email: string }) => {
    return axiosClient.put('/user-client/change-mail/confirm', {
      email: data.email,
      code: data.code,
    });
  },
  getInfoUser: () => {
    return axiosClient.get('/user-client/profile');
  },
  postChangeUserInfo: (data: any) => {
    return axiosClient.post('/user-client/profile/update', data);
  },
  deleteUser: (reason: IDeleteUser) => {
    return axiosClient.delete('/user-client/leave', { data: reason });
  },
};
