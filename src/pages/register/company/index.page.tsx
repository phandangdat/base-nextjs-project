import { registerApi } from '@/Api';
import { BaseButton, BaseInput, Loading } from '@/components/common';
import { IRegisterCompany } from '@/models';
import { registerAccountCompany } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import List from '@mui/material/List';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function RegisterCompany() {
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<IRegisterCompany>({
    defaultValues: {
      companyName: '',
      companyNameFurigana: '',
      departmentName: '',
      departmentNameFurigana: '',
      firstName: '',
      lastName: '',
      firstNameFurigana: '',
      lastNameFurigana: '',
      email: '',
      password: '',
      confirmPassword: '',
      homeUrl: '',
      phoneNumber: '',
      postCode: '',
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
    },
    resolver: yupResolver(registerAccountCompany),
    mode: 'onChange',
  });
  const [idAddress, setIdAddress] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation(registerApi.register, {
    onSuccess: () => {
      reset();
      setLoading(false);
      toast.success('You registered successfully!, Please check your mail to confirm your registration');
    },
    onError: () => {
      setLoading(false);
      toast.error('You registered failed');
    },
  });
  const onSubmit = async (data: IRegisterCompany) => {
    setLoading(true);
    mutate({
      type: 'company',
      company_name: data.companyName,
      company_name_kanka: data.companyNameFurigana,
      department_name: data.departmentName,
      department_name_kanka: data.departmentNameFurigana,
      first_name: data.firstName,
      last_name: data.lastName,
      first_name_kanka: data.firstNameFurigana,
      last_name_kanka: data.lastNameFurigana,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      home_url: data.homeUrl,
      mobile_phone: data.phoneNumber,
      post_office_id: idAddress,
      address_default: data.address1,
      address: data.address2,
    });
  };

  const handlePreventSubmit = async (e: any) => {
    if (e.key == 'Enter') e.preventDefault();
  };

  const handleFillAddress = async (e: any) => {
    if (e.key == 'Enter' && e.target.value !== '') {
      registerApi
        .getPostOffice(e.target.value)
        .then((data) => {
          setValue('prefecture', data.data.prefecture_kanka);
          setValue('city', data.data.city_kanka);
          setIdAddress(data.data.id);
        })
        .catch(() => {
          setError('postCode', { type: 'manual', message: 'Postcode wrong or invalid' });
        });
    }
    setIdAddress(undefined);
  };
  return (
    <>
      {loading ? <Loading /> : <></>}
      <Container maxWidth='md' sx={{ my: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => handlePreventSubmit(e)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <th>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Company infomation</p>
                  </th>
                  <TableCell sx={{ width: '85%', padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        background: '#eee',
                        borderRadius: '5px 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Company name
                      </Typography>
                      <BaseInput
                        name='companyName'
                        control={control}
                        fullWidth
                        sx={{ mb: 2 }}
                        id='companyName'
                        size='small'
                      />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Company name (furigana)
                      </Typography>
                      <BaseInput
                        name='companyNameFurigana'
                        control={control}
                        fullWidth
                        id='companyNameFurigana'
                        size='small'
                        sx={{ mb: 2 }}
                      />
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '0 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Department name
                      </Typography>
                      <BaseInput
                        name='departmentName'
                        control={control}
                        fullWidth
                        sx={{ mb: 2 }}
                        id='departmentName'
                        size='small'
                      />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Department name (Furigana)
                      </Typography>
                      <BaseInput
                        name='departmentNameFurigana'
                        control={control}
                        fullWidth
                        sx={{ mb: 2 }}
                        id='departmentNameFurigana'
                        size='small'
                      />
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        background: '#eee',
                        borderRadius: '0 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        ご担当者名
                      </Typography>
                      <Box sx={{ mt: '3px', mb: 2 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            姓
                          </Typography>
                          <BaseInput
                            name='firstName'
                            control={control}
                            sx={{ marginRight: '10px' }}
                            id='firstName'
                            size='small'
                          />
                        </Box>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            名
                          </Typography>
                          <BaseInput name='lastName' control={control} id='lastName' size='small' />
                        </Box>
                      </Box>
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        ご担当者名フリガナ
                      </Typography>
                      <Box sx={{ mt: '3px', mb: 2 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            セイ
                          </Typography>
                          <BaseInput
                            name='firstNameFurigana'
                            control={control}
                            sx={{ marginRight: '10px' }}
                            id='firstNameFurigana'
                            size='small'
                          />
                        </Box>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            メイ
                          </Typography>
                          <BaseInput name='lastNameFurigana' control={control} id='lastNameFurigana' size='small' />
                        </Box>
                      </Box>
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        borderRadius: '0 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Box sx={{ mt: '3px', mb: 2 }}>
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          メールアドレス
                        </Typography>
                        <BaseInput name='email' control={control} fullWidth id='email' size='small' />
                      </Box>
                      <Box sx={{ mt: '3px', mb: 2 }}>
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          Password
                        </Typography>
                        <BaseInput
                          name='password'
                          control={control}
                          type='password'
                          autoComplete='new-password'
                          fullWidth
                          id='password'
                          size='small'
                        />
                      </Box>
                      <Box sx={{ mt: '3px', mb: 2 }}>
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          Password (confirm)
                        </Typography>
                        <BaseInput
                          name='confirmPassword'
                          control={control}
                          type='password'
                          autoComplete='new-password'
                          fullWidth
                          id='confirmPassword'
                          size='small'
                        />
                      </Box>
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '0 5px 5px 5px',
                        padding: '8px 16px',
                        background: '#eee',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        御社ホームページのURL
                      </Typography>
                      <BaseInput name='homeUrl' control={control} fullWidth id='homeUrl' size='small' />
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <th>
                    <LocalPhoneIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Tel</p>
                  </th>
                  <TableCell sx={{ padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        borderRadius: '5px',
                        padding: '8px 16px',
                        background: '#eee',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        電話番号
                      </Typography>
                      <BaseInput name='phoneNumber' control={control} fullWidth id='phoneNumber' size='small' />
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <th>
                    <HomeIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Address</p>
                  </th>
                  <TableCell sx={{ padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '5px 5px 5px 0',
                        padding: '8px 16px',
                        background: '#eee',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        郵便番号 ※ハイフォン不要
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <BaseInput
                          name='postCode'
                          control={control}
                          id='postCode'
                          size='small'
                          sx={{ mr: 2 }}
                          onKeyDown={(e) => handleFillAddress(e)}
                        />
                        <Link
                          href='https://www.post.japanpost.jp/zipcode/index.html'
                          target='_blank'
                          sx={{ display: 'flex', alignItems: 'center' }}
                          rel='noreferrer'
                        >
                          <ContentCopyIcon />
                          郵便番号がわからない方はこちら
                        </Link>
                      </Box>
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '0 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        都道府県
                      </Typography>
                      <BaseInput name='prefecture' control={control} id='prefecture' size='small' sx={{ mb: 2 }} />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        市町村名
                      </Typography>
                      <BaseInput name='city' control={control} id='city' size='small' sx={{ mb: 2 }} />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        番地
                      </Typography>
                      <BaseInput name='address1' control={control} id='address1' size='small' sx={{ mb: 2 }} />
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '0 5px 5px 5px',
                        padding: '8px 16px',
                        background: '#eee',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        建物名・号室等
                      </Typography>
                      <BaseInput name='address2' control={control} id='address2' size='small' />
                    </List>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ textAlign: 'center' }}>
            <BaseButton type='submit' sx={{ mt: 2 }}>
              Register
            </BaseButton>
          </Box>
        </form>
      </Container>
    </>
  );
}
