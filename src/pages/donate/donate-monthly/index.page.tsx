import { registerApi } from '@/Api';
import { BaseButton, BaseInput, BaseRadioGroup, BaseSelect } from '@/components/common';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import {
  FormControl,
  Link as LinkMui,
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';
export default function DonateMonthly() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      moneyDonate: '2000',
      inputMoneyDonate: '',
      methodDonate: '',
      emailLogin: '',
      passwordLogin: '',
      name: '',
      nameFurinaga: '',
      gender: '',
      birthday: '',
      postCode: '',
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
      phoneNumber: '',
      email: '',
      emailConfirmed: '',
    },
    mode: 'onChange',
  });
  const [idAddress, setIdAddress] = useState();
  const [isLogged, setIsLogged] = useState('');
  const cookies = parseCookies();

  useEffect(() => {
    setIsLogged(cookies.userToken);
  }, [cookies]);
  const onSubmit = async (data: any) => {
    console.log(data);
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
    <Container maxWidth='md' sx={{ mt: 2, mb: 2 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') e.preventDefault();
        }}
      >
        <Box
          sx={{
            width: '100%',
            border: '1px solid #09f',
            borderRadius: '7px',
            '& > .MuiBox-root > .MuiBox-root': {
              p: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              mb: 2,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header header"
            "select input"`,
            }}
          >
            <Box sx={{ gridArea: 'header', borderRadius: '5px 5px 0 0', bgcolor: '#09f', color: '#fff' }}>
              <Typography component='p' variant='h6'>
                募金額をお決めください。（毎月定額の募金）
              </Typography>
            </Box>
            <Box sx={{ gridArea: 'select' }}>
              <Typography component='p' variant='subtitle1'>
                毎月定額を募金します。
              </Typography>
              <BaseSelect
                name='moneyDonate'
                control={control}
                options={[
                  { label: '2,000円', value: '2000' },
                  { label: '3,000円', value: '3000' },
                  { label: '4,000円', value: '4000' },
                  { label: '上記以外(金額指定)', value: '0' },
                ]}
              />
            </Box>
            <Box sx={{ gridArea: 'input' }}>
              <Typography component='p' variant='subtitle1'>
                左の選択肢以外
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BaseInput
                  name='inputMoneyDonate'
                  control={control}
                  fullWidth
                  sx={{ mr: 1 }}
                  id='inputMoneyDonate'
                  disabled={watch('moneyDonate') !== '0'}
                  error={errors.inputMoneyDonate ? true : false}
                  helperText={errors.inputMoneyDonate?.message}
                />
                <Typography component='span' variant='subtitle1'>
                  円
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            border: '1px solid #09f',
            borderRadius: '7px',
            mt: 2,
            '& > .MuiBox-root > .MuiBox-root': {
              p: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 2,
              mb: 2,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header"
            "main"`,
            }}
          >
            <Box sx={{ gridArea: 'header', borderRadius: '5px 5px 0 0', bgcolor: '#09f', color: '#fff' }}>
              <Typography component='p' variant='h6'>
                お支払い方法をお決めください。
              </Typography>
            </Box>
            <Box sx={{ gridArea: 'main' }}>
              <BaseRadioGroup
                name='methodDonate'
                control={control}
                row
                sx={{ flexDirection: 'column', ml: 2 }}
                choices={[
                  { label: 'クレジットカード', value: 'クレジットカード' },
                  { label: '口座振替', value: '口座振替' },
                ]}
              />
            </Box>
          </Box>
        </Box>
        {isLogged ? (
          <></>
        ) : (
          <Box
            sx={{
              width: '100%',
              border: '1px solid #09f',
              borderRadius: '7px',
              mt: 2,
              '& > .MuiBox-root > .MuiBox-root': {
                p: 1,
                fontSize: '0.875rem',
                fontWeight: '700',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: 2,
                mb: 2,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"header"
            "main"`,
              }}
            >
              <Box
                sx={{
                  gridArea: 'header',
                  borderRadius: '5px 5px 0 0',
                  bgcolor: '#09f',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component='p' variant='h6'>
                  すでにアカウントを登録済みの方
                </Typography>
                <Link
                  href='/forgot-password'
                  rel='noreferrer'
                  className={styles['link-forgot-password']}
                  legacyBehavior
                >
                  <LinkMui sx={{ alignItems: 'center', display: 'flex', justifyItems: 'center' }}>
                    <ContentCopyIcon />
                    ログインID/パスワードを忘れた方はこちら
                  </LinkMui>
                </Link>
              </Box>
              <Box sx={{ gridArea: 'main' }}>
                <Typography component='p' variant='subtitle1' sx={{ m: '0 auto 10px auto', textAlign: 'center' }}>
                  ログインするとご登録内容が自動で表示されます。
                  <Link href='#info'>ログイン無しでもお申込いただけます。</Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Typography component='p' variant='subtitle1'>
                    ログインID
                  </Typography>
                  <BaseInput
                    name='emailLogin'
                    control={control}
                    sx={{ ml: 2, width: '320px' }}
                    id='emailLogin'
                    placeholder='メールアドレスもしくは任意の文字列'
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography component='p' variant='subtitle1'>
                    パスワード
                  </Typography>
                  <BaseInput name='passwordLogin' control={control} sx={{ ml: 2, width: '320px' }} id='passwordLogin' />
                </Box>
                <BaseButton sx={{ display: 'block', m: '20px auto 0 auto', px: 3 }}>ログイン</BaseButton>
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            border: '1px solid #ff8400',
            borderRadius: '7px',
            mt: 2,
            '& > .MuiBox-root > .MuiBox-root': {
              p: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
            },
          }}
          id='info'
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: 2,
              mb: 2,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header"
            "main"`,
            }}
          >
            <Box
              sx={{
                gridArea: 'header',
                borderRadius: '5px 5px 0 0',
                bgcolor: '#ff8400',
                color: '#fff',
              }}
            >
              <Typography component='p' variant='h6'>
                初めての方・ログインしないでお申込みされる方
              </Typography>
            </Box>
            <Box sx={{ gridArea: 'main' }}>
              <TableContainer>
                <Typography component='p' variant='h6'>
                  当サイトで初めて募金を申込まれる方、またオンライン登録をされていない方は、直接以下の欄にご入力ください。
                </Typography>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableBody>
                    <TableRow>
                      <th>
                        <PersonIcon sx={{ fontSize: '50px' }} />
                        <p style={{ margin: '0' }}>
                          ご支援者様
                          <br /> 情報
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
                            お名前
                          </Typography>
                          <BaseInput
                            name='name'
                            control={control}
                            sx={{ mr: '10px', mb: 2 }}
                            id='name'
                            size='small'
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                          />
                          <Typography component='p' variant='h6' sx={{ fontSize: '1rem' }}>
                            ご担当者名フリガナ
                          </Typography>
                          <BaseInput
                            name='nameFurinaga'
                            control={control}
                            sx={{ mr: '10px', mb: 2 }}
                            id='nameFurinaga'
                            size='small'
                            error={errors.nameFurinaga ? true : false}
                            helperText={errors.nameFurinaga?.message}
                          />
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
                            borderLeft: '8px solid #09f',
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
                        <p style={{ margin: '0' }}>住所</p>
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
                              m: '8px 0',
                            }}
                          >
                            <BaseInput
                              name='postCode'
                              control={control}
                              id='postCode'
                              size='small'
                              sx={{ mr: 2 }}
                              onKeyDown={(e) => handleFillAddress(e)}
                              placeholder='例) 0000000'
                              error={errors.postCode ? true : false}
                              helperText={errors.postCode?.message}
                            />
                            <Link
                              href='https://www.post.japanpost.jp/zipcode/index.html'
                              target='_blank'
                              rel='noreferrer'
                              className={styles['link-forgot-password']}
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
                            id='address1'
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
                        <p style={{ margin: '0' }}>電話番号</p>
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
                          <BaseInput
                            name='phoneNumber'
                            control={control}
                            fullWidth
                            id='phoneNumber'
                            size='small'
                            error={errors.phoneNumber ? true : false}
                            helperText={errors.phoneNumber?.message}
                          />
                        </List>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <th>
                        <EmailIcon sx={{ fontSize: '50px' }} />
                        <p style={{ margin: '0' }}>
                          メール <br />
                          アドレス
                        </p>
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
                            Eメールアドレス
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
                            Eメールアドレス（確認）
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <BaseButton type='submit' sx={{ mt: 2 }}>
            Next
          </BaseButton>
        </Box>
      </form>
    </Container>
  );
}
