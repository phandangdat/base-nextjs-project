import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function ForgotConfirm() {
  return (
    <Box sx={{ textAlign: 'center', display: 'inline' }}>
      <Typography variant='h3' component='h3'>
        We sent you an email which contains a link to reset your password
      </Typography>
    </Box>
  );
}
