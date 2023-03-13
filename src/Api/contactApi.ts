import { axiosClient } from '@/libs/axios-client';
import { IContact } from '@/models';

export const contactApi = {
  postContact: (data: IContact) => {
    return axiosClient.post('/user-client/contact', data);
  },
};
