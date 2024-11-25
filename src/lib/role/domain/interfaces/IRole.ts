import { Menu } from 'src/lib/menu/infrastructure/entity/menu.entity';
import { IUser } from '../../../user/domain/interfaces/IUser';

export interface IRole {
  id: number;
  name: string;
  users: IUser[];
  menus: Menu[];
}

export interface IRoleCreate extends Omit<IRole, 'id' | 'users' | 'menus'> {}
export interface IRoleDto extends Omit<IRole, 'id' | 'users' | 'menus'> {}
export interface IRoleAssign extends Omit<IRole, 'name' | 'users' | 'menus'> {}
export interface IRoleAssignUpdate extends Partial<IRoleAssign> {}
