import { BaseButton, BaseInput } from '@/components/common';
import { useUser } from '@/hooks';
import { ILogin } from '@/models';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as MUILink } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function SignIn() {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { login } = useUser();

  const onSubmit = async (data: ILogin) => {
    login(data);
  };

  const handleRedirecRegister = () => {
    Swal.fire({
      title: 'What type of account do you want to sign up for?',
      icon: 'question',
      showDenyButton: true,
      showCloseButton: true,
      denyButtonColor: '#09f',
      confirmButtonText: 'Company',
      denyButtonText: 'Individual',
    }).then((result) => {
      if (result.isConfirmed) router.push('/register/company');
      if (result.isDenied) router.push('/register/individual');
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Grid container sx={{ my: 2 }} alignItems='center'>
            <Grid item xs={3}>
              <Typography component='span' variant='h6'>
                Email
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <BaseInput name='email' control={control} fullWidth size='small' id='email' autoFocus />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 2 }} alignItems='center'>
            <Grid item xs={3}>
              <Typography component='span' variant='h6'>
                Password
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <BaseInput name='password' control={control} fullWidth size='small' type='password' id='password' />
            </Grid>
          </Grid>
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Grid container justifyContent='center'>
            <BaseButton type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </BaseButton>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href='/forgot-password' legacyBehavior>
                <MUILink>Forgot password?</MUILink>
              </Link>
            </Grid>
            <Grid item>
              <MUILink onClick={handleRedirecRegister}>Dont have an account? Sign Up</MUILink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
