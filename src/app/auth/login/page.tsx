'use client';

import LoginComponent from '@/components/auth/login/LoginComponent';
import { apiLogin } from '@/services/auth';
import { ILogin } from '@/types/auth';
import { setAuthState } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleLogin = async (payload: ILogin) => {
    const response = await apiLogin(payload);
    if (response?.status === 200) {
      dispatch(setAuthState(response.data.data));
      push('/management/customer');
    }
  };

  return (
    <div className="container-fluid">
      <div className={styles.loginForm}>
        <div className="mb-5-p text-center">Login Form</div>
        <LoginComponent onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
