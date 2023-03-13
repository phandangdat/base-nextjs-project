import { Loading } from '@/components/common';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

const useAuthPage: React.FC<{ children: React.ReactElement; auth: boolean }> = ({ children, auth }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cookies = parseCookies();

  useEffect(() => {
    // If not authenticated, force log in
    if (!cookies.userToken) router.push(`/login?redirect=${window?.location?.pathname}`);
    setLoading(true);
  }, [cookies.userToken, auth, router]);

  // If authenticated load content for user
  if (cookies.userToken && loading) {
    return children;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />;
};

export default useAuthPage;
