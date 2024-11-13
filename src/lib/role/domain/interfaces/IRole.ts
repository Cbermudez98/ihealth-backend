import { IUser } from '../../../user/domain/interfaces/IUser';

export interface IRole {
  id: number;
  name: string;
  users: IUser[];
}

export interface IRoleCreate extends Omit<IRole, 'id' | 'users'> {}
export interface IRoleDto extends Omit<IRole, 'id' | 'users'> {}
export interface IRoleAssign extends Omit<IRole, 'name' | 'users'> {}
