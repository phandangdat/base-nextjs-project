import { BaseButton } from '@/components/common';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';

export default function ConfirmContactSuccess() {
  const router = useRouter();
  return (
    <Container component='main' maxWidth='xs' sx={{ mt: 8, height: '100%' }}>
      <Box sx={{ textAlign: 'center', display: 'inline' }}>
        <Typography variant='h3' component='h3'>
          Your inquiry has been sent
        </Typography>
        <BaseButton onClick={() => router.push('/')} fullWidth>
          Home page
        </BaseButton>
      </Box>
    </Container>
  );
}
