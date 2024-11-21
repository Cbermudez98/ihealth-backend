import { Injectable } from '@nestjs/common';
import { IMenu, IMenuAdd, IMenuUpdate } from '../interfaces/IMenu';
import { IRole } from 'src/lib/role/domain/interfaces/IRole';

@Injectable()
export class IMenuService {
  get: (id: IRole['id']) => Promise<IMenu[]>;
  createItem: (menu: IMenuAdd) => Promise<IMenu>;
  update: (id: number, menuData: IMenuUpdate) => Promise<IMenu>;
  getMenuById: (id: number) => Promise<IMenu | null>;
}
