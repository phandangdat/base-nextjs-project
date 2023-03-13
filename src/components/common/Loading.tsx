import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        right: '0',
        let: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        oveflow: 'hidden',
        background: '#00000080',
        zIndex: '999',
        transition: 'all .25s linear',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};
