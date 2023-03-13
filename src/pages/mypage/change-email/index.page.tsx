import { accountApi } from '@/Api';
import { BaseButton, BaseInput } from '@/components/common';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { useStorage } from '@/hooks';
import { IChangeEmail } from '@/models';
import { changeEmail } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ChangeEmail() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newEmail: '',
    },
    resolver: yupResolver(changeEmail),
  });
  const router = useRouter();
  const { getItem } = useStorage();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setUserEmail(JSON.parse(getItem('userInfo')).email);
  }, [getItem]);

  const { mutate } = useMutation(accountApi.postChangeEmail, {
    onSuccess: () => {
      router.push(`/mypage/change-email/confirm?email=${watch('newEmail')}`);
    },
  });

  const onSubmit = (data: IChangeEmail) => {
    mutate(data);
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography component='h1' variant='h5'>
            メールアドレスを変更する
          </Typography>
          <Typography component='p' sx={{ mt: 1 }}>
            現在のメールアドレス: {userEmail}
          </Typography>
          <Typography component='p' sx={{ mt: 1 }}>
            新しいメールアドレス：
          </Typography>
          <BaseInput
            name='newEmail'
            control={control}
            margin='normal'
            label='New email'
            fullWidth
            id='newEmail'
            error={errors.newEmail ? true : false}
            helperText={errors.newEmail?.message}
          />
          <BaseButton type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Change
          </BaseButton>
        </form>
      </Box>
    </Container>
  );
}
ChangeEmail.Layout = AuthenticatedLayout;
ChangeEmail.auth = true;
