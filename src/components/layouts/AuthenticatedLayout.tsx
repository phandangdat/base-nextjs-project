import { LayoutProps } from '@/models';
import { Box, Container } from '@mui/system';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SideBar from './Sidebar/Sidebar';

const AuthenticatedLayout = ({ children }: LayoutProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <Container maxWidth='lg' sx={{ display: 'flex', margin: '130px auto' }}>
      <SideBar />
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          bgcolor: 'background.paper',
          ml: 2,
        }}
      >
        {children}
      </Box>
    </Container>
    <Footer></Footer>
  </Box>
);

export default AuthenticatedLayout;
