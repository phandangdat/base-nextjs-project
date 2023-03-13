import { loginApi, logoutApi } from '@/Api';
import { useStorage } from '@/hooks';
import { ILogin } from '@/models';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext } from 'react';
import { toast } from 'react-toastify';

interface UserContext {
  login: (user: ILogin) => void;
  logout: () => void;
}
interface UserProviderProps {
  children?: React.ReactNode;
}

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const { setItem } = useStorage();

  const { mutate: login } = useMutation(loginApi.login, {
    onSuccess: (data) => {
      const queryRedirect = router.query.redirect;
      if (typeof queryRedirect === 'string') {
        router.push(queryRedirect);
      } else {
        router.push('/mypage');
      }
      setCookie({}, 'userToken', data.data.token, {
        path: '/',
      });
      setItem('userInfo', JSON.stringify(data.data));
    },
    onError: () => {
      toast.error('Incorrect email or password');
    },
  });
  const handleLogin = (data: ILogin) => {
    login(data);
  };

  const { mutate: logout } = useMutation(logoutApi.logout, {
    onSuccess: () => {
      destroyCookie({}, 'userToken', {
        path: '/',
      });
      router.push('/');
    },
  });
  const handleLogout = () => {
    logout();
  };
  return (
    <UserContext.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
