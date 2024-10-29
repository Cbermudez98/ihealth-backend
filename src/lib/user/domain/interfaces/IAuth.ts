export interface IAuth {
  id: number;
  email: string;
  password: string;
}

export interface IAuthCreate extends Omit<IAuth, 'id'> {}
