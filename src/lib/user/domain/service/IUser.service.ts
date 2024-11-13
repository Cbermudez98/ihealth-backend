import { IUser, IUserCreate } from '../interfaces/IUser';

export interface IUserService {
  create: (user: IUserCreate) => Promise<IUser>;
}
