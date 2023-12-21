export interface ISso {
  value: string;
  expired: boolean;
  expDate: Date;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  sso: ISso;
}
