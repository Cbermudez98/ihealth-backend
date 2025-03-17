import { IUser } from 'src/lib/user/domain/interfaces/IUser';

export interface IAuth {
  id: number;
  email: string;
  password: string;
  user: IUser;
}

export interface IAuthCreate extends Omit<IAuth, 'id' | 'user'> {}
export interface IAuthDto extends Omit<IAuth, 'id' | 'email' | 'user'> {}
export interface IAuthUpdateDto extends Partial<IAuthCreate> {}
