import { BaseButton } from '@/components/common';
import { useUser } from '@/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as LinkMUI, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
interface Props {
  window?: () => Window;
}

const navItems = [
  { page: 'Login', href: '/login' },
  { page: 'Register', href: '/register' },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogged, setIsLogged] = useState('');
  const router = useRouter();
  const cookies = parseCookies();
  const { logout } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsLogged(cookies.userToken);
  }, [cookies]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link href='/'>
        <Typography variant='h3'>ロゴ</Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link href={item.href}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.page} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Link href='/'>募金・寄付する</Link>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    logout();
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

  const handleRedirectDonate = () => {
    Swal.fire({
      title: 'How would you like to donate?',
      icon: 'question',
      showDenyButton: true,
      showCloseButton: true,
      denyButtonColor: '#09f',
      confirmButtonText: 'Monthly Donate',
      denyButtonText: 'Donate',
    }).then((result) => {
      if (result.isConfirmed) router.push('/donate/donate-monthly');
      if (result.isDenied) router.push('/donate/donate-once');
    });
  };
  return (
    <Box>
      <AppBar component='nav' sx={{ background: '#F2ECDC', zIndex: 99 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '100px',
            margin: '0 60px',
          }}
        >
          <Link href='/' legacyBehavior>
            <LinkMUI sx={{ alignItems: 'center', display: 'flex', justifyItems: 'center' }}>
              <Typography variant='h3'>ロゴ</Typography>
            </LinkMUI>
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Box sx={{ marginRight: '20px' }}>
              <BaseButton
                sx={{ color: '#36342E', fontWeight: '900' }}
                variant='text'
                onClick={() => router.push('/contact')}
              >
                Contact
              </BaseButton>
            </Box>
            {isLogged ? (
              <Box sx={{ marginRight: '20px' }}>
                <BaseButton
                  sx={{ color: '#36342E', fontWeight: '900' }}
                  variant='text'
                  onClick={() => router.push('/mypage')}
                >
                  Mypage
                </BaseButton>
                <BaseButton sx={{ color: '#36342E', fontWeight: '900' }} variant='text' onClick={handleLogout}>
                  Logout
                </BaseButton>
              </Box>
            ) : (
              <Box sx={{ marginRight: '20px' }}>
                <BaseButton
                  sx={{ color: '#36342E', fontWeight: '900' }}
                  variant='text'
                  onClick={() => router.push('/login')}
                >
                  Login
                </BaseButton>
                <BaseButton sx={{ color: '#36342E', fontWeight: '900' }} variant='text' onClick={handleRedirecRegister}>
                  和ンバサダーになる
                </BaseButton>
              </Box>
            )}
            <BaseButton
              sx={{
                fontSize: '25px',
                p: '5px 10px',
              }}
              onClick={handleRedirectDonate}
            >
              募金・寄付する
            </BaseButton>
          </Box>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          anchor='right'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
