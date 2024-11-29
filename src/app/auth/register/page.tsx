'use client';

import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ICustomField } from '@/types';
import { AuthType, IRegister } from '@/types/auth';
import styles from '@/app/auth/login/page.module.css';
import AuthComponent from '@/components/auth/AuthComponent';
import { apiRegister } from '@/services/auth';
import { setAuthState } from '@/redux/slices/authSlice';

const RegisterPage = () => {
  const [messageError, setMessageError] = useState<string>('');
  const dispatch = useDispatch();
  const { push } = useRouter();

  const initialFieldsRegister = useMemo(
    (): ICustomField<IRegister>[] => [
      {
        field: 'username',
        // label: 'Tài khoản',
        placeholder: 'Tài khoản',
        messageError: messageError,
        rules: [{ required: true, message: 'Hãy nhập tài khoản của bạn!' }],
      },
      {
        field: 'password',
        // label: 'Mật khẩu',
        placeholder: 'Mật khẩu',
        rules: [{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }],
      },
      {
        field: 'passwordConfirm',
        // label: 'Nhập lại mật khẩu',
        placeholder: 'Nhập lại mật khẩu',
        rules: [{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }],
      },
    ],
    [messageError],
  );

  const handleRegister = async (payload: IRegister) => {
    const response = await apiRegister(payload);
    if (response?.status === 200) {
      dispatch(setAuthState(response.data.data));
      push('/auth/login');
    } else {
      setMessageError(response?.data);
    }
  };

  return (
    <div className="container-fluid">
      <div className={styles.loginForm}>
        <div className="mb-5-p text-center">Đăng nhập</div>
        <AuthComponent
          authType={AuthType.REGISTER}
          fields={initialFieldsRegister}
          onSubmit={handleRegister}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
