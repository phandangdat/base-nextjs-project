import { contactApi } from '@/Api';
import { BaseButton, BaseInput } from '@/components/common';
import { IContact } from '@/models';
import { createContact } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

export default function Contact() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      content: '',
    },
    resolver: yupResolver(createContact),
  });
  const router = useRouter();

  const { mutate } = useMutation(contactApi.postContact, {
    onSuccess: () => {
      router.push('/contact/complete');
    },
  });

  const onSubmit = (data: IContact) => {
    mutate(data);
  };
  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h4' sx={{ mb: 3 }}>
          お問い合わせ
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, minHeight: '70px' }}>
            <Typography component='p' variant='h6' sx={{ flex: '1' }}>
              名前
            </Typography>
            <BaseInput name='name' control={control} id='name' fullWidth size='small' sx={{ flex: '2' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, minHeight: '70px' }}>
            <Typography component='p' variant='h6' sx={{ flex: '1' }}>
              メールアドレス
            </Typography>
            <BaseInput name='email' control={control} fullWidth size='small' sx={{ flex: '2' }} id='email' />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, minHeight: '70px' }}>
            <Typography component='p' variant='h6' sx={{ flex: '1' }}>
              電話番号
            </Typography>
            <BaseInput name='phone' control={control} fullWidth size='small' sx={{ flex: '2' }} id='phone' />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 1,
              minHeight: '175px',
              '& > .MuiBox-root > textarea:focus-visible': { outline: '#d32f2f' },
            }}
          >
            <Typography component='p' variant='h6' sx={{ flex: '1' }}>
              内容
            </Typography>
            <Box sx={{ flex: 2 }}>
              <Controller
                name='content'
                control={control}
                render={({ field }) => (
                  <textarea
                    id='content'
                    {...field}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '150px',
                      borderRadius: '1px',
                      borderColor: errors.content ? '#d32f2f' : '',
                    }}
                  />
                )}
              />
              <Typography
                className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-wg2jmr-MuiFormHelperText-root'
                id='phone-helper-text'
              >
                {errors.content?.message}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <BaseButton
              type='submit'
              variant='contained'
              sx={{
                background: '#09f',
              }}
            >
              Send
            </BaseButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
