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

export type ILoginComponent = {
  onSubmit: (payload: ILogin) => void;
};

export type IResponseLogin = {
  access_token: string;
  user: IUserState;
};
