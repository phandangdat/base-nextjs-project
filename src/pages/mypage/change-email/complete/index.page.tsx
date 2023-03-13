import { BaseButton } from '@/components/common';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';

export default function ConfirmContactSuccess() {
  const router = useRouter();
  return (
    <Container component='main' maxWidth='xs' sx={{ mt: 8, height: '100%' }}>
      <Box sx={{ textAlign: 'center', display: 'inline' }}>
        <Typography variant='h3' component='p'>
          新しいメールアドレスの変更が完了しました
        </Typography>
        <BaseButton onClick={() => router.push('/mypage')} fullWidth>
          My page
        </BaseButton>
      </Box>
    </Container>
  );
}
