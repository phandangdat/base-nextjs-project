import { LayoutProps } from '@/models';
import { Box, Container } from '@mui/system';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const DefaultLayout = ({ children }: LayoutProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header></Header>
    <Container sx={{ my: '100px' }}>
      <Box>{children}</Box>
    </Container>
    <Footer></Footer>
  </Box>
);

export default DefaultLayout;
