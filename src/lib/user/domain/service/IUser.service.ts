import { IUser, IUserCreate } from '../interfaces/IUser';

export interface IUserService {
  save(newUser: Promise<IUser>): IUser | PromiseLike<IUser>;
  create: (user: IUserCreate) => Promise<IUser>;
}
