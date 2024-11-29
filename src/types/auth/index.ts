import { ICustomField } from '@/types';

export type IUserState = {
  username?: string;
};

export type IAuthState = {
  token?: string;
  user?: IUserState;
};

export type ILogin = {
  username: string;
  password: string;
};

export type IRegister = {
  username: string;
  password: string;
  passwordConfirm?: string;
};

export type IAuthComponent<T> = {
  authType: IAuthType;
  fields: ICustomField<T>[];
  onSubmit: (payload: T) => void;
};

export type IResponseLogin = {
  access_token: string;
  user: IUserState;
};

export const AuthType = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

export type IAuthType = (typeof AuthType)[keyof typeof AuthType];
