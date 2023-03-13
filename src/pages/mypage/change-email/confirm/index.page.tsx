import { accountApi } from '@/Api';
import { BaseButton, BaseInput } from '@/components/common';
import { IChangeEmailConfirm } from '@/models';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function ChangeEmailConfirm() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const router = useRouter();

  const { mutate } = useMutation(accountApi.putConfirmChangeEmail, {
    onSuccess: () => {
      router.push('/mypage/change-email/complete');
    },
  });

  const onSubmit = (data: IChangeEmailConfirm) => {
    const convertDate = {
      email: router.query.email as string,
      code: data.code,
    };
    mutate(convertDate);
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography component='h1' variant='h5'>
            メールアドレス認証
          </Typography>
          <Typography component='p' sx={{ mt: 1 }}>
            お客様のメールアドレスに通知を送信しました
          </Typography>
          <Typography component='p' sx={{ mt: 1 }}>
            本文内6桁の「認証コード」をご入力ください
          </Typography>
          <BaseInput name='code' control={control} margin='normal' label='Code' fullWidth id='code' />
          <Typography component='p' sx={{ mt: 1 }}>
            数分以内に通知が届かない場合、メールアドレスを間違えている可能性がございます
          </Typography>
          <Typography component='p' sx={{ mt: 1 }}>
            お手数ですがはじめからお試しください
          </Typography>
          <BaseButton type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Confirm
          </BaseButton>
        </form>
      </Box>
    </Container>
  );
}
