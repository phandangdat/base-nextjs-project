import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { useStorage } from '@/hooks';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { CompanyForm } from './components/CompanyForm';
import { IndividualForm } from './components/IndividualForm';

export default function ChangeUserInfo() {
  const { getItem } = useStorage();
  const [userType, setUsertype] = useState('');

  useEffect(() => {
    setUsertype(JSON.parse(getItem('userInfo')).type);
  }, []);

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {userType === 'individual' ? <IndividualForm /> : <CompanyForm />}
      </Box>
    </Container>
  );
}
ChangeUserInfo.Layout = AuthenticatedLayout;
ChangeUserInfo.auth = true;
