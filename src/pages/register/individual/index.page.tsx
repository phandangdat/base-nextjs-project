import { registerApi } from '@/Api';
import { BaseButton, BaseInput, BaseRadioGroup, BaseSwitch, Loading } from '@/components/common';
import { IRegisterIndividual } from '@/models';
import { registerAccountIndividual } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  FormControl,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultFormValue = {
  email: '',
  emailConfirmed: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  firstNameFurigana: '',
  lastNameFurigana: '',
  gender: '',
  birthday: '',
  postCode: '',
  prefecture: '',
  city: '',
  address1: '',
  address2: '',
  phoneNumber: {
    homeTel: '',
    mobileTel: '',
  },
  priority: '',
  notiVolunteer: false,
  notiEvent: false,
};

export default function RegisterIndividual() {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValue,
    resolver: yupResolver(registerAccountIndividual),
    mode: 'onChange',
  });
  const [idAddress, setIdAddress] = useState();
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
  const onSubmit = async (data: IRegisterIndividual) => {
    setLoading(true);
    mutate({
      type: 'individual',
      email: data.email,
      email_confirmation: data.emailConfirmed,
      password: data.password,
      password_confirmation: data.confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      first_name_kanka: data.firstNameFurigana,
      last_name_kanka: data.lastNameFurigana,
      gender: data.gender || 'secret',
      date_of_birth: dayjs(data.birthday).format('YYYY-MM-DD'),
      post_office_id: idAddress,
      address_default: data.address1,
      address: data.address2,
      home_phone: data.phoneNumber.homeTel,
      mobile_phone: data.phoneNumber.mobileTel,
      priority_phone: data.priority,
      notification_volunteer: data.notiVolunteer,
      notification_event: data.notiEvent,
    });
  };

  const handlePreventSubmit = async (e: any) => {
    if (e.key == 'Enter') e.preventDefault();
  };

  const handleFillAddress = async (e: any) => {
    if (e.key == 'Enter') {
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
  };
  return (
    <>
      {loading ? <Loading /> : <></>}
      <Container maxWidth='md' sx={{ mt: 2, mb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => handlePreventSubmit(e)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <th>
                    <EmailIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Email</p>
                  </th>
                  <TableCell sx={{ width: '85%', padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        borderRadius: '5px',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Email
                      </Typography>
                      <BaseInput
                        name='email'
                        control={control}
                        fullWidth
                        id='email'
                        size='small'
                        sx={{ mb: 2 }}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                      />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Email (confirm)
                      </Typography>
                      <BaseInput
                        name='emailConfirmed'
                        control={control}
                        fullWidth
                        id='emailConfirmed'
                        size='small'
                        error={errors.emailConfirmed ? true : false}
                        helperText={errors.emailConfirmed?.message}
                      />
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <th>
                    <VpnKeyIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Password</p>
                  </th>
                  <TableCell sx={{ padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        borderRadius: '5px',
                        padding: '8px 16px',
                      }}
                    >
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
                        sx={{ mb: 2 }}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                      />
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
                        error={errors.confirmPassword ? true : false}
                        helperText={errors.confirmPassword?.message}
                      />
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <th>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>
                      User
                      <br /> infomation
                    </p>
                  </th>
                  <TableCell sx={{ padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        background: '#eee',
                        borderRadius: '5px 5px 0 0',
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
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName?.message}
                          />
                        </Box>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            名
                          </Typography>
                          <BaseInput
                            name='lastName'
                            control={control}
                            id='lastName'
                            size='small'
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName?.message}
                          />
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
                            id='outlined-size-small-7'
                            size='small'
                            error={errors.firstNameFurigana ? true : false}
                            helperText={errors.firstNameFurigana?.message}
                          />
                        </Box>
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <Typography component='span' sx={{ mr: '5px' }}>
                            メイ
                          </Typography>
                          <BaseInput
                            name='lastNameFurigana'
                            control={control}
                            id='lastNameFurigana'
                            size='small'
                            error={errors.lastNameFurigana ? true : false}
                            helperText={errors.lastNameFurigana?.message}
                          />
                        </Box>
                      </Box>
                    </List>
                    <List
                      sx={{
                        borderLeft: '8px solid #09f',
                        background: '#eee',
                        padding: '8px 16px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          性別
                        </Typography>
                        <BaseRadioGroup
                          name='gender'
                          control={control}
                          row
                          sx={{ flexDirection: 'row', ml: 2 }}
                          choices={[
                            { label: '女性', value: 'female' },
                            { label: '男性', value: 'male' },
                          ]}
                        />
                      </FormControl>
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid red',
                        background: '#eee',
                        borderRadius: '0 0 5px 5px',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        生年月日
                      </Typography>
                      <BaseInput
                        name='birthday'
                        control={control}
                        id='date'
                        type='date'
                        size='small'
                        sx={{ width: 220 }}
                        error={errors.birthday ? true : false}
                        helperText={errors.birthday?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
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
                        borderLeft: '8px solid red',
                        borderRadius: '5px 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        郵便番号 ※ハイフォン不要
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          margin: '8px 0',
                        }}
                      >
                        <BaseInput
                          name='postCode'
                          control={control}
                          id='postCode'
                          size='small'
                          sx={{ mr: 2 }}
                          onKeyDown={(e) => handleFillAddress(e)}
                          error={errors.postCode ? true : false}
                          helperText={errors.postCode?.message}
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
                        borderLeft: '8px solid red',
                        borderRadius: '0 5px 5px 0',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        都道府県
                      </Typography>
                      <BaseInput
                        name='prefecture'
                        control={control}
                        id='prefecture'
                        size='small'
                        sx={{ mb: 2 }}
                        error={errors.prefecture ? true : false}
                        helperText={errors.prefecture?.message}
                      />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        市町村名
                      </Typography>
                      <BaseInput
                        name='city'
                        control={control}
                        id='city'
                        size='small'
                        sx={{ mb: 2 }}
                        error={errors.city ? true : false}
                        helperText={errors.city?.message}
                      />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        番地
                      </Typography>
                      <BaseInput
                        name='address1'
                        control={control}
                        id='outlined-size-small-12'
                        size='small'
                        sx={{ mb: 2 }}
                        error={errors.address1 ? true : false}
                        helperText={errors.address1?.message}
                      />
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '0 5px 5px 5px',
                        padding: '8px 16px',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        建物名・号室等
                      </Typography>
                      <BaseInput
                        name='address2'
                        control={control}
                        id='address2'
                        size='small'
                        error={errors.address2 ? true : false}
                        helperText={errors.address2?.message}
                      />
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
                        flexDirection: 'row',
                        borderLeft: '8px solid red',
                        borderRadius: '5px',
                        padding: '8px 16px',
                        background: '#eee',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          Home Tel
                        </Typography>
                        <Controller
                          name='phoneNumber.homeTel'
                          control={control}
                          render={({ field: { ref, ...props } }) => (
                            <TextField
                              fullWidth
                              id='homeTel'
                              size='small'
                              sx={{ mb: 2 }}
                              error={errors.phoneNumber?.homeTel || errors.phoneNumber ? true : false}
                              helperText={errors.phoneNumber?.homeTel?.message || errors.phoneNumber?.message}
                              {...props}
                            />
                          )}
                        />
                        <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                          電話番号
                        </Typography>
                        <Controller
                          name='phoneNumber.mobileTel'
                          control={control}
                          render={({ field: { ref, ...props } }) => (
                            <TextField
                              fullWidth
                              id='mobileTel'
                              size='small'
                              error={errors.phoneNumber?.mobileTel || errors.phoneNumber ? true : false}
                              helperText={errors.phoneNumber?.mobileTel?.message || errors.phoneNumber?.message}
                              {...props}
                            />
                          )}
                        />
                      </Box>
                      {watch('phoneNumber.homeTel') ? (
                        <FormControl sx={{ flexDirection: 'column', alignItems: 'center' }}>
                          <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                            Priority
                          </Typography>
                          <BaseRadioGroup
                            name='priority'
                            control={control}
                            row
                            sx={{
                              flexDirection: 'column',
                              '& > .MuiFormControlLabel-root:nth-of-type(1)': {
                                mb: 4,
                              },
                            }}
                            choices={[
                              { label: '', value: 'home_phone' },
                              { label: '', value: 'mobile_phone' },
                            ]}
                          />
                        </FormControl>
                      ) : (
                        <></>
                      )}
                    </List>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <th>
                    <EmailIcon sx={{ fontSize: '50px' }} />
                    <p style={{ margin: '0' }}>Email infomation</p>
                  </th>
                  <TableCell sx={{ padding: '16px 16px 16px 0' }}>
                    <List
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '8px solid #09f',
                        borderRadius: '5px',
                        padding: '8px 16px',
                        background: '#eee',
                      }}
                    >
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Nhận thông báo liên quan đến thiện nguyện
                      </Typography>
                      <BaseSwitch name='notiVolunteer' control={control} sx={{ mb: 2 }} />
                      <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                        Nhận thông báo liên quan đến event
                      </Typography>
                      <BaseSwitch name='notiEvent' control={control} />
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
