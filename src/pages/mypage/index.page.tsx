import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Typography } from '@mui/material';
import { useState } from 'react';

export default function Mypage() {
  const [html, setHTML] = useState({ __html: '' });

  // useEffect(() => {
  //   async function createMarkup() {
  //     const response = await axios.get('https://2e84-14-247-113-211.ap.ngrok.io/api/user-client/posts/2');
  //     const contentHtml = await JSON.parse(response.data.data.content);
  //     console.log(contentHtml.en);

  //     return { __html: contentHtml.en };
  //   }

  //   createMarkup().then((result) => setHTML(result));
  // }, []);

  return (
    // <div dangerouslySetInnerHTML={html} />
    <Typography sx={{ fontFamily: 'Trajan Sans Pro' }}>abc</Typography>
  );
}
Mypage.Layout = AuthenticatedLayout;
Mypage.auth = true;
