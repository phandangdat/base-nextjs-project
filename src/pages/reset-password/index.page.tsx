import { forgotPasswordApi } from '@/Api';
import { BaseButton } from '@/components/common';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const { query } = useRouter();

  const { mutate } = useMutation(forgotPasswordApi.postChangePassword, {
    onSuccess: () => {
      toast.success('Change password success!');
    },
    onError: () => {
      toast.error('Change password failed!');
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutate({
      email: query.email as string,
      password: data.get('password') as string,
      password_confirmation: data.get('passwordConfirm') as string,
      verify_code: query.verify_code as string,
    });
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            name='password'
            margin='normal'
            type='password'
            fullWidth
            id='newPassword'
            label='New password'
            autoFocus
          />
          <TextField
            name='passwordConfirm'
            margin='normal'
            type='password'
            fullWidth
            id='newPasswordConfirm'
            label='New password (confirm)'
            autoFocus
          />
          <BaseButton type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Save
          </BaseButton>
        </Box>
      </Box>
    </Container>
  );
}
