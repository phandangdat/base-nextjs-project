import { registerApi } from '@/Api';
import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RegisterConfirm() {
  const { query } = useRouter();
  const [email, setEmail] = useState('');
  const confirmRegister = async () => {
    const res = await registerApi.getRegisterConfirm(
      query.id as string,
      query.expires as string,
      query.signature as string,
    );
    setEmail(res.data.email);

    return res;
  };
  useEffect(() => {
    if (query.expires && query.id && query.signature) {
      confirmRegister();
    }
  }, [query]);
  return (
    <Box sx={{ textAlign: 'center', display: 'inline' }}>
      <Typography variant='h3' component='h3'>
        You have successfully registered an account
      </Typography>
      <Typography variant='h4' component='h3'>
        Email đăng nhập của bạn là: <Chip label={email} />
      </Typography>
    </Box>
  );
}
