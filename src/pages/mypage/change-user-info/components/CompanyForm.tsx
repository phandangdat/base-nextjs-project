import { accountApi, registerApi } from '@/Api';
import { BaseButton, BaseInput } from '@/components/common';
import { IChangeInfoUserCompany } from '@/models';
import { changeUserInfoCompany } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const CompanyForm = () => {
  const router = useRouter();
  const [idAddress, setIdAddress] = useState(undefined);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: '',
      companyNameFurigana: '',
      departmentName: '',
      departmentNameFurigana: '',
      firstName: '',
      lastName: '',
      firstNameFurigana: '',
      lastNameFurigana: '',
      postCode: '',
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
      phoneNumber: '',
    },
    mode: 'onChange',
    resolver: yupResolver(changeUserInfoCompany),
  });

  const getUserInfo = async () => await accountApi.getInfoUser();
  const { data } = useQuery(['user-info-company'], getUserInfo, {
    onSuccess: (data) => {
      setValue('companyName', data.data.company_name || '');
      setValue('companyNameFurigana', data.data.company_name_kanka || '');
      setValue('departmentName', data.data.department_name || '');
      setValue('departmentNameFurigana', data.data.department_name_kanka || '');
      setValue('firstName', data.data.first_name || '');
      setValue('lastName', data.data.last_name || '');
      setValue('firstNameFurigana', data.data.first_name_kanka || '');
      setValue('lastNameFurigana', data.data.last_name_kanka || '');
      setValue('postCode', data?.data.post_office?.code || '');
      setValue('prefecture', data.data.post_office?.prefecture_kanka || '');
      setValue('city', data.data.post_office?.city_kanka || '');
      setValue('address1', data.data.address_default || '');
      setValue('address2', data.data.address || '');
      setValue('phoneNumber', data.data.mobile_phone || '');
      setIdAddress(data.data.post_office?.id);
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
    setIdAddress(undefined);
  };

  const { mutate } = useMutation(accountApi.postChangeUserInfo, {
    onSuccess: () => {
      router.push('/mypage');
    },
  });
  const onSubmit = (data: IChangeInfoUserCompany) => {
    mutate({
      company_name: data.companyName,
      company_name_kanka: data.companyNameFurigana,
      department_name: data.departmentName,
      department_name_kanka: data.departmentNameFurigana,
      first_name: data.firstName,
      last_name: data.lastName,
      first_name_kanka: data.firstNameFurigana,
      last_name_kanka: data.lastNameFurigana,
      post_office_id: idAddress,
      address_default: data.address1,
      address: data.address2,
      mobile_phone: data.phoneNumber,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => handlePreventSubmit(e)}>
      <Grid container>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            Company name
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <BaseInput
            name='companyName'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            id='companyName'
            size='small'
            error={errors.companyName ? true : false}
            helperText={errors.companyName?.message}
          />
          <BaseInput
            name='companyNameFurigana'
            control={control}
            margin='normal'
            id='companyNameFurigana'
            size='small'
            error={errors.companyNameFurigana ? true : false}
            helperText={errors.companyNameFurigana?.message}
          />
        </Grid>
        <Grid item xs={2} container alignItems='center'>
          <Typography component='p' variant='h6'>
            Department name
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <BaseInput
            name='departmentName'
            control={control}
            sx={{ mr: 1, ml: 1 }}
            margin='normal'
            id='departmentName'
            size='small'
            error={errors.departmentName ? true : false}
            helperText={errors.departmentName?.message}
          />
          <BaseInput
            name='departmentNameFurigana'
            control={control}
            margin='normal'
            id='departmentNameFurigana'
            size='small'
            error={errors.departmentNameFurigana ? true : false}
            helperText={errors.departmentNameFurigana?.message}
          />
        </Grid>
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
            id='phoneNumber'
            size='small'
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber?.message}
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
      </Grid>
      <Box sx={{ textAlign: 'center' }}>
        <BaseButton type='submit' sx={{ mt: 2, width: '50%' }}>
          Change
        </BaseButton>
      </Box>
    </form>
  );
};
