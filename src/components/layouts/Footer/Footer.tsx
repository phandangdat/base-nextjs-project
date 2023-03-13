import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Grid, Link as LinkMui, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Link from 'next/link';
const footerInfo = [
  {
    label: '和の日について',
    href: '/',
  },
  {
    label: '活動実績',
    href: '/',
  },
  {
    label: 'お知らせ',
    href: '/',
  },
  {
    label: 'よくある質問',
    href: '/',
  },
  {
    label: '和ンバサダー企業一覧',
    href: '/',
  },
  {
    label: '運営組織',
    href: '/',
  },
  {
    label: '法人向けお問い合わせ',
    href: '/',
  },
  {
    label: 'サイトポリシー',
    href: '/',
  },
  {
    label: '利用規約',
    href: '/',
  },
  {
    label: '特定商取引法に基づく表記',
    href: '/',
  },
];
const Footer = () => (
  <Box sx={{ bgcolor: '#E8E2D0', minHeight: '200px', position: 'sticky', top: '100%', left: '0%' }}>
    <Container sx={{ display: 'flex', mt: '100px', mb: '40px' }}>
      <Grid container spacing={2}>
        <Grid item>
          <Link href='/' legacyBehavior>
            <LinkMui>
              <Typography variant='h3'>和の日</Typography>
            </LinkMui>
          </Link>
        </Grid>
        <Grid item gap={4} container>
          <Grid item>
            <Link href='/' legacyBehavior>
              <LinkMui>和ンバサダー登録</LinkMui>
            </Link>
          </Grid>
          <Grid item>
            <Link href='/' legacyBehavior>
              <LinkMui>寄付する</LinkMui>
            </Link>
          </Grid>
          <Grid item>
            <Link href='/' legacyBehavior>
              <LinkMui>イベントをさがす</LinkMui>
            </Link>
          </Grid>
        </Grid>
        <Grid item container alignItems='center'>
          <Box sx={{ borderTop: '1px solid grey', width: '100%' }}></Box>
        </Grid>
        <Grid item columnSpacing={4} rowSpacing={2} container xs={8}>
          {footerInfo.map((item, index) => (
            <Grid item key={index}>
              <Link href={item.href} legacyBehavior>
                <LinkMui>{item.label}</LinkMui>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid item container justifyContent='flex-end' gap={2}>
          <Link href='/' legacyBehavior>
            <LinkMui>
              <InstagramIcon />
            </LinkMui>
          </Link>
          <Link href='/' legacyBehavior>
            <LinkMui>
              <FacebookRoundedIcon />
            </LinkMui>
          </Link>
        </Grid>
        <Grid item container justifyContent='center'>
          <Typography>©wanohi</Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
