import { forgotPasswordApi } from '@/Api';
import { BaseButton } from '@/components/common';
import { Link as LinkMui } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function ForgotPassword() {
  const router = useRouter();

  const { mutate } = useMutation(forgotPasswordApi.postMailForgot, {
    onSuccess: () => {
      router.push('/forgot-password/confirm');
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    mutate({ email: data.get('email') as string });
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
          <TextField margin='normal' fullWidth id='email' label='Email Address' name='email' autoFocus />
          <BaseButton type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Send password reset link
          </BaseButton>
          <Grid container>
            <Grid item>
              <Link href='/login' legacyBehavior>
                <LinkMui sx={{ cursor: 'pointer' }} variant='body2'>
                  Go back
                </LinkMui>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
