import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const menuArray = [
  {
    name: 'My page',
    link: '/mypage',
  },
  {
    name: 'User info change',
    link: '/mypage/change-user-info',
  },
  {
    name: 'Email change',
    link: '/mypage/change-email',
  },
  {
    name: 'Password change',
    link: '/mypage/change-password',
  },
];

export default function SideBar() {
  const router = useRouter();
  const handleRedirecRegister = () => {
    Swal.fire({
      title: '「和の日」から退会します。',
      text: '以下のリンクボタンより確認画面にお進みください',
      icon: 'question',
      showCloseButton: true,
      confirmButtonColor: '#d32f2f',
      confirmButtonText: 'Leave',
    }).then((result) => {
      if (result.isConfirmed) router.push('/mypage/leave-user');
    });
  };
  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: 250,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      <nav aria-label='main mailbox folders'>
        <List>
          {menuArray.map((item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton onClick={() => router.push(item.link)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleRedirecRegister}>
              <ListItemText primary='Leave change' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Paper>
  );
}
