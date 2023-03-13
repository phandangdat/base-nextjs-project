import { accountApi } from '@/Api';
import { BaseButton, BaseInput } from '@/components/common';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { IChangePassword } from '@/models';
import { changePassword } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    resolver: yupResolver(changePassword),
  });
  const router = useRouter();

  const { mutate } = useMutation(accountApi.putChangePassword, {
    onSuccess: () => {
      router.push('/mypage/change-password/complete');
    },
    onError: () => {
      toast.error('Change password faild');
    },
  });
  const onSubmit = (data: IChangePassword) => {
    mutate(data);
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
        <Typography component='p' variant='h5'>
          パスワードを変更する
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={4} container alignItems='center'>
              <Typography component='p' variant='subtitle1'>
                現在のパスワードを入力
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <BaseInput
                name='oldPassword'
                control={control}
                margin='normal'
                fullWidth
                id='oldPassword'
                type='password'
                autoFocus
              />
            </Grid>
            <Grid item xs={4} container alignItems='center'>
              <Typography component='p' variant='subtitle1'>
                新しいパスワードを入力
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <BaseInput
                name='newPassword'
                control={control}
                margin='normal'
                fullWidth
                type='password'
                id='newPassword'
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center' }}>
            <BaseButton type='submit' fullWidth variant='contained' sx={{ mt: 2, width: '50%' }}>
              Change
            </BaseButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
ChangePassword.Layout = AuthenticatedLayout;
ChangePassword.auth = true;
