import React from 'react';
import { Button, Form, Input } from 'antd';
import { AuthType, IAuthComponent } from '@/types/auth';
import styles from './Auth.module.css';
import { isEmpty } from 'lodash';
import { TITLE_LOGIN, TITLE_REGISTER } from '@/constants/constant';
import Link from 'antd/es/typography/Link';

const AuthComponent = <T,>({
  authType,
  onClickLink,
  onChange,
  fields,
  onSubmit,
}: IAuthComponent<T>) => {
  const handleOnSubmit = (authData: T) => {
    onSubmit(authData);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onChange={() => onChange && onChange()}
      onFinish={handleOnSubmit}
      autoComplete="off"
    >
      {!isEmpty(fields) &&
        fields.map(
          ({ field, label, placeholder, rules, messageError }, index) => (
            <div key={index}>
              <Form.Item<T>
                label={label}
                // @ts-ignore
                name={field as string}
                rules={rules}
                help={
                  messageError ? (
                    <span className={styles.errorMessage}>{messageError}</span>
                  ) : null
                }
              >
                {['password', 'passwordConfirm'].includes(field as string) ? (
                  <Input.Password placeholder={placeholder} />
                ) : (
                  <Input placeholder={placeholder} />
                )}
              </Form.Item>
            </div>
          ),
        )}

      <div className={styles.textLink}>
        <Link onClick={onClickLink}>
          {authType === AuthType.LOGIN
            ? 'Đăng ký tài khoản mới!'
            : 'Đăng nhập tại đây!'}
        </Link>
      </div>

      <div className={styles.btnSubmit}>
        <Button type="primary" htmlType="submit">
          {authType === AuthType.LOGIN ? TITLE_LOGIN : TITLE_REGISTER}
        </Button>
      </div>
    </Form>
  );
};

export default AuthComponent;
