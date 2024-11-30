'use client';

import AuthComponent from '@/components/auth/AuthComponent';
import { apiLogin } from '@/services/auth';
import { AuthType, ILogin } from '@/types/auth';
import { setAuthState } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useMemo, useState } from 'react';
import { ICustomField } from '@/types';

const LoginPage = () => {
  const [messageError, setMessageError] = useState<string>('');

  const dispatch = useDispatch();
  const { push } = useRouter();

  const initialFieldsLogin = useMemo(
    (): ICustomField<ILogin>[] => [
      {
        field: 'username',
        placeholder: 'Tài khoản',
        messageError: messageError,
        rules: [{ required: true, message: 'Hãy nhập tài khoản của bạn!' }],
      },
      {
        field: 'password',
        placeholder: 'Mật khẩu',
        rules: [{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }],
      },
    ],
    [messageError],
  );

  const handleLogin = async (payload: ILogin) => {
    const response = await apiLogin(payload);
    if (response?.status === 200) {
      dispatch(setAuthState(response.data.data));
      push('/management/customer');
    } else {
      setMessageError(response?.data);
    }
  };

  return (
    <div className="container-fluid">
      <div className={styles.loginForm}>
        <div className={`${styles.title} mb-5-p text-center`}>Đăng nhập</div>
        <AuthComponent
          authType={AuthType.LOGIN}
          onClickLink={() => push('/auth/register')}
          onChange={() => setMessageError('')}
          fields={initialFieldsLogin}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
