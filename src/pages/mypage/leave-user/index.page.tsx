import { accountApi } from '@/Api';
import { BaseButton } from '@/components/common';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { useUser } from '@/hooks';
import { IDeleteUser } from '@/models';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function LeaveUser() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      reason: '',
    },
  });
  const router = useRouter();
  const { logout } = useUser();

  const { mutate } = useMutation(accountApi.deleteUser, {
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      toast.error('Leave faild');
    },
  });
  const onSubmit = (data: IDeleteUser) => {
    mutate(data);
    logout();
  };
  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          退会理由
        </Typography>
        <Typography component='p' sx={{ mt: 1 }}>
          ご満足いただけるサービスをご提供できず申し訳ございません。
        </Typography>
        <Typography component='p' sx={{ mt: 1 }}>
          今後のサービス向上のため、退会理由をお聞かせください。
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name='reason'
            control={control}
            render={({ field }) => <textarea id='reason' {...field} style={{ width: '450px', height: '200px' }} />}
          />
          <BaseButton type='submit' variant='contained' sx={{ mt: 1 }}>
            Submit
          </BaseButton>
        </Box>
      </Box>
    </Container>
  );
}
LeaveUser.Layout = AuthenticatedLayout;
LeaveUser.auth = true;
