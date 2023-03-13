import { accountApi, registerApi } from '@/Api';
import { BaseButton, BaseInput, BaseRadioGroup } from '@/components/common';
import { IChangeInfoIndividual } from '@/models';
import { changeUserInfoIndividual } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const IndividualForm = () => {
  const router = useRouter();
  const [idAddress, setIdAddress] = useState('');
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      firstNameFurigana: '',
      lastNameFurigana: '',
      gender: 'secret',
      birthday: '',
      postCode: '',
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
      phoneNumber: '',
      homeTel: '',
      priorityPhone: '',
    },
    mode: 'onChange',
    resolver: yupResolver(changeUserInfoIndividual),
  });

  const getUserInfo = async () => await accountApi.getInfoUser();
  const { data } = useQuery(['user-info-individual'], getUserInfo, {
    onSuccess: (data) => {
      setValue('firstName', data.data.first_name || '');
      setValue('lastName', data.data.last_name || '');
      setValue('firstNameFurigana', data.data.first_name_kanka || '');
      setValue('lastNameFurigana', data.data.last_name_kanka || '');
      setValue('gender', data.data.gender || '');
      setValue('birthday', dayjs(data.data.date_of_birth).format('YYYY-MM-DD') || '');
      setValue('postCode', data.data.post_office.code || '');
      setValue('prefecture', data.data.post_office.prefecture_kanka || '');
      setValue('city', data.data.post_office.city_kanka || '');
      setValue('address1', data.data.address_default || '');
      setValue('address2', data.data.address || '');
      setValue('phoneNumber', data.data.mobile_phone || '');
      setValue('homeTel', data.data.home_phone || '');
      setValue('priorityPhone', data.data.priority_phone || '');
      setIdAddress(data.data.post_office.id);
    },
    refetchOnWindowFocus: false,
  });

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
          toast.error('Postcode wrong or invalid');
        });
    }
  };

  const { mutate } = useMutation(accountApi.postChangeUserInfo, {
    onSuccess: () => {
      router.push('/mypage');
    },
  });
  const onSubmit = (data: IChangeInfoIndividual) => {
    mutate({
      first_name: data.firstName,
      last_name: data.lastName,
      first_name_kanka: data.firstNameFurigana,
      last_name_kanka: data.lastNameFurigana,
      gender: data.gender,
      date_of_birth: data.birthday,
      post_office_id: idAddress,
      address_default: data.address1,
      address: data.address2,
      mobile_phone: data.phoneNumber,
      home_phone: data.homeTel,
      priority_phone: 'mobile_phone',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => handlePreventSubmit(e)}>
      <Grid container>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            お名前
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='span' variant='subtitle1'>
            姓
          </Typography>
          <BaseInput
            name='firstName'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            id='firstName'
            size='small'
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='span' variant='subtitle1'>
            名
          </Typography>
          <BaseInput
            name='lastName'
            control={control}
            margin='normal'
            id='lastName'
            size='small'
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            フリガナ
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='span' variant='subtitle1'>
            セイ
          </Typography>
          <BaseInput
            name='firstNameFurigana'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            id='firstNameFurigana'
            size='small'
            error={errors.firstNameFurigana ? true : false}
            helperText={errors.firstNameFurigana?.message}
          />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='span' variant='subtitle1'>
            メイ
          </Typography>
          <BaseInput
            name='lastNameFurigana'
            control={control}
            margin='normal'
            id='lastNameFurigana'
            size='small'
            error={errors.lastNameFurigana ? true : false}
            helperText={errors.lastNameFurigana?.message}
          />
        </Grid>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            性別
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <BaseRadioGroup
            name='gender'
            control={control}
            row
            sx={{ flexDirection: 'row', ml: 2 }}
            choices={[
              { label: '男性', value: 'male' },
              { label: '女性', value: 'female' },
            ]}
          />
        </Grid>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            生年月日
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <BaseInput
            name='birthday'
            control={control}
            id='date'
            type='date'
            margin='normal'
            sx={{ width: 220, mr: 1, ml: 1 }}
            size='small'
            error={errors.birthday ? true : false}
            helperText={errors.birthday?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2} container sx={{ mt: 2 }}>
          <Typography component='p' variant='h6'>
            住所
          </Typography>
        </Grid>
        <Grid item xs={10} container alignItems='center'>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' variant='subtitle1'>
              郵便番号
            </Typography>
            <BaseInput
              name='postCode'
              control={control}
              sx={{ mr: 1, ml: 1, width: 220 }}
              margin='normal'
              id='postCode'
              size='small'
              onKeyDown={(e) => handleFillAddress(e)}
              error={errors.postCode ? true : false}
              helperText={errors.postCode?.message}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' variant='subtitle1'>
              都道府県
            </Typography>
            <BaseInput
              name='prefecture'
              control={control}
              sx={{ mr: 1, ml: 1 }}
              margin='normal'
              id='prefecture'
              size='small'
              error={errors.prefecture ? true : false}
              helperText={errors.prefecture?.message}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' variant='subtitle1'>
              市区町村名
            </Typography>
            <BaseInput
              name='city'
              control={control}
              sx={{ mr: 1, ml: 1 }}
              margin='normal'
              id='city'
              size='small'
              error={errors.city ? true : false}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' variant='subtitle1'>
              番地
            </Typography>
            <BaseInput
              name='address1'
              control={control}
              sx={{ mr: 1, ml: 1 }}
              margin='normal'
              id='address1'
              size='small'
              error={errors.address1 ? true : false}
              helperText={errors.address1?.message}
            />
          </Grid>
          <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' variant='subtitle1'>
              建物名・号室等
            </Typography>
            <BaseInput
              name='address2'
              control={control}
              sx={{ mr: 1, ml: 1 }}
              margin='normal'
              id='address2'
              size='small'
              error={errors.address2 ? true : false}
              helperText={errors.address2?.message}
            />
          </Grid>
        </Grid>
        <Grid item xs={2} container sx={{ mt: 2 }}>
          <Typography component='p' variant='h6'>
            電話番号
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <BaseInput
            name='phoneNumber'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            label='Phone number'
            id='phoneNumber'
            size='small'
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber?.message}
          />
          <BaseInput
            name='homeTel'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            label='Home tel'
            id='homeTel'
            size='small'
            error={errors.homeTel ? true : false}
            helperText={errors.homeTel?.message}
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center' }}>
        <BaseButton type='submit' sx={{ mt: 2, width: '50%' }}>
          Change
        </BaseButton>
      </Box>
    </form>
  );
};
