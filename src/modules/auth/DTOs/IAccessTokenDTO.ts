interface IUserAuth {
  id: string;
  name: string;
  email: string;
}

export interface IAccessTokenDTO {
  accessToken: string;
  user: IUserAuth;
}
