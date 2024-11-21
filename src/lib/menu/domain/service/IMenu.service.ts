import { Injectable } from '@nestjs/common';
import { IMenu, IMenuAdd, IMenuUpdate } from '../interfaces/IMenu';
import { IRole } from 'src/lib/role/domain/interfaces/IRole';

@Injectable()
export class IMenuService {
  getMenu: (id: IRole['id']) => Promise<IMenu[]>;
  addItem: (menu: IMenuAdd) => Promise<IMenu>;
  update: (id: number, item: IMenuUpdate) => Promise<boolean>;
}
