export interface IAuth {
  id: number;
  email: string;
  password: string;
}

export interface IAuthCreate extends Omit<IAuth, 'id'> {}
export interface IAuthDto extends Omit<IAuth, 'id' | 'email'> {}
