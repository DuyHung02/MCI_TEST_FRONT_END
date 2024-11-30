'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICustomField } from '@/types';
import { AuthType, IRegister } from '@/types/auth';
import styles from '@/app/auth/register/page.module.css';
import AuthComponent from '@/components/auth/AuthComponent';
import { apiRegister } from '@/services/auth';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [messageError, setMessageError] = useState<string>('');
  const { push } = useRouter();

  const initialFieldsRegister = useMemo(
    (): ICustomField<IRegister>[] => [
      {
        field: 'username',
        placeholder: 'Tài khoản',
        rules: [{ required: true, message: 'Hãy nhập tài khoản của bạn!' }],
      },
      {
        field: 'password',
        placeholder: 'Mật khẩu',
        rules: [{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }],
      },
      {
        field: 'passwordConfirm',
        placeholder: 'Nhập lại mật khẩu',
        messageError: messageError,
        rules: [{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }],
      },
    ],
    [messageError],
  );

  const handleValidatePassword = (
    password: string,
    passwordConfirm: string,
  ) => {
    let isCheck: boolean = true;
    if (password !== passwordConfirm) {
      setMessageError('Mật khẩu nhập lại không khớp');
      isCheck = false;
    }
    return isCheck;
  };

  const handleRegister = async (payload: IRegister) => {
    if (
      !handleValidatePassword(payload.password, payload.passwordConfirm || '')
    ) {
      return;
    }
    const { passwordConfirm, ...registerPayload } = payload;
    const response = await apiRegister(registerPayload);
    if (response?.status === 201) {
      toast.success('Đăng ký thành công', { position: 'top-right' });
      push('/auth/login');
    } else {
      toast.error(response?.data, { position: 'top-right' });
    }
  };

  return (
    <div className="container-fluid">
      <div className={styles.registerForm}>
        <div className={`${styles.title} mb-5-p text-center`}>Đăng ký</div>
        <AuthComponent
          authType={AuthType.REGISTER}
          onClickLink={() => push('/auth/login')}
          onChange={() => setMessageError('')}
          fields={initialFieldsRegister}
          onSubmit={handleRegister}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
