import React from 'react';
import { Button, Form, Input } from 'antd';
import { IAuthComponent } from '@/types/auth';
import styles from './Auth.module.css';
import { isEmpty } from 'lodash';
import { TITLE_LOGIN, TITLE_REGISTER } from '@/constants/constant';

const AuthComponent = <T,>({
  authType,
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
      // labelCol={{ span: 8 }}
      onFinish={handleOnSubmit}
      autoComplete="off"
    >
      {!isEmpty(fields) &&
        fields.map(
          ({ field, label, placeholder, rules, messageError }, index) => (
            <div key={index}>
              <Form.Item<T>
                label={label}
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

      <div className={styles.btnSubmit}>
        <Button type="primary" htmlType="submit">
          {authType === 'login' ? TITLE_LOGIN : TITLE_REGISTER}
        </Button>
      </div>
    </Form>
  );
};

export default AuthComponent;
