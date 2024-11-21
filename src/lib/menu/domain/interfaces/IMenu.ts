import { Role } from '../../../role/infrastructure/entity/role.entity';

export interface IMenu {
  id: number;
  name: string;
  icon: any;
  route: string;
  roles: Role[];
}

export interface IMenuAdd extends Omit<IMenu, 'id'> {}
export interface IMenuUpdate extends Partial<Omit<IMenuAdd, 'id'>> {}
export interface IMenuDto extends Omit<IMenu, 'id'> {}
